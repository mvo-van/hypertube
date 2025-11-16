import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Login with username and password' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'johndoe' },
        password: { type: 'string', example: 'StrongP@ss123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({
    status: 200,
    description: 'Password reset email sent',
  })
  @ApiResponse({
    status: 404,
    description: 'Email not found',
  })
  @Public()
  @Post("forgot-password")
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @ApiOperation({ summary: 'Reset password with OTP' })
  @ApiResponse({
    status: 200,
    description: 'Password successfully reset',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid OTP or email',
  })
  @Public()
  @Post("reset-password")
  resetPassword(@Body() resetPassword: RestPasswordDto) {
    return this.authService.restPassword(resetPassword.email, resetPassword.otp, resetPassword.newPassword);
  }

  // ========================= Google =========================
  @ApiOperation({ summary: 'Initiate Google OAuth authentication' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to Google OAuth consent screen',
  })
  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@Request() req) {}

  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with Google',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      },
    },
  })
  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  // ========================= 42 =========================
  @ApiOperation({ summary: 'Initiate 42 OAuth authentication' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to 42 OAuth consent screen',
  })
  @Public()
  @UseGuards(FortytwoAuthGuard)
  @Get('fortytwo')
  async fortytwoAuth(@Request() req) {}

  @ApiOperation({ summary: '42 OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with 42',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      },
    },
  })
  @Public()
  @UseGuards(FortytwoAuthGuard)
  @Get('fortytwo/redirect')
  fortytwoAuthRedirect(@Request() req) {
    return this.authService.fortytwoLogin(req);
  }

  // ========================= Github =========================
  @ApiOperation({ summary: 'Initiate GitHub OAuth authentication' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to GitHub OAuth consent screen',
  })
  @Public()
  @UseGuards(GithubAuthGuard)
  @Get('github')
  async githubAuth(@Request() req) {}

  @ApiOperation({ summary: 'GitHub OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with GitHub',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      },
    },
  })
  @Public()
  @UseGuards(GithubAuthGuard)
  @Get('github/callback')
  githubAuthRedirect(@Request() req) {
    return this.authService.githubLogin(req);
  }

  // ========================= Gitlab =========================
  @ApiOperation({ summary: 'Initiate GitLab OAuth authentication' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to GitLab OAuth consent screen',
  })
  @Public()
  @UseGuards(GitlabAuthGuard)
  @Get('gitlab')
  async gitlabAuth(@Request() req) {}

  @ApiOperation({ summary: 'GitLab OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with GitLab',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      },
    },
  })
  @Public()
  @UseGuards(GitlabAuthGuard)
  @Get('gitlab/callback')
  gitlabAuthRedirect(@Request() req) {
    return this.authService.gitlabLogin(req);
  }

  
// ========================= Discord =========================
  @ApiOperation({ summary: 'Initiate Discord OAuth authentication' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to Discord OAuth consent screen',
  })
  @Public()
  @UseGuards(DiscordAuthGuard)
  @Get('discord')
  async discordAuth(@Request() req) {}

  @ApiOperation({ summary: 'Discord OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with Discord',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      },
    },
  })
  @Public()
  @UseGuards(DiscordAuthGuard)
  @Get('discord/callback')
  discordAuthRedirect(@Request() req) {
    return this.authService.discordLogin(req);
  }

// ========================= Spotify =========================
  @ApiOperation({ summary: 'Initiate Spotify OAuth authentication' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to Spotify OAuth consent screen',
  })
  @Public()
  @UseGuards(SpotifyAuthGuard)
  @Get('spotify')
  async spotifyAuth(@Request() req) {}

  @ApiOperation({ summary: 'Spotify OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated with Spotify',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      },
    },
  })
  @Public()
  @UseGuards(SpotifyAuthGuard)
  @Get('spotify/callback')
  spotifyAuthRedirect(@Request() req) {
    return this.authService.spotifyLogin(req);
  }
}
