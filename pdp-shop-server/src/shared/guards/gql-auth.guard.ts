import { AuthenticationError } from "@nestjs/apollo";
import { Injectable, ExecutionContext, ConsoleLogger, UnauthorizedException, CanActivate } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { jwtConstants } from "../constants/jwt";
import { error } from "console";

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getArgByIndex(2).req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      request['user'] = payload;
    } catch (error) {
      throw error;
    }
    return true;
  }
}