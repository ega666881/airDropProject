import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString, MinLength, Matches, IsEmail, isNotEmpty, MaxLength, IsInt, Min, Validate, IsBoolean } from "class-validator"
import {Type} from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";
import { UserExistsByEmailRule, UserExistsByIdRule, UserExistsRule, CourseExistsRule, AirdropExistsByIdRule } from "./users.validator";



export class CreateUserDto {
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    readonly tgId: number
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly username: string
    @IsNumber()
    @ApiProperty()
    @IsOptional()
    readonly referalId: number
    
}

export class AddWalletUserDto {
    @IsNumber()
    @ApiProperty()
    @Validate(UserExistsByIdRule)
    @IsNotEmpty()
    readonly userId: number
    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    readonly wallet: string
}

export class JoinAirdropDto {
    @IsNumber()
    @ApiProperty()
    @Validate(UserExistsByIdRule)
    @IsNotEmpty()
    readonly userId: number
    @IsNumber()
    @ApiProperty()
    @Validate(AirdropExistsByIdRule)
    @IsNotEmpty()
    readonly airdropId: number
}

export class StopAirdropDto {
    @IsNumber()
    @ApiProperty()
    @Validate(AirdropExistsByIdRule)
    @IsNotEmpty()
    readonly airdropId: number
}


export class AddCoinsDto {
    @IsNumber()
    @ApiProperty()
    @Validate(UserExistsByIdRule)
    @IsNotEmpty()
    readonly userId: number
    @IsNumber()
    @ApiProperty()
    @Validate(AirdropExistsByIdRule)
    @IsNotEmpty()
    readonly airdropId: number
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    readonly coins: number
}


export class CreateTransactionDto {
    @IsNumber()
    @ApiProperty()
    @Validate(UserExistsByIdRule)
    @IsNotEmpty()
    readonly userId: number
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


