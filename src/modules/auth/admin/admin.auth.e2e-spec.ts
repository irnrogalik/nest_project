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

const admin: UserLoginDto = {
    email: 'admin@test.com',
    password: 'TESTadmin1234_',
};

const wrongAdmin: UserLoginDto = {
    email: 'admin_test@test.com',
    password: 'TESTadmin1234_',
};

describe('Test guards for admin.auth.controller', () => {
    let app: INestApplication;

    beforeAll(async () => {
        app = (await createTestModule()).createNestApplication();
        await app.init();
    });

    it('admin can get access_token', async () => {
        const response = await supertest(app.getHttpServer())
            .post('/auth/admin/login')
            .send({ email: admin.email, password: admin.password })
            .expect(200);
        expect(response.body).toBeDefined();
        expect(response.body.access_token).toBeDefined();
    });

    it('admin cannot get access_token due to Bad Request', async () => {
        const response = await supertest(app.getHttpServer())
            .post('/auth/admin/login')
            .send({ email: wrongAdmin.email, password: wrongAdmin.password })
            .expect(400);
        expect(response.body).toBeDefined();
        expect(response.body.error).toEqual('Bad Request');
    });
});
