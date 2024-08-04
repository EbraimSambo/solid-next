import { Body, Controller, Param, Patch } from "@nestjs/common";
import { UpdateUserService } from "../services";
import { UpdateUserDto } from "../dto/update-user.dto";


@Controller('update')
export class UpdateUserController{

    constructor(private updateUserService: UpdateUserService ){}

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.updateUserService.update(id, updateUserDto);
    }
}