import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Res,
  Req,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { FortytwoAuthGuard } from './guards/fortytwo-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { GitlabAuthGuard } from './guards/gitlab-auth.guard';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { SpotifyAuthGuard } from './guards/spotify-auth.guard';
import { RestPasswordDto } from './dto/reset-password.dto';
import { UserDto } from './dto/user.dto';
import { Request, Response } from 'express';
import { AuthModule } from './auth.module';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthModule.name);

  constructor(private readonly authService: AuthService) {}

  // ========================= Local =========================
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    const user: UserDto = req.user;
    this.logger.log(`[login] ${user.username}`);
    const { access_token } = this.authService.login(user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 10800000,
      sameSite: true,
    });
    res.send({
      message: 'Authentication successful',
    });
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    this.logger.log(`[forgot password]: ${forgotPasswordDto.email}`);
    await this.authService.forgotPassword(forgotPasswordDto.email);
    return {
      message: 'Reset link has been sent',
    };
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() resetPassword: RestPasswordDto) {
    this.logger.log(
      `[reset-password] ${resetPassword.email} ${resetPassword.otp_code}`,
    );
    const { email, otp_code, new_password } = resetPassword;
    await this.authService.resetPassword(email, otp_code, new_password);
    return {
      message: 'User password has been reset',
    };
  }

  // ========================= Google =========================
  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  googleAuth(@Req() req: Request) {
    this.logger.log('[oauth-google]');
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  googleAuthRedirect(@Req() req: Request) {
    this.logger.log('[google-redirect]');
    return this.authService.googleLogin(req);
  }

  // ========================= 42 =========================
  @Public()
  @UseGuards(FortytwoAuthGuard)
  @Get('fortytwo')
  fortytwoAuth(@Req() req: Request) {
    this.logger.log('[oauth-fortytwo]');
  }

  @Public()
  @UseGuards(FortytwoAuthGuard)
  @Get('fortytwo/redirect')
  fortytwoAuthRedirect(@Req() req: Request) {
    this.logger.log('[oauth-fortytwo-redirect]');
    return this.authService.fortytwoLogin(req);
  }

  // ========================= Github =========================
  @Public()
  @UseGuards(GithubAuthGuard)
  @Get('github')
  githubAuth(@Req() req: Request) {
    this.logger.log('[oauth-github]');
  }

  @Public()
  @UseGuards(GithubAuthGuard)
  @Get('github/callback')
  githubAuthRedirect(@Req() req: Request) {
    this.logger.log('[oauth-github-redirect]');
    return this.authService.githubLogin(req);
  }

  // ========================= Gitlab =========================
  @Public()
  @UseGuards(GitlabAuthGuard)
  @Get('gitlab')
  gitlabAuth(@Req() req: Request) {
    this.logger.log('[oauth-gitlab]');
  }

  @Public()
  @UseGuards(GitlabAuthGuard)
  @Get('gitlab/callback')
  gitlabAuthRedirect(@Req() req: Request) {
    this.logger.log('[oauth-gitlab]');
    return this.authService.gitlabLogin(req);
  }

  // ========================= Discord =========================
  @Public()
  @UseGuards(DiscordAuthGuard)
  @Get('discord')
  discordAuth(@Req() req: Request) {
    this.logger.log('[oauth-discord]');
  }

  @Public()
  @UseGuards(DiscordAuthGuard)
  @Get('discord/callback')
  discordAuthRedirect(@Req() req: Request) {
    this.logger.log('[oauth-discord-redirect]');
    return this.authService.discordLogin(req);
  }

  // ========================= Spotify =========================
  @Public()
  @UseGuards(SpotifyAuthGuard)
  @Get('spotify')
  spotifyAuth(@Req() req: Request) {
    this.logger.log('[oauth-discord]');
  }

  @Public()
  @UseGuards(SpotifyAuthGuard)
  @Get('spotify/callback')
  spotifyAuthRedirect(@Req() req: Request) {
    this.logger.log('[oauth-discord]');
    return this.authService.spotifyLogin(req);
  }
}
