import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { UserPayload } from '@hnamdev-7f3a1b92-6d4e-4c8a-9b5f-2e1a3c7d8e90/data';

/**
 * GetUser decorator extracts the current logged-in user from the request.
 * Usage: @GetUser() user: UserPayload
 */
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
