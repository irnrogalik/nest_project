import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import type { Observable } from 'rxjs';

import type { PromocodeAddDto } from './dto/PromocodeAddDto';
import type { PromocodeNameDto } from './dto/PromocodeNameDto';
import type { IPromoCodeService } from './promo.interface';
@Injectable()
export class PromocodeService {
    private promoGRPCService: IPromoCodeService;
    constructor(@Inject('PROMO_PACKAGE') private client: ClientGrpc) {
        this.promoGRPCService = this.client.getService('PromoCodeService');
    }
    getListOfPromocodes(): Observable<string> {
        const newPromocode = this.promoGRPCService.getListOfPromocodes({});
        return newPromocode;
    }

    addPromoCode(promocodeAddDto: PromocodeAddDto): Observable<string> {
        const newPromocode = this.promoGRPCService.addPromoCode(
            promocodeAddDto,
        );
        return newPromocode;
    }

    removePromoCode(promocodeName: PromocodeNameDto): Observable<string> {
        const result = this.promoGRPCService.removePromoCode(promocodeName);
        return result;
    }

    markPromoCodeAsUsed(promocodeName: PromocodeNameDto): Observable<string> {
        const result = this.promoGRPCService.markPromoCodeAsUsed(promocodeName);
        return result;
    }

    isPromoCodeValid(promocodeName: PromocodeNameDto): Observable<string> {
        const result = this.promoGRPCService.isPromoCodeValid(promocodeName);
        return result;
    }
}
