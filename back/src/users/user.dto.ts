import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString, MinLength, Matches, IsEmail, isNotEmpty, MaxLength, IsInt, Min, Validate, IsBoolean } from "class-validator"
import {Type} from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";
import { UserExistsByEmailRule, UserExistsByIdRule, UserExistsRule, CourseExistsRule } from "./users.validator";



export class CreateUserDto {
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    readonly tgId: number
}

export class BuyCourseDto {
    @IsNumber()
    @ApiProperty()
    @Validate(UserExistsByIdRule)
    @IsNotEmpty()
    readonly userId: number
    @IsNumber()
    @ApiProperty()
    @Validate(CourseExistsRule)
    @IsOptional()
    readonly courseId: number
}

export class AddCourseDto {
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly description: string
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    readonly monthId: number
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly schoolMongoId: string
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly courseImage: string
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly subjectName: string
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    readonly channelId: number
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    readonly cost: number
}

export class CreateTransactionDto {
    @IsNumber()
    @ApiProperty()
    @Validate(UserExistsRule)
    @IsNotEmpty()
    readonly tgId: number
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    readonly amount: number
}

export class AddBalanceDto {
    @IsNumber()
    @ApiProperty()
    @Validate(UserExistsRule)
    @IsNotEmpty()
    readonly tgId: number
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    readonly amount: number
}


