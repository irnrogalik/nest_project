import type { Observable } from 'rxjs';

export interface IPromoCodeService {
    addPromoCode(promocode: IAddPromoCode): Observable<string>;
    removePromoCode(promoName: IPromoCodeName): Observable<string>;
    isPromoCodeValid(promoName: IPromoCodeName): Observable<string>;
    markPromoCodeAsUsed(promoName: IPromoCodeName): Observable<string>;
    // eslint-disable-next-line no-empty-pattern
    getListOfPromocodes({}: IList): Observable<string>;
}

export interface IPromoCode {
    id: string;
    name: string;
    percent: number;
    isUsed: boolean;
    isOneTime: boolean;
    startDate: string;
    endDate: string;
}

export interface IAddPromoCode {
    name: string;
    percent: number;
    isOneTime: boolean;
    startDate: string;
    endDate: string;
}

export interface IPromoCodeName {
    name: string;
}

export interface IPromoCodeBoolResponse {
    response: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IList {}
