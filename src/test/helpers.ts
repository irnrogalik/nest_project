import type { INestApplication } from '@nestjs/common';
import type { Response } from 'superagent';
import supertest from 'supertest';

import type { UserLoginDto } from '../common/dto/UserLoginDto';

export interface ITokensResult {
    adminToken: string | undefined;
    userToken: string | undefined;
}

export async function getListOfTokensForTest(
    app: INestApplication,
): Promise<ITokensResult> {
    const admin: UserLoginDto = {
        email: 'admin@test.com',
        password: 'TESTadmin1234_',
    };

    const user: UserLoginDto = {
        email: 'user@test.com',
        password: 'userTest',
    };

    const { body: adminResponse }: Response = await supertest(
        app.getHttpServer(),
    )
        .post('/auth/admin/login')
        .send({ email: admin.email, password: admin.password });
    const adminToken: string = adminResponse.access_token || undefined;

    const { body: userResponse }: Response = await supertest(
        app.getHttpServer(),
    )
        .post('/auth/login')
        .send({ email: user.email, password: user.password });
    const userToken: string = userResponse.access_token || undefined;

    return { adminToken, userToken };
}
