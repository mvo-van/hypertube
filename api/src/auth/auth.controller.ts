import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
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

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ========================= Local =========================
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login with username and password' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'johndoe' },
        password: { type: 'string', example: 'MyP@ssw0rd!' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Successfully logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  @ApiResponse({ status: 404, description: 'User not found' })
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Public()
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with OTP' })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiResponse({ status: 400, description: 'Invalid OTP or bad request' })
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
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to Google OAuth' })
  async googleAuth(@Request() req) {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with Google',
  })
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  // ========================= 42 =========================
  @Public()
  @UseGuards(FortytwoAuthGuard)
  @Get('fortytwo')
  @ApiOperation({ summary: 'Initiate 42 OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to 42 OAuth' })
  async fortytwoAuth(@Request() req) {}

  @Public()
  @UseGuards(FortytwoAuthGuard)
  @Get('fortytwo/redirect')
  @ApiOperation({ summary: '42 OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with 42',
  })
  fortytwoAuthRedirect(@Request() req) {
    return this.authService.fortytwoLogin(req);
  }

  // ========================= Github =========================
  @Public()
  @UseGuards(GithubAuthGuard)
  @Get('github')
  @ApiOperation({ summary: 'Initiate GitHub OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to GitHub OAuth' })
  async githubAuth(@Request() req) {}

  @Public()
  @UseGuards(GithubAuthGuard)
  @Get('github/callback')
  @ApiOperation({ summary: 'GitHub OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with GitHub',
  })
  githubAuthRedirect(@Request() req) {
    return this.authService.githubLogin(req);
  }

  // ========================= Gitlab =========================
  @Public()
  @UseGuards(GitlabAuthGuard)
  @Get('gitlab')
  @ApiOperation({ summary: 'Initiate GitLab OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to GitLab OAuth' })
  async gitlabAuth(@Request() req) {}

  @Public()
  @UseGuards(GitlabAuthGuard)
  @Get('gitlab/callback')
  @ApiOperation({ summary: 'GitLab OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with GitLab',
  })
  gitlabAuthRedirect(@Request() req) {
    return this.authService.gitlabLogin(req);
  }

  // ========================= Discord =========================
  @Public()
  @UseGuards(DiscordAuthGuard)
  @Get('discord')
  @ApiOperation({ summary: 'Initiate Discord OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to Discord OAuth' })
  async discordAuth(@Request() req) {}

  @Public()
  @UseGuards(DiscordAuthGuard)
  @Get('discord/callback')
  @ApiOperation({ summary: 'Discord OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with Discord',
  })
  discordAuthRedirect(@Request() req) {
    return this.authService.discordLogin(req);
  }

  // ========================= Spotify =========================
  @Public()
  @UseGuards(SpotifyAuthGuard)
  @Get('spotify')
  @ApiOperation({ summary: 'Initiate Spotify OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirect to Spotify OAuth' })
  async spotifyAuth(@Request() req) {}

  @Public()
  @UseGuards(SpotifyAuthGuard)
  @Get('spotify/callback')
  @ApiOperation({ summary: 'Spotify OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with Spotify',
  })
  spotifyAuthRedirect(@Request() req) {
    return this.authService.spotifyLogin(req);
  }
}
