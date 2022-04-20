import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

import { AppModule } from '../../app.module';
import type { ITokensResult } from '../../test/helpers';
import { getListOfTokensForTest } from '../../test/helpers';
import { Role } from './role.enum';

function createTestModule() {
    return Test.createTestingModule({
        imports: [AppModule],
    }).compile();
}

describe('Test guards for user.controller', () => {
    let app: INestApplication;
    let tokens: ITokensResult;

    beforeAll(async () => {
        app = (await createTestModule()).createNestApplication();
        await app.init();
        tokens = await getListOfTokensForTest(app);
    });

    it('admin should get the list of users', async () => {
        expect(tokens.adminToken).toBeDefined();

        const response = await supertest(app.getHttpServer())
            .get('/user')
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .expect(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('user should not have access to get list of users (unauthorized)', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .get('/user')
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .expect(401);
        expect(response.body.length).toBeUndefined();
    });

    it('admin should not have access to get profile (unauthorized)', async () => {
        expect(tokens.adminToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .get('/user/profile')
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .expect(401);
        expect(response.body.length).toBeUndefined();
    });

    it('user should get profile', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .get('/user/profile')
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .expect(200);
        expect(response.body).toBeDefined();
        expect(response.body.role).toEqual(Role.USER);
    });
});
