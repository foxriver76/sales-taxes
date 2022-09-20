import path from 'path';
export enum EXIT_CODES {
    NO_ERROR,
    ERROR
}

export enum CATEGORY {
    OTHER,
    FOOD,
    BOOK,
    MEDICINE
}

export const IMPORTED_PHRASE = 'imported';
export const FOOD_KEYWORDS = ['chocolate'];
export const MEDICINE_KEYWORDS = ['pill'];
export const BOOK_KEYWORDS = ['book'];

export const IMPORT_RATE = 0.05;
export const GENERAL_RATE = 0.1;
export const PRECISION = 0.05;

export const RELATIVE_BASKET_CONFIG_PATH = path.join('config', 'basketConfig.json');
export const RELATIVE_RECEIPT_CONFIG_PATH = path.join('config', 'receiptConfig.json');
