import type { INestApplication } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

import { AppModule } from '../../app.module';

@Injectable()
export class AuthGuard {
    canActivate() {
        const x = true;
        if (x) {
            throw new UnauthorizedException();
        }
    }
}

function createTestModule(guard) {
    return Test.createTestingModule({
        imports: [AppModule],
        providers: [
            {
                provide: APP_GUARD,
                useValue: guard,
            },
        ],
    }).compile();
}

describe('Guards', () => {
    let app: INestApplication;

    it('should prevent access (unauthorized)', async () => {
        app = (await createTestModule(new AuthGuard())).createNestApplication();

        await app.init();
        return supertest(app.getHttpServer()).get('/user').expect(401);
    });
});
