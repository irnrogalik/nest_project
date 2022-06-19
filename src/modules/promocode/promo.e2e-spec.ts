import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

import { AppModule } from '../../app.module';
import type { ITokensResult } from '../../test/helpers';
import { getListOfTokensForTest } from '../../test/helpers';

function createTestModule() {
    return Test.createTestingModule({
        imports: [AppModule],
    }).compile();
}

describe('Test guards for promo.controller', () => {
    let app: INestApplication;
    let tokens: ITokensResult;

    beforeAll(async () => {
        app = (await createTestModule()).createNestApplication();
        await app.init();
        tokens = await getListOfTokensForTest(app);
    });

    it('admin can get list of promocodes', async () => {
        expect(tokens.adminToken).toBeDefined();
        await supertest(app.getHttpServer())
            .get('/promocode/getList?page=1&limit=10')
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .expect(200);
    });

    it('user can not get list of promocodes', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .get('/promocode/getList')
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .expect(401);
        expect(response.body.length).toBeUndefined();
    });

    it('admin should get access to add promocode', async () => {
        expect(tokens.adminToken).toBeDefined();
        await supertest(app.getHttpServer())
            .post('/promocode/add')
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .expect(201);
    });

    it('user should not get access to add promocode', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .post('/promocode/add')
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .expect(401);
        expect(response.body.length).toBeUndefined();
    });

    it('admin should get access to remove promocode', async () => {
        expect(tokens.adminToken).toBeDefined();
        await supertest(app.getHttpServer())
            .post('/promocode/remove')
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .expect(400);
    });

    it('user should not get access to remove promocode', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .post('/promocode/add')
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .expect(401);
        expect(response.body.length).toBeUndefined();
    });

    it('admin should get access to validate promocode', async () => {
        expect(tokens.adminToken).toBeDefined();
        await supertest(app.getHttpServer())
            .post('/promocode/validate')
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .expect(400);
    });

    it('user should not get access to validate promocode', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .post('/promocode/validate')
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .expect(401);
        expect(response.body.length).toBeUndefined();
    });

    it('admin should get access to mark promocode as used', async () => {
        expect(tokens.adminToken).toBeDefined();
        await supertest(app.getHttpServer())
            .post('/promocode/markAsUsed')
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .expect(400);
    });

    it('user should not get access to mark promocode as used', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .post('/promocode/markAsUsed')
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .expect(401);
        expect(response.body.length).toBeUndefined();
    });
});
