import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/auth.guard';
import { JwtStrategy } from './guards/jwt.strategy';



@Global()
@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, JWTAuthGuard,JwtStrategy],
    exports: [JWTAuthGuard, AuthService,JwtStrategy]
})
export class AuthModule { }

