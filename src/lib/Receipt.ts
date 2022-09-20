import { BasketItem } from './Basket';
import { TaxCalculator, TaxOptions } from './TaxCalculator';
import { round } from './utils';

export type ReceiptOptions = TaxOptions;

interface ReceiptItem extends BasketItem {
    tax: number;
    totalPrice: number;
}

export class Receipt {
    private taxCalculator: TaxCalculator;
    private readonly items: ReceiptItem[] = [];

    constructor(options: ReceiptOptions) {
        this.taxCalculator = new TaxCalculator(options);
    }

    addItem(item: BasketItem): void {
        const tax = this.taxCalculator.calculateTax(item);
        this.items.push({ ...item, tax, totalPrice: tax + item.price });
    }

    getSummary(): string {
        let output = '';
        let totalPriceSummary = 0;
        let taxesSummary = 0;

        for (const item of this.items) {
            output += `${item.count}${item.imported ? ' imported' : ''} ${item.name}: ${round(item.totalPrice).toFixed(
                2
            )}\n`;
            totalPriceSummary += item.count * item.totalPrice;
            taxesSummary += item.count * item.tax;
        }

        output += `Sales Taxes: ${round(taxesSummary).toFixed(2)}\n`;
        output += `Total: ${round(totalPriceSummary).toFixed(2)}`;

        return output;
    }
}
