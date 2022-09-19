import { BasketItem } from './Basket';
interface TaxOptions {
    importRate: number;
    generalRate: number;
    precision: number;
}
export declare class TaxCalculator {
    private readonly importRate;
    private readonly generalRate;
    private readonly precision;
    constructor(options: TaxOptions);
    /**
     * Calculates the summarized tax for a product
     */
    calculateTax(item: BasketItem): number;
}
export {};
