import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const unprotected =
      Reflect.getMetadata('unprotected', context.getHandler()) ||
      Reflect.getMetadata('unprotected', context.getClass());
    if (unprotected) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
  
      request['user'] = payload;
      return true;
    } catch (error) {
      console.error('Erro ao verificar JWT:', error);
  
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado.');
      }
  
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token inválido.');
      }
  
      throw new UnauthorizedException();
    }
  }
  
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
