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

export const DEFAULT_IMPORTED_PHRASE = 'imported';
export const DEFAULT_FOOD_KEYWORDS = ['chocolate'];
export const DEFAULT_MEDICINE_KEYWORDS = ['pill'];
export const DEFAULT_BOOK_KEYWORDS = ['book'];

export const DEFAULT_IMPORT_RATE = 0.05;
export const DEFAULT_GENERAL_RATE = 0.1;
export const DEFAULT_PRECISION = 0.05;

export const RELATIVE_BASKET_CONFIG_PATH = path.join('config', 'basketConfig.json');
export const RELATIVE_RECEIPT_CONFIG_PATH = path.join('config', 'receiptConfig.json');
