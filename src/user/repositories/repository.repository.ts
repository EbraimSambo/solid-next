import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../types";
import { Injectable } from "@nestjs/common";

export interface IUserRepository{
    create(data: CreateUserDto): Promise<void>
    update(id: string, data: CreateUserDto): Promise<void>
    delete(id: string): Promise<void>
    findAll(): Promise<User[]>
    findOne(id: string): Promise<User>
}


@Injectable()
export class UserRepository implements IUserRepository{

    private constructor(readonly prisma: PrismaClient) {}
    async create(data: CreateUserDto): Promise<void> {
         await this.prisma.user.create({
            data,
         })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where:{
                id,
            }
         })
    }

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany() 
    }

    async findOne(id: string): Promise<User> {
        return await this.prisma.user.findUnique({
            where:{
                id
            }
        })
    }

    async update(id: string, data: CreateUserDto): Promise<void> {
        await this.prisma.user.update({
            where:{
                id,
            },
            data,
         })
    }
}