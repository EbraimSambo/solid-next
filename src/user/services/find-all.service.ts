import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";



@Injectable()
export class FindAllUserService {
    
    @Inject(PrismaService)
    private prismaService: PrismaService;


    async findAll(){
        return await this.prismaService.user.findMany({
            select:{
                email: true,
                name: true,
                id: true,
                createAt: true
            }
        })
    }
}