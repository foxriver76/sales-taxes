import { CATEGORY, IMPORTED_PHRASE } from './constants';

export interface BasketItem {
    /** if item has been imported */
    imported: boolean;
    /** name of the item */
    name: string;
    /** count of items */
    count: number;
    /** item category */
    category: CATEGORY;
    /** price of the item */
    price: number;
}

interface BasketOptions {
    foodKeywords: string[];
    medicineKeywords: string[];
    bookKeywords: string[];
}

export class Basket {
    private readonly items: BasketItem[] = [];
    private readonly foodKeywords: string[];
    private readonly medicineKeywords: string[];
    private readonly bookKeywords: string[];

    constructor(options: BasketOptions) {
        this.foodKeywords = options.foodKeywords;
        this.medicineKeywords = options.medicineKeywords;
        this.bookKeywords = options.bookKeywords;
    }

    /**
     * Adds a stringified item to the basket
     *
     * @param item stringified item to add
     */
    addItem(item: string): void {
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
    private parseItem(item: string): BasketItem {
        let descriptionPhrase: string;
        let pricePhrase: string;

        if (item.includes(' at ')) {
            [descriptionPhrase, pricePhrase] = item.split(' at ');
        } else {
            [descriptionPhrase, pricePhrase] = item.split(': ');
        }

        const price = parseFloat(pricePhrase);

        const countPhrase = descriptionPhrase.split(' ')[0];
        const itemPhrase = descriptionPhrase.substring(countPhrase.length + 1);

        const isImported = itemPhrase.startsWith(IMPORTED_PHRASE);

        const itemName = isImported ? itemPhrase.substring(IMPORTED_PHRASE.length + 1) : itemPhrase;

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
    private classifyItem(itemName: string): CATEGORY {
        for (const keyword of this.bookKeywords) {
            if (itemName.includes(keyword)) {
                return CATEGORY.BOOK;
            }
        }

        for (const keyword of this.foodKeywords) {
            if (itemName.includes(keyword)) {
                return CATEGORY.FOOD;
            }
        }

        for (const keyword of this.medicineKeywords) {
            if (itemName.includes(keyword)) {
                return CATEGORY.MEDICINE;
            }
        }

        return CATEGORY.OTHER;
    }

    /**
     * Get current items of shopping basket
     */
    getItems(): BasketItem[] {
        return this.items;
    }
}
