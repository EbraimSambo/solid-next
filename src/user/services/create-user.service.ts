import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { TransformService } from "./transform.service";
import { UserService } from "../user.service";



@Injectable()
export class CreateUserService {

  @Inject(PrismaService)
  private prismaService: PrismaService;
  @Inject(TransformService)
  private transform: TransformService;
  @Inject(UserService)
  private userService: UserService;

  async create(createUserDto: CreateUserDto) {

    const userExist = await this.userService.byEmail(createUserDto.email)

    if (userExist) throw new ConflictException("User exist")

    const create = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: await this.transform.hashPassword(createUserDto.password)
      }
    });

    const { password, hashedRt, ...result } = create;

    return result;
  }
}