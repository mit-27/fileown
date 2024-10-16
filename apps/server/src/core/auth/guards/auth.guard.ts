import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';


@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        return super.canActivate(context);

        // console.log('AuthGuard is running');

        // const request = context.switchToHttp().getRequest();
        // const authorization = request.headers.authorization;

        // if (!authorization) {
        //     throw new UnauthorizedException();
        // }
        // console.log('Authorization:', authorization);

        // const [scheme, token] = authorization.split(' ');

        // if (scheme !== 'Bearer') {
        //     throw new UnauthorizedException();
        // }

        // try {
        //     const user = await this.authService.verifyToken(token);
        //     request.user = user;
        //     // request.user = {
        //     //     id: "1",
        //     //     email: "test@test.com",
        //     //     name: "Test User",
        //     // }

        //     return true;

        // }
        // catch (error) {
        //     throw new UnauthorizedException();
        // }

    }

    handleRequest(err : any, user : any, info : any) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
          throw err || new UnauthorizedException();
        }
        return user;
      }
}