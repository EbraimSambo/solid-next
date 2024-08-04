import { Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";


@Injectable()
export class TransformService {
    constructor() {}

    async hashPassword(password: string){
        return await hash(password, 12) 
    }
}