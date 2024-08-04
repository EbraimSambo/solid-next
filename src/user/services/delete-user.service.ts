import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class DeleteUserService {

    @Inject(PrismaService)
    private prismaService: PrismaService;
    
    remove(id: string) {
        return this.prismaService.user.delete({
            where: {
                id
            }
        });
    }
}