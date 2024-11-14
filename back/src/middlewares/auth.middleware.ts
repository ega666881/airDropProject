import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import knex, { Knex } from 'knex';
import knexfile from '../../db/knexfile';
import { NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';


@Injectable()
export class ActiveTokenGuard implements CanActivate {
  knex: Knex
  async canActivate(context: ExecutionContext): Promise<boolean | any> {
    this.knex = knex(knexfile.development);
    const request = context.switchToHttp().getRequest();
    if (request.headers['active-token']) {
      const user = await this.knex('users').select("*").where({activeToken: request.headers['active-token']}).first()
      if (user) {
        return true

      } else {
        throw new HttpException(
          'Токен не найден',
          HttpStatus.FORBIDDEN,
        );
      }
      

    } else {
      throw new HttpException(
        'Ошибка заголовков',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
