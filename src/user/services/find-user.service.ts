import { Inject, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";



export class FindUserService {
    @Inject(PrismaService)
    private prismaService: PrismaService;

    async findOne(id: string) {
        const findUser = await this.prismaService.user.findUnique({
            where:{
                id
            }
        });

        if(!findUser) throw new NotFoundException("User Not Found")

        const {password, hashedRt,...result} = findUser
        
        return result;
    }
}