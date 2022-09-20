import { Basket } from '../src/lib/Basket';
import { Receipt } from '../src/lib/Receipt';

/**
 * Uses input content and passes it through the receipt to retrive the receipt summary
 * @param content
 */
export function getSummaryForContent(content: string): string {
    const basket = new Basket();

    const contentLines = content.split('\n');

    for (const line of contentLines) {
        basket.addItem(line);
    }

    const items = basket.getItems();

    const receipt = new Receipt();

    for (const item of items) {
        receipt.addItem(item);
    }

    return receipt.getSummary();
}
