import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from '../interfaces/jwt-user.interface';
import { Request } from 'express';

/**
 * Extract the user or its property from the HTTP request.
 * If data argument is given, it returns its property
 * Otherwise, the user is returned
 */
export const UserParam = createParamDecorator(
  (data: string, ctx: ExecutionContext): JwtUser | string | number => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as JwtUser;

    if (!data) {
      return user;
    }
    return user?.[data];
  },
);
