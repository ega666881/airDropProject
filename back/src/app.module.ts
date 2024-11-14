import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import * as path from 'path'
import { UserRepository } from './users/users.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { KnexService } from './users/user.knex';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, UserRepository, KnexService],
})
export class AppModule {}
