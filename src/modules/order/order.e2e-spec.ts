import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

import { AppModule } from '../../app.module';
import type { ITokensResult } from '../../test/helpers';
import { getListOfTokensForTest } from '../../test/helpers';
import type { CartDto } from './dto/CartDto';

function createTestModule() {
    return Test.createTestingModule({
        imports: [AppModule],
    }).compile();
}

describe('Test guards for order.controller', () => {
    let app: INestApplication;
    let tokens: ITokensResult;
    const cart: CartDto[] = [
        { id: '3ab7fed8-7270-482a-8e83-f2e4c6ae64cb', quantity: 1 },
    ];

    beforeAll(async () => {
        app = (await createTestModule()).createNestApplication();
        await app.init();
        tokens = await getListOfTokensForTest(app);
    });

    it('admin can get list of orders', async () => {
        expect(tokens.adminToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .get('/order/fullList')
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .expect(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('user can not get list of orders', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .get('/order/fullList')
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .expect(401);
        expect(response.body.length).toBeUndefined();
    });

    it('admin should not get access to view the list of orders for admin', async () => {
        expect(tokens.adminToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .get('/order/userList')
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .expect(401);
        expect(response.body.length).toBeUndefined();
    });

    it('user should get access to view the list of orders for user', async () => {
        expect(tokens.userToken).toBeDefined();
        await supertest(app.getHttpServer())
            .get('/order/userList')
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .expect(200);
    });

    it('admin should get access to view the cart', async () => {
        expect(tokens.adminToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .post('/order/cart')
            .set('Authorization', `Bearer ${tokens.adminToken}`)
            .send(cart)
            .expect(200);
        expect(response.body).toBeDefined();
        expect(response.body.products).toBeDefined();
        expect(response.body.order).toBeDefined();
        expect(response.body.products.length).toBeGreaterThan(0);
    });

    it('user should get access to view the cart', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .post('/order/cart')
            .set('Authorization', `Bearer ${tokens.userToken}`)
            .send(cart)
            .expect(200);
        expect(response.body).toBeDefined();
        expect(response.body.products).toBeDefined();
        expect(response.body.order).toBeDefined();
        expect(response.body.products.length).toBeGreaterThan(0);
    });

    it('any user should get access to view the cart', async () => {
        expect(tokens.userToken).toBeDefined();
        const response = await supertest(app.getHttpServer())
            .post('/order/cart')
            .send(cart)
            .expect(200);
        expect(response.body).toBeDefined();
        expect(response.body.products).toBeDefined();
        expect(response.body.order).toBeDefined();
        expect(response.body.products.length).toBeGreaterThan(0);
    });
});
