import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['authorization']; // Ambil API Key dari Header

    if (!apiKey || apiKey !== `Bearer ${process.env.API_KEY}`) {
      throw new UnauthorizedException('API Key tidak valid');
    }

    return true; // Jika API Key valid, lanjutkan
  }
}
