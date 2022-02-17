import { plainToInstance } from 'class-transformer';

import { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { UserRegistrationDto } from '../auth/user/dto/UserRegistrationDto';
import type { UserDto } from './dto/UserDto';
import type { UserWithRoleDto } from './dto/UserWithRoleDto';
import { UserEntity } from './entity/user.entity';
import { Role } from './role.enum';

export const pageOptions: PageOptionsDto = new PageOptionsDto();

export const userList: UserEntity[] = plainToInstance(UserEntity, [
    {
        id: 'c8bddc98-934b-450d-b8da-10de0113ce2d',
        createdAt: new Date('2022-02-02T15:00:18.609Z'),
        updatedAt: new Date('2022-02-02T15:00:18.609Z'),
        name: 'John Doe',
        email: 'john_doe@email.com',
        password:
            '$2b$10$djkS5xeFbGIwlM8I/X2lQuUI38bN7CNOGdRRzUbszry3FoP4yTTKG',
        phone: '+12133734253',
        address: '8862 Ashley Street Matthews, NC 28104',
    },
    {
        id: '0c9b3178-bf8d-4f28-954c-0dc94fe23460',
        createdAt: new Date('2022-02-02T15:00:18.609Z'),
        updatedAt: new Date('2022-02-02T15:00:18.609Z'),
        name: 'John Smith',
        email: 'john_Smith@email.com',
        password:
            '$2b$10$xk7u5Tvrw2IXd/oNNzEkTenOItozImgX04dx4048unVrmCGBQ46Wu',
        phone: '+12133734253',
        address: '11 Cooper Dr. New Port Richey, FL 34653',
    },
]);

export const userListDto: UserDto[] = userList.toDtos();

export const userToAdd: UserRegistrationDto = {
    name: 'John Smith',
    email: 'john_smith@email.com',
    password: 'paSSWord',
    phone: '+12133734253',
    address: '11 Cooper Dr. New Port Richey, FL 34653',
};

export const newUser: UserEntity = plainToInstance(UserEntity, {
    id: '0c9b3178-bf8d-4f28-954c-0dc94fe23460',
    createdAt: new Date('2022-02-02T15:00:18.609Z'),
    updatedAt: new Date('2022-02-02T15:00:18.609Z'),
    name: 'John Smith',
    email: 'john_Smith@email.com',
    password: '$2b$10$xk7u5Tvrw2IXd/oNNzEkTenOItozImgX04dx4048unVrmCGBQ46Wu',
    phone: '+12133734253',
    address: '11 Cooper Dr. New Port Richey, FL 34653',
});

export const newUserDto: UserDto = newUser.toDto();

export const userToGetByEmail = '0c9b3178-bf8d-4f28-954c-0dc94fe23460';

export const userToGetByEmailResult: UserWithRoleDto = {
    id: '0c9b3178-bf8d-4f28-954c-0dc94fe23460',
    email: 'john_Smith@email.com',
    password: '$2b$10$xk7u5Tvrw2IXd/oNNzEkTenOItozImgX04dx4048unVrmCGBQ46Wu',
    role: Role.USER,
};

export const userToRemove = '4954a71c-62aa-4b98-9840-e730f76e491e';
