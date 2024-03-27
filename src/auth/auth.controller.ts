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
  SignTokenDto,
  SigninAuthDto,
  UpdateAuthDto,
  UpdatePasswordDto,
  ValidateEmailDto,
} from './dto';
import { AuthGuard } from './guard/auth.guard';
import { ResetAuthDto } from './dto/reset-auth.dto';
import { RefreshAuthGuard } from './guard/refresh-auth.guard';
import {
  ApiOkResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { MessageType } from './types';
import { OkResponseData } from '../common/ok-response-data';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'User successfully registered',
      },
    }),
  })
  @ApiBadRequestResponse({
    description: 'A server error has occurred, please try again',
  })
  @ApiConflictResponse({
    description: 'Account already exists, please login',
  })
  @Post('/register')
  register(@Body() args: RegisterAuthDto): Promise<MessageType> {
    return this.authService.register(args);
  }

  @ApiOkResponse({
    description: 'User successfully logged in',
    type: SignTokenDto,
  })
  @ApiConflictResponse({ description: 'Invalid credentials' })
  @Post('/login')
  login(@Body() args: LoginAuthDto) {
    return this.authService.login(args);
  }

  @ApiOkResponse({
    description: 'User successfully logged in',
    type: SignTokenDto,
  })
  @ApiBadRequestResponse({
    description: 'A server error has occurred, please try again',
  })
  @Post('/signin')
  signInProviders(@Body() args: SigninAuthDto) {
    return this.authService.signInProviders(args);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Token validation successful',
      },
    }),
  })
  @ApiNotFoundResponse({ description: 'No user with email: ${email} exists' })
  @Post('/validate-email')
  validateEmail(@Body() args: ValidateEmailDto) {
    return this.authService.validateEmail(args);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Email verification sent',
      },
    }),
  })
  @ApiNotFoundResponse({ description: 'No user with email: ${email} exists' })
  @Post('/resend-email-verification')
  resendEmailVerification(@Body() args: ResendEmailVerificationDto) {
    return this.authService.resendEmailVerification(args);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Reset Password email has been sent to your email',
      },
    }),
  })
  @ApiNotFoundResponse({ description: 'No user with email: ${email} exists' })
  @Post('/reset-password')
  resetPassword(@Body() args: ResetAuthDto) {
    return this.authService.resetPassword(args);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Password change successfully',
      },
    }),
  })
  @ApiNotFoundResponse({ description: 'No user with email: ${email} exists' })
  @Post('/change-password')
  changePassword(@Body() args: ChangePasswordDto) {
    return this.authService.changePassword(args);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Password updated successfully',
      },
    }),
  })
  @ApiHeader({
    name: 'x-access-token',
    required: true,
    example: 'Bearer .....',
  })
  @ApiConflictResponse({ description: 'Invalid credentials' })
  @ApiConflictResponse({
    description: "New Password can't be the same as current password",
  })
  @UseGuards(AuthGuard)
  @Put('/update-password')
  updatePassword(@Request() req, @Body() args: UpdatePasswordDto) {
    return this.authService.updatePassword(req.user.id, args);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Successfully updated',
      },
    }),
  })
  @ApiHeader({
    name: 'x-access-token',
    required: true,
    example: 'Bearer .....',
  })
  @ApiBadRequestResponse({
    description: 'A server error has occurred, please try again',
  })
  @UseGuards(AuthGuard)
  @Put('/update')
  updateUser(@Request() req, @Body() args: UpdateAuthDto) {
    return this.authService.updateUser(req.user, args);
  }

  @ApiOkResponse({
    content: OkResponseData({
      accessToken: {
        type: 'string',
        example: '....',
      },
    }),
  })
  @ApiHeader({
    name: 'x-refresh-token',
    required: true,
    example: 'Bearer .....',
  })
  @UseGuards(RefreshAuthGuard)
  @Post('/refresh')
  refresh(@Request() req) {
    return this.authService.getRefreshToken(req.user);
  }

  @ApiOkResponse({
    content: OkResponseData({
      message: {
        type: 'string',
        example: 'Account deleted successfully. It is sad to lose access',
      },
    }),
  })
  @ApiHeader({
    name: 'x-access-token',
    required: true,
    example: 'Bearer .....',
  })
  @ApiConflictResponse({ description: 'Invalid credentials' })
  @UseGuards(AuthGuard)
  @Delete('/delete-account')
  deleteAccount(@Request() req, @Body() args: DeleteAccountDto) {
    return this.authService.deleteAccount(req.user, args);
  }
}
