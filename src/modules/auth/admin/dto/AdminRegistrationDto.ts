import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

import { Trim } from '../../../../decorators/transforms.decorator';

export class AdminRegistrationDto {
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
    @MinLength(12)
    @Matches('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])')
    readonly password: string;

    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    secretKey: string;
}
