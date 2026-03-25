import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthUserPayload } from '../interfaces/auth-user-payload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: Record<string, string | undefined>; user?: AuthUserPayload }>();

    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Debes enviar un token Bearer valido');
    }

    const token = authHeader.slice(7).trim();

    try {
      const payload = await this.jwtService.verifyAsync<AuthUserPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET', 'senior-cat-secret-local'),
      });
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('El token es invalido o ha expirado');
    }
  }
}