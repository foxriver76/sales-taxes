"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receipt = void 0;
const TaxCalculator_1 = require("./TaxCalculator");
const utils_1 = require("./utils");
class Receipt {
    constructor(options) {
        this.items = [];
        this.taxCalculator = new TaxCalculator_1.TaxCalculator(options);
    }
    addItem(item) {
        const tax = this.taxCalculator.calculateTax(item);
        this.items.push({ ...item, tax, totalPrice: tax + item.price });
    }
    getSummary() {
        let output = '';
        let totalPriceSummary = 0;
        let taxesSummary = 0;
        for (const item of this.items) {
            output += `${item.count}${item.imported ? ' imported' : ''} ${item.name}: ${(0, utils_1.round)(item.totalPrice)}\n`;
            totalPriceSummary += item.count * item.totalPrice;
            taxesSummary += item.tax;
        }
        output += `Sales Taxes: ${(0, utils_1.round)(taxesSummary)}\n`;
        output += `Total: ${(0, utils_1.round)(totalPriceSummary)}`;
        return output;
    }
}
exports.Receipt = Receipt;
//# sourceMappingURL=Receipt.js.map