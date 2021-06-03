import { Global, HttpModule, Module } from '@nestjs/common';

import { ConfigService } from './services/config.service';
import { TranslationService } from './services/translation.service';

const providers = [ConfigService, TranslationService];

@Global()
@Module({
    providers,
    imports: [HttpModule],
    exports: [...providers, HttpModule],
})
export class SharedModule {}
