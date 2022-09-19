import { CATEGORY } from './constants';
interface BasketItem {
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
export declare class Basket {
    private readonly items;
    private readonly foodKeywords;
    private readonly medicineKeywords;
    private readonly bookKeywords;
    constructor(options: BasketOptions);
    /**
     * Adds a stringified item to the basket
     *
     * @param item stringified item to add
     */
    addItem(item: string): void;
    /**
     * Parses a stringified item to a BasketItem
     *
     * @param item stringified item to parse
     */
    private parseItem;
    /**
     * Checks if the item belongs to a specific category
     *
     * @param itemName
     */
    private classifyItem;
    /**
     * Get current items of shopping basket
     */
    getItems(): BasketItem[];
}
export {};
