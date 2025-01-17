import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
