import { Controller, Get, Inject } from "@nestjs/common";
import { FindAllUserService } from "../services";




@Controller('all')
export class FindAllUserController{
    @Inject(FindAllUserService)
    private findService: FindAllUserService

    @Get()
    findAll(){
        return this.findService.findAll()
    }
}