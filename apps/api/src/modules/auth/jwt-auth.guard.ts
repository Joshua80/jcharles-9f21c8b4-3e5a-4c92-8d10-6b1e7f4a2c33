import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (err) {
        this.logger.warn(`Authentication failed: ${err.message || 'Unknown error'}`);
      } else if (info) {
        this.logger.warn(`Token validation failed: ${info.message || 'Invalid token'}`);
      }
      throw err || new UnauthorizedException('Invalid token or expired');
    }
    return user;
  }
}