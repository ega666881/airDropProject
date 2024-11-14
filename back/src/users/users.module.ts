import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MulterModule } from '@nestjs/platform-express';
import { UserExistsByEmailRule, UserExistsByIdRule, UserExistsRule, CourseExistsRule } from './users.validator';
import { UserRepository } from './users.repository';
import { KnexService } from './user.knex';

@Module({
  imports: [MulterModule.register({ dest: 'public' })],
  controllers: [UsersController],
  providers: [KnexService, UsersService, UserExistsRule, UserExistsByIdRule, UserExistsByEmailRule, UserRepository, CourseExistsRule]
})
export class UsersModule {}
