"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basket = void 0;
const constants_1 = require("./constants");
class Basket {
    constructor(options) {
        this.items = [];
        this.foodKeywords = options.foodKeywords;
        this.medicineKeywords = options.medicineKeywords;
        this.bookKeywords = options.bookKeywords;
    }
    /**
     * Adds a stringified item to the basket
     *
     * @param item stringified item to add
     */
    addItem(item) {
        if (!item) {
            return;
        }
        this.items.push(this.parseItem(item));
    }
    /**
     * Parses a stringified item to a BasketItem
     *
     * @param item stringified item to parse
     */
    parseItem(item) {
        let descriptionPhrase;
        let pricePhrase;
        if (item.includes(' at ')) {
            [descriptionPhrase, pricePhrase] = item.split(' at ');
        }
        else {
            [descriptionPhrase, pricePhrase] = item.split(': ');
        }
        const price = parseFloat(pricePhrase);
        const countPhrase = descriptionPhrase.split(' ')[0];
        const itemPhrase = descriptionPhrase.substring(countPhrase.length + 1);
        const isImported = itemPhrase.startsWith(constants_1.IMPORTED_PHRASE);
        const itemName = isImported ? itemPhrase.substring(constants_1.IMPORTED_PHRASE.length + 1) : itemPhrase;
        const category = this.classifyItem(itemName);
        return {
            name: itemName,
            imported: isImported,
            count: parseInt(countPhrase),
            category: category,
            price
        };
    }
    /**
     * Checks if the item belongs to a specific category
     *
     * @param itemName
     */
    classifyItem(itemName) {
        for (const keyword of this.bookKeywords) {
            if (itemName.includes(keyword)) {
                return constants_1.CATEGORY.BOOK;
            }
        }
        for (const keyword of this.foodKeywords) {
            if (itemName.includes(keyword)) {
                return constants_1.CATEGORY.FOOD;
            }
        }
        for (const keyword of this.medicineKeywords) {
            if (itemName.includes(keyword)) {
                return constants_1.CATEGORY.MEDICINE;
            }
        }
        return constants_1.CATEGORY.OTHER;
    }
    /**
     * Get current items of shopping basket
     */
    getItems() {
        return this.items;
    }
}
exports.Basket = Basket;
//# sourceMappingURL=Basket.js.map