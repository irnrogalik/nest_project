import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import type { Observable } from 'rxjs';
import { catchError, of } from 'rxjs';

import type { PageOptionsDto } from '../../common/dto/PageOptionsDto';
import type { PromocodeAddDto } from './dto/PromocodeAddDto';
import type { PromocodeNameDto } from './dto/PromocodeNameDto';
import type { PromocodeRemoveDto } from './dto/PromocodeRemoveDto';
import type {
    IAddPromoCode,
    IError,
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
    ): Observable<IPromoCode[] | IError> {
        const promocodes = this.promoGRPCService
            .getListOfPromocodes(pageOptionsDto)
            .pipe(catchError((e) => of({ error: e.message })));
        return promocodes;
    }

    async addPromoCode(
        promocodeAddDto: PromocodeAddDto,
    ): Promise<Observable<IPromoCode | IError>> {
        const isExist = await this.isPromoCodeExist({
            name: promocodeAddDto.name,
        });
        if (!isExist) {
            const newAddPromo: IAddPromoCode = {
                ...promocodeAddDto,
                startDate: new Date(promocodeAddDto.startDate).toString(),
                endDate: new Date(promocodeAddDto.endDate).toString(),
            };
            const newPromocode = this.promoGRPCService
                .addPromoCode(newAddPromo)
                .pipe(catchError((e) => of({ error: e.message })));
            return newPromocode;
        } else {
            throw new BadRequestException(
                `The promocode ${promocodeAddDto.name} already exist`,
            );
        }
    }

    async removePromoCode(
        promocode: PromocodeRemoveDto,
    ): Promise<Observable<IPromoCodeBoolResponse | IError>> {
        const isExist = await this.isPromoCodeExist({ name: promocode.name });
        if (isExist) {
            const result = this.promoGRPCService
                .removePromoCode(promocode)
                .pipe(catchError((e) => of({ error: e.message })));
            return result;
        } else {
            throw new BadRequestException(
                `The promocode ${promocode.name} doesn't exist`,
            );
        }
    }

    async markPromoCodeAsUsed(
        promocodeName: PromocodeNameDto,
    ): Promise<Observable<IPromoCodeBoolResponse | IError>> {
        const isExist = await this.isPromoCodeExist(promocodeName);
        if (isExist) {
            const result = this.promoGRPCService
                .markPromoCodeAsUsed(promocodeName)
                .pipe(catchError((e) => of({ error: e.message })));
            return result;
        } else {
            throw new BadRequestException(
                `The promocode ${promocodeName.name} doesn't exist`,
            );
        }
    }

    async isPromoCodeValid(
        promocodeName: PromocodeNameDto,
    ): Promise<Observable<IPromoCodeBoolResponse | IError> | boolean> {
        const isExist = await this.isPromoCodeExist(promocodeName);
        if (isExist) {
            const result = this.promoGRPCService
                .isPromoCodeValid(promocodeName)
                .pipe(catchError((e) => of({ error: e.message })));
            return result;
        } else {
            return false;
        }
    }

    async isPromoCodeExist(
        promocodeName: PromocodeNameDto,
    ): Promise<boolean | IError> {
        const isExist: boolean = await new Promise((resolve) => {
            this.promoGRPCService
                .isPromoCodeExist(promocodeName)
                .pipe(catchError((e) => of(e)))
                .subscribe((value) => {
                    resolve(value.response);
                });
        });
        return isExist;
    }

    async getPromoCodeByName(
        promocodeName: PromocodeNameDto,
    ): Promise<IPromoCode> {
        const promocode: IPromoCode = await new Promise((resolve) => {
            this.promoGRPCService
                .getPromoCodeByName(promocodeName)
                .subscribe((promo) => {
                    resolve(promo);
                });
        });
        return promocode;
    }

    async getValidPromocodeByName(promocodeName: string): Promise<IPromoCode> {
        const promo: PromocodeNameDto = { name: promocodeName };
        const isValid = await this.isPromoCodeValid(promo);
        if (isValid) {
            const promocode = await this.getPromoCodeByName(promo);
            return promocode;
        } else {
            return undefined;
        }
    }
}
