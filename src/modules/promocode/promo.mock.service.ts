import type { Observable } from 'rxjs';
import { of } from 'rxjs';

import { listOfPromocodes, promocode } from './promo.fixture';
import type {
    IPromoCode,
    IPromoCodeBoolResponse,
    IPromoCodeService,
} from './promo.interface';

export class MockPromoCodeService implements IPromoCodeService {
    getListOfPromocodes(): Observable<IPromoCode[]> {
        return of(listOfPromocodes);
    }

    addPromoCode(): Observable<IPromoCode> {
        return of(promocode);
    }

    removePromoCode(): Observable<IPromoCodeBoolResponse> {
        return of({ response: true });
    }

    isPromoCodeValid(): Observable<IPromoCodeBoolResponse> {
        return of({ response: true });
    }

    markPromoCodeAsUsed(): Observable<IPromoCodeBoolResponse> {
        return of({ response: true });
    }

    isPromoCodeExist(): Observable<IPromoCodeBoolResponse> {
        return of({ response: true });
    }

    getPromoCodeByName(): Observable<IPromoCode> {
        return of(promocode);
    }
}
