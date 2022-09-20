import { BasketItem } from './Basket';
import { TaxOptions } from './TaxCalculator';
declare type ReceiptOptions = TaxOptions;
export declare class Receipt {
    private taxCalculator;
    private readonly items;
    constructor(options: ReceiptOptions);
    addItem(item: BasketItem): void;
    getSummary(): string;
}
export {};
