import type { IPromoCodeService } from './promo.interface';
import { MockPromoCodeService } from './promo.mock.service';

export class ClientGrpcMock {
    getService(): IPromoCodeService {
        return new MockPromoCodeService();
    }
}
