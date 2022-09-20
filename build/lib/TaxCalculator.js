"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxCalculator = void 0;
const constants_1 = require("./constants");
const utils_1 = require("./utils");
class TaxCalculator {
    constructor(options) {
        if (options) {
            this.importRate = options.importRate;
            this.generalRate = options.generalRate;
            this.precision = options.precision;
        }
        else {
            this.importRate = constants_1.DEFAULT_IMPORT_RATE;
            this.generalRate = constants_1.DEFAULT_GENERAL_RATE;
            this.precision = constants_1.DEFAULT_PRECISION;
        }
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
        return (0, utils_1.roundUp)(totalTax, this.precision);
    }
}
exports.TaxCalculator = TaxCalculator;
//# sourceMappingURL=TaxCalculator.js.map