import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

import { AppModule } from '../../../app.module';
import type { UserLoginDto } from '../../../common/dto/UserLoginDto';

function createTestModule() {
    return Test.createTestingModule({
        imports: [AppModule],
    }).compile();
}

const user: UserLoginDto = {
    email: 'user@test.com',
    password: 'userTest',
};

const wrongUser: UserLoginDto = {
    email: 'user_test@test.com',
    password: 'userTest',
};

describe('Test guards for auth.controller', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = (await createTestModule()).createNestApplication();
        await app.init();
    });

    it('user can get access_token', async () => {
        const response = await supertest(app.getHttpServer())
            .post('/auth/login')
            .send({ email: user.email, password: user.password })
            .expect(200);
        expect(response.body).toBeDefined();
        expect(response.body.access_token).toBeDefined();
    });

    it('user cannot get access_token due to Bad Request', async () => {
        const response = await supertest(app.getHttpServer())
            .post('/auth/login')
            .send({ email: wrongUser.email, password: wrongUser.password })
            .expect(400);
        expect(response.body).toBeDefined();
        expect(response.body.error).toEqual('Bad Request');
    });
});
