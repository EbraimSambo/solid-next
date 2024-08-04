import { Controller, Get, Param } from "@nestjs/common";
import { FindUserService } from "../services";


@Controller('find')
export class FindUserController{

    constructor(private findUserService: FindUserService){}
    @Get(':id')
    async findUser(@Param('id') id: string){
        return await this.findUserService.findOne(id)
    }
}