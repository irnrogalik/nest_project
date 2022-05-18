import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import type { Observable } from 'rxjs';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { PromocodeAddDto } from './dto/PromocodeAddDto';
import type { PromocodeNameDto } from './dto/PromocodeNameDto';
import type { PromocodeRemoveDto } from './dto/PromocodeRemoveDto';
import type {
    IAddPromoCode,
    IPromoCode,
    IPromoCodeBoolResponse,
    IPromoCodeService,
} from './promo.interface';
@Injectable()
export class PromocodeService {
    private promoGRPCService: IPromoCodeService;
    constructor(@Inject('PROMO_PACKAGE') private client: ClientGrpc) {
        this.promoGRPCService = this.client.getService('PromoCodeService');
    }
    getListOfPromocodes(
        pageOptionsDto: PageOptionsDto,
    ): Observable<IPromoCode[]> {
        const promocodes = this.promoGRPCService.getListOfPromocodes(
            pageOptionsDto,
        );
        return promocodes;
    }

    async addPromoCode(
        promocodeAddDto: PromocodeAddDto,
    ): Promise<Observable<IPromoCode>> {
        const isExist = await this.isPromoCodeExist({
            name: promocodeAddDto.name,
        });
        if (!isExist) {
            const newAddPromo: IAddPromoCode = {
                ...promocodeAddDto,
                startDate: new Date(promocodeAddDto.startDate).toString(),
                endDate: new Date(promocodeAddDto.endDate).toString(),
            };
            const newPromocode = this.promoGRPCService.addPromoCode(
                newAddPromo,
            );
            return newPromocode;
        } else {
            throw new BadRequestException(
                `The promocode ${promocodeAddDto.name} already exist`,
            );
        }
    }

    async removePromoCode(
        promocode: PromocodeRemoveDto,
    ): Promise<Observable<IPromoCodeBoolResponse>> {
        const isExist = await this.isPromoCodeExist({ name: promocode.name });
        if (isExist) {
            const result = this.promoGRPCService.removePromoCode(promocode);
            return result;
        } else {
            throw new BadRequestException(
                `The promocode ${promocode.name} doesn't exist`,
            );
        }
    }

    async markPromoCodeAsUsed(
        promocodeName: PromocodeNameDto,
    ): Promise<Observable<IPromoCodeBoolResponse>> {
        const isExist = await this.isPromoCodeExist(promocodeName);
        if (isExist) {
            const result = this.promoGRPCService.markPromoCodeAsUsed(
                promocodeName,
            );
            return result;
        } else {
            throw new BadRequestException(
                `The promocode ${promocodeName.name} doesn't exist`,
            );
        }
    }

    async isPromoCodeValid(
        promocodeName: PromocodeNameDto,
    ): Promise<Observable<IPromoCodeBoolResponse>> {
        const isExist = await this.isPromoCodeExist(promocodeName);
        if (isExist) {
            const result = this.promoGRPCService.isPromoCodeValid(
                promocodeName,
            );
            return result;
        } else {
            throw new BadRequestException(
                `The promocode ${promocodeName.name} doesn't exist`,
            );
        }
    }

    async isPromoCodeExist(promocodeName: PromocodeNameDto): Promise<boolean> {
        const isExist: boolean = await new Promise((resolve) => {
            this.promoGRPCService
                .isPromoCodeExist(promocodeName)
                .subscribe((value) => {
                    resolve(value.response);
                });
        });
        return isExist;
    }
}
