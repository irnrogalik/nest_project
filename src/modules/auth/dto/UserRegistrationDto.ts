import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    MinLength,
} from 'class-validator';

import { Trim } from '../../../decorators/transforms.decorator';

export class UserRegistrationDto {
    @ApiProperty()
    @IsString()
    @Trim()
    readonly name: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    @Trim()
    readonly email: string;

    @ApiProperty({ minLength: 6 })
    @IsString()
    @MinLength(6)
    readonly password: string;

    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @Trim()
    address: string;
}
