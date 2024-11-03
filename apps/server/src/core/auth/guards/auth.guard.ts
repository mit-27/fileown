import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject, } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { DRIZZLE } from '@/core/drizzle/drizzle.module';
import { DrizzleDB, sessions, user } from '@fileown/shared';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService,@Inject(DRIZZLE) private readonly db: DrizzleDB) { }


    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {

        console.log('AuthGuard is running');

        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedException();
        }
        console.log('Authorization:', authorization);

        const [scheme, token] = authorization.split(' ');

        if (scheme !== 'Bearer') {
            throw new UnauthorizedException();
        }

        try {

            const currentSession = await this.db.select().from(sessions).where(eq(sessions.sessionToken, token)).get();
            if (!currentSession || (new Date(currentSession.expires).getTime() < Date.now())) {
                throw new UnauthorizedException();
            }

            console.log('Current session:', currentSession);

            const currentUser = await this.db.select().from(user).where(eq(user.id, currentSession.userId)).get();
            if (!currentUser) {
                throw new UnauthorizedException();
            }
            console.log('Current user:', currentUser);
            request.user = currentUser;





            // const user = await this.authService.verifyToken(token);
            // request.user = user;
            // request.user = {
            //     id: "1",
            //     email: "test@test.com",
            //     name: "Test User",
            // }

            return true;

        }
        catch (error) {
            throw new UnauthorizedException();
        }

    }
}