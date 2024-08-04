import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { CreateUserService } from "../services/create-user.service";


@Controller('register')
export class CreateUserController{

    constructor(
        private createUserService: CreateUserService
    ){}
    @Post()
    create(@Body() createUserDto: CreateUserDto){
        console.log(createUserDto)
        return this.createUserService.create(createUserDto)
    }
}