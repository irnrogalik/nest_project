import '../../boilerplate.polyfill';

import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { RoleRepository } from './repository/role.repository';
import { UserRepository } from './repository/user.repository';
import { UserRoleRepository } from './repository/user.role.repository';
import {
    newUser,
    newUserDto,
    pageOptions,
    userList,
    userListDto,
    userToAdd,
    userToGetByEmail,
    userToGetByEmailResult,
    userToRemove,
} from './user.fixture';
import { UserService } from './user.service';

describe('User Service', () => {
    let userService: UserService;

    beforeEach(async () => {
        const UserRepositoryProvider = {
            provide: UserRepository,
            useFactory: () => ({
                getUserList: jest.fn(() => userList),
                addUser: jest.fn(() => newUser),
                removeUser: jest.fn(() => true),
                getUserByEmail: jest.fn(() => userToGetByEmailResult),
            }),
        };
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                UserRepositoryProvider,
                UserService,
                RoleRepository,
                UserRoleRepository,
            ],
        }).compile();

        userService = app.get<UserService>(UserService);
    });

    describe('get user list', () => {
        it('should return list of products', async () => {
            expect(await userService.getUserList(pageOptions)).toEqual(
                userListDto,
            );
        });
    });

    describe('add new user', () => {
        it('should return new user', async () => {
            expect(await userService.addUser(userToAdd)).toEqual(newUserDto);
        });
    });

    describe('get user by email', () => {
        it('should return user with role', async () => {
            expect(await userService.getUserByEmail(userToGetByEmail)).toEqual(
                userToGetByEmailResult,
            );
        });
    });

    describe('remove user', () => {
        it('should return successful result', async () => {
            expect(await userService.removeUser(userToRemove)).toEqual(true);
        });
    });
});
