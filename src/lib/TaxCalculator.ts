import { BasketItem } from './Basket';
import { CATEGORY } from './constants';
import { roundUp } from './utils';

interface TaxOptions {
    importRate: number;
    generalRate: number;
    precision: number;
}

export class TaxCalculator {
    private readonly importRate: number;
    private readonly generalRate: number;
    private readonly precision: number;

    constructor(options: TaxOptions) {
        this.importRate = options.importRate;
        this.generalRate = options.generalRate;
        this.precision = options.precision;
    }

    /**
     * Calculates the summarized tax for a product
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

        // not clear from description, so I guess more than one will still be price for one
        return roundUp(item.count * totalTax, this.precision);
    }
}
