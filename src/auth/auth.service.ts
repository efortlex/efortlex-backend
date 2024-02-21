import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ChangePasswordDto,
  DeleteAccountDto,
  LoginAuthDto,
  RegisterAuthDto,
  ResendEmailVerificationDto,
  SigninAuthDto,
  UpdateAuthDto,
  UpdatePasswordDto,
  ValidateEmailDto,
} from './dto';
import * as bcrypt from 'bcrypt';
import { MessageType, SignTokenType } from './types';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetAuthDto } from './dto/reset-auth.dto';
import { DatabaseService } from '../database/database.service';
import { VERIFICATION_CODE_TYPE, type User as UserType } from '@prisma/client';
import { customAlphabet } from '../common/nanoid';
import { clean } from '../common/clean';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async register(args: RegisterAuthDto): Promise<MessageType> {
    const { firstName, lastName, email, password, isTenant } = args;

    // searching database if user with email is already registered
    const user = await this.databaseService.user.findFirst({
      where: { email },
    });

    // if user already exists then throw an error
    if (user)
      throw new ConflictException('Account already exists, please login');

    // hashing user password
    const hash = await this.hashPassword(password);

    const newUser = await this.databaseService.user.create({
      data: {
        firstName,
        lastName,
        email,
        role: isTenant ? ['TENANT'] : ['LANDLORD'],
        providers: ['EMAIL'],
        password: hash,
        emailVerified: false,
      },
    });

    // checking if there was an error creating user if there was throw an error
    if (!newUser)
      throw new BadRequestException(
        'A server error has occured, please try again',
      );

    // get email verification code
    const code = await this.saveVerificationCode(
      newUser.id,
      VERIFICATION_CODE_TYPE.EMAIL,
      6,
      '1234567890',
    );

    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your Efortlex account.',
      template: 'welcome',
      context: {
        firstName,
        code,
      },
    });

    // then return a success message
    return {
      message: 'Registration successfull, Email verification code sent',
    };
  }

  async login(args: LoginAuthDto) {
    const { email, password } = args;

    // searching database if user with email is already registered
    const user = await this.databaseService.user.findFirst({
      where: { email },
      select: { password: true, id: true },
    });

    // if user does not exists then throw an error
    if (!user) throw new ConflictException('Invalid credentials');

    // if user exists then compare if stored password matches with input password
    await this.comparePassword(password, user.password);

    // if password match create an access token and refresh token
    const tokens = await this.signTokens(user.id, email);

    // then return the access token and refresh token
    return tokens;
  }

  async signinProviders(args: SigninAuthDto) {
    const { email, firstName, lastName, provider } = args;

    // searching database if user with email is already registered
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    // if user exists and if the provider exists
    if (user && user.providers.includes(provider)) {
      return await this.signTokens(user.id, email);
    }

    // if user exists and if the provider does not exists
    if (user && !user.providers.includes(provider)) {
      const newUser = await this.databaseService.user.update({
        where: { email },
        data: { providers: { push: provider } },
      });
      return await this.signTokens(newUser.id, email);
    }

    // if user doesn't exists
    const newUser = await this.databaseService.user.create({
      data: {
        firstName,
        lastName,
        email,
        role: ['TENANT'],
        providers: [provider],
        emailVerified: false,
      },
    });

    // checking if there was an error creating user if there was throw an error
    if (!newUser)
      throw new BadRequestException(
        'A server error has occured, please try again',
      );

    // return token
    return await this.signTokens(newUser.id, email);
  }

  async validateEmail(data: ValidateEmailDto) {
    const { token, email } = data;

    const user = await this.databaseService.user.findFirst({
      where: { email },
      select: { password: true, id: true },
    });

    // if user does not exists then throw an error
    if (!user)
      throw new ConflictException(`No user with email: ${email} exists`);

    const savedToken = await this.validateToken(
      user.id,
      token,
      VERIFICATION_CODE_TYPE.EMAIL,
    );

    await this.databaseService.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });
    await this.databaseService.verificationCode.delete({
      where: { id: savedToken.id },
    });

    return { message: 'Token validation successful' };
  }

  async resendEmailVerification({ email }: ResendEmailVerificationDto) {
    const user = await this.databaseService.user.findFirst({
      where: { email },
      select: { password: true, id: true, email: true, firstName: true },
    });

    // if user does not exists then throw an error
    if (!user)
      throw new ConflictException(`No user with email: ${email} exists`);

    const code = await this.saveVerificationCode(
      user.id,
      VERIFICATION_CODE_TYPE.EMAIL,
      6,
      '1234567890',
    );

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Verify your Efortlex account.',
      template: 'email-verification',
      context: {
        firstName: user.firstName,
        code,
      },
    });

    return { message: 'Email verification sent' };
  }

  async resetPassword(data: ResetAuthDto): Promise<MessageType> {
    const { email } = data;

    // searching database if user with email is already registered

    const user = await this.databaseService.user.findFirst({
      where: { email },
      select: { email: true, id: true, firstName: true },
    });

    // if user does not exists then throw an error
    if (!user)
      throw new ConflictException(`No user with email: ${email} exists`);

    const code = await this.saveVerificationCode(
      user.id,
      VERIFICATION_CODE_TYPE.PASSWORD,
      6,
      '1234567890',
    );

    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your Efortlex account.',
      template: 'reset-password-code',
      context: {
        firstName: user.firstName,
        code,
      },
    });

    // then return a success message
    return { message: 'Reset Password email has been sent to your email' };
  }

  async changePassword(data: ChangePasswordDto) {
    const { email, token, password } = data;

    // searching database if user with email is already registered
    const user = await this.databaseService.user.findFirst({
      where: { email },
      select: { email: true, id: true, firstName: true },
    });
    // if user does not exists then throw an error
    if (!user)
      throw new NotFoundException(`No user with email: ${email} exists`);

    const savedToken = await this.validateToken(
      user.id,
      token,
      VERIFICATION_CODE_TYPE.PASSWORD,
    );

    // hashing user password
    const hash = await this.hashPassword(password);

    // updated user old password with new password
    await this.databaseService.user.update({
      where: { id: user.id },
      data: { password: hash },
    });

    // delete used token from the database
    await this.databaseService.verificationCode.delete({
      where: { id: savedToken.id },
    });

    return { message: 'Password change successfully' };
  }

  async updatePassword(uid: string, data: UpdatePasswordDto) {
    const { currentPassword, newPassword } = data;

    if (currentPassword === newPassword)
      throw new ConflictException(
        "New Password can't be the same as current password",
      );

    const storeUser = await this.databaseService.user.findFirst({
      where: { id: uid },
    });

    // if stored user does not exists then throw an error
    if (!storeUser) throw new ConflictException('Invalid credentials');

    // if stored user exists then compare if stored password matches with current password
    await this.comparePassword(currentPassword, storeUser.password);

    // hashing user new password
    const hash = await this.hashPassword(newPassword);

    // updated user current password with new password
    await this.databaseService.user.update({
      where: { id: uid },
      data: { password: hash },
    });

    return { message: 'Password Updated successfully' };
  }

  async updateUser(user: UserType, args: UpdateAuthDto) {
    const data = await this.databaseService.user.update({
      where: { id: user.id },
      data: clean<Partial<UserType>>(args),
    });

    if (!data) throw new BadRequestException();
    return { message: 'Successfully updated' };
  }

  async getRefreshToken(user: UserType) {
    const accessToken = await this.signToken({
      sub: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('ACCESS_EXPIRES_IN'),
    });

    return { accessToken };
  }

  async deleteAccount(user: UserType, args: DeleteAccountDto) {
    const storeUser = await this.databaseService.user.findFirst({
      where: { id: user.id },
    });

    // if stored user does not exists then throw an error
    if (!storeUser) throw new ConflictException('Invalid credentials');

    // if stored user exists then compare if stored password matches with current password
    await this.comparePassword(args.password, storeUser.password);

    await this.databaseService.user.delete({
      where: { id: user.id },
    });

    return { message: 'Account delete successfully. It is sad to loss use' };
  }

  private async hashPassword(password: string) {
    // generating password hash salt
    const salt = await bcrypt.genSalt();

    // hashing user password
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  private async comparePassword(password: string, encryptedPassword: string) {
    // if user exists then compare if stored password matches with input password
    const isPassword = await bcrypt.compare(password, encryptedPassword);

    // if passwords does not match throw an error
    if (!isPassword) throw new ConflictException('Invalid credentials');

    return true;
  }

  private async signTokens(sub: string, email: string, emailVerified = false) {
    const accessToken = await this.signToken({
      sub,
      email,
      emailVerified,
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('ACCESS_EXPIRES_IN'),
    });
    const refreshToken = await this.signToken({
      sub,
      email,
      emailVerified,
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('REFRESH_EXPIRES_IN'),
    });

    return { accessToken, refreshToken };
  }

  private async signToken(args: SignTokenType) {
    const { sub, email, secret, expiresIn, emailVerified } = args;
    const token = await this.jwtService.signAsync(
      { sub, email, emailVerified },
      { secret, expiresIn },
    );

    return token;
  }

  private async saveVerificationCode(
    uid: string,
    type: VERIFICATION_CODE_TYPE,
    size = 53,
    alphabet = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  ) {
    // check if there was an existing token created
    const savedToken = await this.databaseService.verificationCode.findFirst({
      where: { uid, type },
    });

    // if there was an existing token delete it,
    // Reason can't retrieve the code, token encrypted
    if (savedToken) {
      await this.databaseService.verificationCode.delete({
        where: { id: savedToken.id },
      });
    }

    // generating code
    const nanoid = customAlphabet(alphabet, size);

    const code = nanoid();

    // generating code hash salt
    const salt = await bcrypt.genSalt();

    // hashing code
    const token = await bcrypt.hash(code, salt);

    // saving the token to the database
    const storeVerificationCode =
      await this.databaseService.verificationCode.create({
        data: {
          token,
          uid,
          type,
          expiresAt: this.createExpirationTime(600),
        },
      });

    if (!storeVerificationCode)
      throw new InternalServerErrorException(
        'A server error has occured, please try again',
      );

    return code;
  }

  private async validateToken(
    uid: string,
    token: string,
    type: VERIFICATION_CODE_TYPE,
  ) {
    const savedToken = await this.databaseService.verificationCode.findFirst({
      where: { uid, type },
    });

    if (!savedToken) throw new NotFoundException('TOKEN_NOT_FOUND');

    const isTokenExpired = this.isExpirationTimeExpired(savedToken.expiresAt);

    if (isTokenExpired) throw new ConflictException('TOKEN_EXPIRED');

    const isTokenAMatch = await bcrypt.compare(token, savedToken.token);

    if (!isTokenAMatch) throw new ConflictException("Can't validate token");

    return savedToken;
  }

  private createExpirationTime(seconds: number): Date {
    const milliseconds = seconds * 1000;
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + milliseconds);
    return currentDate;
  }

  private isExpirationTimeExpired(expirationTime: Date): boolean {
    const now = new Date();
    return now.getTime() > new Date(expirationTime).getTime();
  }

  private getClientURL() {
    const origins = this.configService.get('ALLOWED_ORIGINS');

    const arr = JSON.parse(origins);

    return arr[0];
  }
}
