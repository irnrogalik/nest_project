import type { PromocodeAddDto } from './dto/PromocodeAddDto';
import type {
    IPageOptions,
    IPromoCode,
    IPromoCodeName,
    IRemovePromoCode,
} from './promo.interface';

export const pageOptions: IPageOptions = {
    page: 1,
    limit: 10,
};

export const listOfPromocodes: IPromoCode[] = [
    {
        id: '6ff628b0-7dd1-40fd-9d00-1298d5037eb3',
        createdAt: '1654063499000',
        name: 'promo10',
        percent: 10,
        isOneTime: false,
        startDate: '1654063499000',
        endDate: '1685599499000',
    },
    {
        id: '71dd1029-3901-4658-83f0-75cce20ddf35',
        createdAt: '1654063499000',
        name: 'promo20',
        percent: 10,
        isOneTime: true,
        usedDate: null,
    },
];

export const promocodeName: IPromoCodeName = {
    name: 'promo10',
};

export const promocodeToRemove: IRemovePromoCode = {
    name: 'promo10',
    deletedReason: 'Promocode is not valid',
};

export const promocodeToAdd: PromocodeAddDto = {
    name: 'promo10',
    percent: 10,
    isOneTime: true,
};

export const promocode: IPromoCode = {
    id: '71dd1029-3901-4658-83f0-75cce20ddf35',
    createdAt: '1654063499000',
    name: 'promo10',
    percent: 10,
    isOneTime: true,
    usedDate: null,
};
