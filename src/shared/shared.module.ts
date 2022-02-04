import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmConfigService } from './services/type.orm.config.service';

@Global()
@Module({
    providers: [TypeOrmConfigService],
    imports: [HttpModule, ConfigModule],
    exports: [TypeOrmConfigService, HttpModule],
})
export class SharedModule {}
