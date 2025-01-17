import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService){}

  findAll() {
    return `This action returns all user`;
  }


  async byEmail(email: string){
    return await this.prismaService.user.findUnique({
      where:{
        email
      }
    })
  }
}
