import type { Observable } from 'rxjs';

export interface IPromoCodeService {
    addPromoCode(promocode: IAddPromoCode): Observable<IPromoCode>;
    removePromoCode(
        promocode: IRemovePromoCode,
    ): Observable<IPromoCodeBoolResponse>;
    isPromoCodeValid(
        promoName: IPromoCodeName,
    ): Observable<IPromoCodeBoolResponse>;
    markPromoCodeAsUsed(
        promoName: IPromoCodeName,
    ): Observable<IPromoCodeBoolResponse>;
    getListOfPromocodes(pageOptions: IPageOptions): Observable<IPromoCode[]>;
    isPromoCodeExist(
        promoName: IPromoCodeName,
    ): Observable<IPromoCodeBoolResponse>;
    getPromoCodeByName(promoName: IPromoCodeName): Observable<IPromoCode>;
}

export interface IPromoCode {
    id: string;
    name: string;
    createdAt: string;
    percent: number;
    isOneTime: boolean;
    usedDate?: string;
    startDate?: string;
    endDate?: string;
    deletedAt?: string;
    deletedReason?: string;
}

export interface IAddPromoCode {
    name: string;
    percent: number;
    isOneTime: boolean;
    startDate?: string | Date;
    endDate?: string | Date;
}

export interface IPromoCodeName {
    name: string;
}

export interface IPromoCodeBoolResponse {
    response: boolean;
}

export interface IRemovePromoCode {
    name: string;
    deletedReason: string;
}

export interface IPageOptions {
    page: number;
    limit: number;
}

export interface IError {
    error: string;
}
