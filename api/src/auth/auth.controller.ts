import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FortytwoAuthGuard } from './guards/fortytwo-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ========================= Local =========================
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
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
}
