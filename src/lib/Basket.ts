import {
    CATEGORY,
    DEFAULT_BOOK_KEYWORDS,
    DEFAULT_FOOD_KEYWORDS,
    DEFAULT_IMPORTED_PHRASE,
    DEFAULT_MEDICINE_KEYWORDS
} from './constants';

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

export interface BasketOptions {
    foodKeywords: string[];
    medicineKeywords: string[];
    bookKeywords: string[];
}

export class Basket {
    private readonly items: BasketItem[] = [];
    private readonly foodKeywords: string[];
    private readonly medicineKeywords: string[];
    private readonly bookKeywords: string[];

    constructor(options?: BasketOptions) {
        if (options) {
            this.foodKeywords = options.foodKeywords;
            this.medicineKeywords = options.medicineKeywords;
            this.bookKeywords = options.bookKeywords;
        } else {
            this.foodKeywords = DEFAULT_FOOD_KEYWORDS;
            this.medicineKeywords = DEFAULT_MEDICINE_KEYWORDS;
            this.bookKeywords = DEFAULT_BOOK_KEYWORDS;
        }
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
        const [descriptionPhrase, pricePhrase] = item.split(' at ');

        const price = parseFloat(pricePhrase);

        const countPhrase = descriptionPhrase.split(' ')[0];
        const itemPhrase = descriptionPhrase.substring(countPhrase.length + 1);

        const isImported = itemPhrase.includes(DEFAULT_IMPORTED_PHRASE);

        let itemName: string;

        if (isImported) {
            const subphrases = itemPhrase.split(`${DEFAULT_IMPORTED_PHRASE} `);
            itemName = subphrases.join('');
        } else {
            itemName = itemPhrase;
        }

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
