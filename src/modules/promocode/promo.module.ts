import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { PromocodeController } from './promo.controller';
import { PromocodeService } from './promo.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PROMO_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'promo',
                    protoPath: join(__dirname, '/promo.proto'),
                },
            },
        ]),
    ],
    controllers: [PromocodeController],
    exports: [PromocodeService],
    providers: [PromocodeService],
})
export class PromocodeModule {}
