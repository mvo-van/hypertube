import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Res,
  Req,
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
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ========================= Local =========================
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    const user: UserDto = req.user;
    const { access_token } = this.authService.login(user);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 900000,
    });
    res.send({
      message: 'Authentication successful',
    });
  }

  @Public()
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Public()
  @Post('reset-password')
  resetPassword(@Body() resetPassword: RestPasswordDto) {
    return this.authService.restPassword(
      resetPassword.email,
      resetPassword.otp,
      resetPassword.newPassword,
    );
  }

  // ========================= Google =========================
  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@Request() req) {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  // ========================= 42 =========================
  @Public()
  @UseGuards(FortytwoAuthGuard)
  @Get('fortytwo')
  async fortytwoAuth(@Request() req) {}

  @Public()
  @UseGuards(FortytwoAuthGuard)
  @Get('fortytwo/redirect')
  fortytwoAuthRedirect(@Request() req) {
    return this.authService.fortytwoLogin(req);
  }

  // ========================= Github =========================
  @Public()
  @UseGuards(GithubAuthGuard)
  @Get('github')
  async githubAuth(@Request() req) {}

  @Public()
  @UseGuards(GithubAuthGuard)
  @Get('github/callback')
  githubAuthRedirect(@Request() req) {
    return this.authService.githubLogin(req);
  }

  // ========================= Gitlab =========================
  @Public()
  @UseGuards(GitlabAuthGuard)
  @Get('gitlab')
  async gitlabAuth(@Request() req) {}

  @Public()
  @UseGuards(GitlabAuthGuard)
  @Get('gitlab/callback')
  gitlabAuthRedirect(@Request() req) {
    return this.authService.gitlabLogin(req);
  }

  // ========================= Discord =========================
  @Public()
  @UseGuards(DiscordAuthGuard)
  @Get('discord')
  async discordAuth(@Request() req) {}

  @Public()
  @UseGuards(DiscordAuthGuard)
  @Get('discord/callback')
  discordAuthRedirect(@Request() req) {
    return this.authService.discordLogin(req);
  }

  // ========================= Spotify =========================
  @Public()
  @UseGuards(SpotifyAuthGuard)
  @Get('spotify')
  async spotifyAuth(@Request() req) {}

  @Public()
  @UseGuards(SpotifyAuthGuard)
  @Get('spotify/callback')
  spotifyAuthRedirect(@Request() req) {
    return this.authService.spotifyLogin(req);
  }
}
