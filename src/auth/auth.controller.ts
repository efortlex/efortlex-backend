import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
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
import { AuthGuard } from './guard/auth.guard';
import { ResetAuthDto } from './dto/reset-auth.dto';
import { RefreshAuthGuard } from './guard/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() args: RegisterAuthDto) {
    return this.authService.register(args);
  }

  @Post('/login')
  login(@Body() args: LoginAuthDto) {
    return this.authService.login(args);
  }

  @Post('/signin')
  signinProviders(@Body() args: SigninAuthDto) {
    return this.authService.signinProviders(args);
  }

  @Post('/validate-email')
  validateEmail(@Body() args: ValidateEmailDto) {
    return this.authService.validateEmail(args);
  }

  @Post('/resend-email-verification')
  resendEmailVerification(@Body() args: ResendEmailVerificationDto) {
    return this.authService.resendEmailVerification(args);
  }

  @Post('/reset-password')
  resetPassword(@Body() args: ResetAuthDto) {
    return this.authService.resetPassword(args);
  }

  @Post('/change-password')
  changePassword(@Body() args: ChangePasswordDto) {
    return this.authService.changePassword(args);
  }

  @UseGuards(AuthGuard)
  @Put('/update-password')
  updatePassword(@Request() req, @Body() args: UpdatePasswordDto) {
    return this.authService.updatePassword(req.user.id, args);
  }

  @UseGuards(AuthGuard)
  @Put('/update')
  updateUser(@Request() req, @Body() args: UpdateAuthDto) {
    return this.authService.updateUser(req.user, args);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('/refresh')
  refresh(@Request() req) {
    return this.authService.getRefreshToken(req.user);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete-account')
  deleteAccount(@Request() req, @Body() args: DeleteAccountDto) {
    return this.authService.deleteAccount(req.user, args);
  }
}
