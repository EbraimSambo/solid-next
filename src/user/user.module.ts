import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CreateUserService, DeleteUserService, FindAllUserService, FindUserService, TransformService, UpdateUserService } from './services';
import { CreateUserController, DeleteUserController, FindAllUserController, FindUserController, UpdateUserController } from './controllers';
import { UserMiddleware } from './user.middleware';

@Module({
  controllers: [
    UserController, 
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    FindUserController,
    FindAllUserController
  ],
  providers: [
    UserService, 
    CreateUserService, 
    TransformService,
    UpdateUserService,
    DeleteUserService,
    FindUserService,
    FindAllUserService
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      // consumer.apply(UserMiddleware).forRoutes(FindAllUserController)
      consumer.apply(UserMiddleware).forRoutes({
        path:  'all',
        method: RequestMethod.ALL
      })
  }
}
