import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Injectable } from "@nestjs/common";




@Injectable()
export class UpdateUserService {
    constructor(
        private prismaService: PrismaService
    ) { }


    async update(id: string, updateUserDto: UpdateUserDto) {
        return await this.prismaService.user.update({
            where: {
                id,
            },
            data: updateUserDto
        });
    }
}