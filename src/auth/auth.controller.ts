import { Body, Controller, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('singup')
    @HttpCode(HttpStatus.CREATED)
    singUp(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.singUp(dto)
    }
    @Post('singin')
    @HttpCode(HttpStatus.OK)
    singIn(@Body() dto: AuthDto): Promise<Tokens>  {
        return this.authService.singIn(dto)
    }



    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Req() req: Request) { 
        const user = req.user 
        return this.authService.logout(user['sub'])
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToke(@Req() req: Request) {
        const user = req.user 
        return this.authService.refreshToken(+user['sub'], user['refreshToken'])
    }
}
