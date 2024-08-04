import { Controller, Delete, Param } from "@nestjs/common";
import { DeleteUserService } from "../services";




@Controller('delete')
export class DeleteUserController{

    constructor(private deleteService: DeleteUserService){}

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.deleteService.remove(id);
    }
}