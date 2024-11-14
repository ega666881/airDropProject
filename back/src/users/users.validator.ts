import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import knex, { Knex } from 'knex';
import knexfile from '../../db/knexfile'


@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
    knex: Knex
    constructor() {
        this.knex = knex(knexfile.development)
    }

    async validate(value: number) {
        const user = await this.knex('users').select("*").where({tgId: value}).first()
        if (user) {
            return true
            
        } else {
            return false
        }

        
    }

    defaultMessage(args: ValidationArguments) {
        return `Пользователя не существует.`;
    }
}

@ValidatorConstraint({ name: 'CourseExists', async: true })
@Injectable()
export class CourseExistsRule implements ValidatorConstraintInterface {
    knex: Knex
    constructor() {
        this.knex = knex(knexfile.development)
    }

    async validate(value: number) {
        const user = await this.knex('courses').select("*").where({id: value}).first()
        if (user) {
            return true
            
        } else {
            return false
        }

        
    }

    defaultMessage(args: ValidationArguments) {
        return `Курса не существует.`;
    }
}

@ValidatorConstraint({ name: 'UserExistsById', async: true })
@Injectable()
export class UserExistsByIdRule implements ValidatorConstraintInterface {
    knex: Knex
    constructor() {
        this.knex = knex(knexfile.development)
    }

    async validate(value: number) {
        const user = await this.knex('users').select("*").where({id: value}).first()
        if (user) {
            return true
            
        } else {
            return false
        }

        
    }

    defaultMessage(args: ValidationArguments) {
        return `Пользователя не существует.`;
    }
}


@ValidatorConstraint({ name: 'UserExistsByEmail', async: true })
@Injectable()
export class UserExistsByEmailRule implements ValidatorConstraintInterface {
    knex: Knex
    constructor() {
        this.knex = knex(knexfile.development)
    }

    async validate(value: number) {
        const user = await this.knex('users').select("*").where({email: value}).first()
        if (user) {
            return true
            
        } else {
            return false
        }

        
    }

    defaultMessage(args: ValidationArguments) {
        return `Пользователя не существует.`;
    }
}
