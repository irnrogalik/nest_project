import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './services/app.config.service';

@Global()
@Module({
    providers: [AppConfigService],
    imports: [HttpModule, ConfigModule],
    exports: [AppConfigService, HttpModule],
})
export class SharedModule {}
