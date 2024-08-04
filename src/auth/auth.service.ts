import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { compare, hash } from 'bcryptjs';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }


    async singUp(dto: AuthDto): Promise<Tokens> {

        const isExistUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (isExistUser) throw new ConflictException("Email is user");

        const create = await this.prisma.user.create({
            data: {
                ...dto,
                password: await this.hashPassword(dto.password)
            },
        })

        await this.updateHashed(create.id,create.password)

        const tokens = await this.getTokens(create.id, create.email)
        return tokens
    }

    async getTokens(idUser: number, email: string): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: idUser,
                email,
            }, {
                secret: 'at-secret',
                expiresIn: 60 * 15
            }),
            this.jwtService.signAsync({
                sub: idUser,
                email,
            }, {
                secret: 'rt-secret',
                expiresIn: 60 * 15
            })
        ])
        return {
            access_token: at,
            refresh_token: rt
        }
    }

    async singIn(dto: AuthDto) {

        const isExistUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!isExistUser) throw new ForbiddenException("Access denied");
        const passwordMatches = await compare(dto.password, isExistUser.password)

        if (!passwordMatches) throw new ForbiddenException("Access denied");

        const tokens = await this.getTokens(isExistUser.id, isExistUser.email)
        await this.updateHashed(isExistUser.id,isExistUser.password)
        return tokens
    }


    async logout(id: number) {
        return this.prisma.user.updateMany({
            where: {
                id,
                hashedRt:{
                    not: null
                }
            },
            data: {
                hashedRt: null
            }
        })
    }

    async updateHashed(id: number, rt: string) {
        const hash = await this.hashPassword(rt)
        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                hashedRt: hash
            }
        })
    }

    async hashPassword(data: string) {
        return await hash(data, 12)
    }
    async refreshToken(id: number, rtl: string) {
        const isExistUser = await this.prisma.user.findUnique({
            where: {
                id,
            }
        })
    
        if (!isExistUser) throw new ForbiddenException("Access denied");

        const rtMatches = await compare(rtl, isExistUser.hashedRt)

        if (!rtMatches) throw new ForbiddenException("Access denied");
        const tokens = await this.getTokens(isExistUser.id, isExistUser.email)
        await this.updateHashed(isExistUser.id,isExistUser.hashedRt)
        return tokens
    }
}
