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

describe('Test guards for product.controller', () => {
    let app: INestApplication;
    let tokens: ITokensResult;
    let newProductId: string;

    beforeAll(async () => {
        app = (await createTestModule()).createNestApplication();
        await app.init();
        tokens = await getListOfTokensForTest(app);
    });

    it('admin can get list of products', async () => {
        expect(tokens.adminToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .get('/product')
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .expect(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('user can get list of products', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .get('/product')
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .expect(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('any user can get list of products', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .get('/product')
            .expect(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('user should not get access to add product', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .post('/product/add')
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .expect(401);
        expect(response.body.length).toBeUndefined();
    });

    it('admin should get access to add product', async () => {
        expect(tokens.adminToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .post('/product/add')
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .send({ name: 'test product', amount: 10.0 })
            .expect(201);
        expect(response.body).toBeDefined();
        expect(response.body.id).toBeDefined();
        newProductId = response.body.id;
    });

    it('user should not get access to remove product', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .post(`/product/remove/${newProductId}`)
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .expect(401);
        expect(response.body.length).toBeUndefined();
    });

    it('admin should get access to remove product', async () => {
        expect(tokens.adminToken).toBeDefined();
        await supertest(app.getHttpServer())
            .post(`/product/remove/${newProductId}`)
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .expect(204);
    });
});
