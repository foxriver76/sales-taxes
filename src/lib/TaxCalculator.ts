import { BasketItem } from './Basket';
import { CATEGORY, DEFAULT_GENERAL_RATE, DEFAULT_IMPORT_RATE, DEFAULT_PRECISION } from './constants';
import { roundUp } from './utils';

export interface TaxOptions {
    importRate: number;
    generalRate: number;
    precision: number;
}

export class TaxCalculator {
    private readonly importRate: number;
    private readonly generalRate: number;
    private readonly precision: number;

    constructor(options?: TaxOptions) {
        if (options) {
            this.importRate = options.importRate;
            this.generalRate = options.generalRate;
            this.precision = options.precision;
        } else {
            this.importRate = DEFAULT_IMPORT_RATE;
            this.generalRate = DEFAULT_GENERAL_RATE;
            this.precision = DEFAULT_PRECISION;
        }
    }

    /**
     * Calculates the summarized tax for a product per piece
     */
    calculateTax(item: BasketItem): number {
        const basePrice = item.price;
        let totalTax = 0;
        if (item.imported) {
            totalTax = basePrice * this.importRate;
        }

        if (item.category === CATEGORY.OTHER) {
            totalTax += basePrice * this.generalRate;
        }

        return roundUp(totalTax, this.precision);
    }
}
