"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxCalculator = void 0;
const constants_1 = require("./constants");
const utils_1 = require("./utils");
class TaxCalculator {
    constructor(options) {
        this.importRate = options.importRate;
        this.generalRate = options.generalRate;
        this.precision = options.precision;
    }
    /**
     * Calculates the summarized tax for a product per piece
     */
    calculateTax(item) {
        const basePrice = item.price;
        let totalTax = 0;
        if (item.imported) {
            totalTax = basePrice * this.importRate;
        }
        if (item.category === constants_1.CATEGORY.OTHER) {
            totalTax += basePrice * this.generalRate;
        }
        // not clear from description, so I guess more than one will still be price for one
        return (0, utils_1.roundUp)(totalTax, this.precision);
    }
}
exports.TaxCalculator = TaxCalculator;
//# sourceMappingURL=TaxCalculator.js.map