import { Controller, Get, Post, Req, HttpCode, HttpStatus, Body, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from './guards/auth.guard';
import { RequestUserDto } from './dto/requestUserDto';
import { AuthService } from './auth.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@fileown/shared';

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @UseGuards(JWTAuthGuard)
    @TsRestHandler(contract.users.login)
    async login(@Req() req: RequestUserDto) {
        return tsRestHandler(contract.users.login, async () => {
            const currentUser = await this.authService.login(req.user);
            if (!currentUser) {
                return {
                    status: 400,
                    body: { message: "Failed to login user" }
                }
            }
            return {
                status: 201,
                body: currentUser
            };



        });
        // return this.authService.login(req.user);
    }

} 