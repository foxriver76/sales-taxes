import yargs from 'yargs';
import fs from 'fs';
import { validatePath, assertsString } from './lib/utils';
import {
    BOOK_KEYWORDS,
    EXIT_CODES,
    FOOD_KEYWORDS,
    GENERAL_RATE,
    IMPORT_RATE,
    MEDICINE_KEYWORDS,
    PRECISION
} from './lib/constants';
import { Basket } from './lib/Basket';
import { Receipt } from './lib/Receipt';

yargs
    .command(
        'input <input>',
        'Provide basket as direct input',
        yargs => yargs,
        argv => {
            const content = argv.input;
            try {
                assertsString(content);
                handleContent(content);
            } catch (e: any) {
                console.error(e.message);
                process.exit(EXIT_CODES.ERROR);
            }
        }
    )
    .command(
        'file <path>',
        'Provide basket from file',
        yargs => yargs,
        argv => {
            const filePath = argv.path;
            try {
                validatePath(filePath);
            } catch (e: any) {
                console.error(e.message);
                process.exit(EXIT_CODES.ERROR);
            }
            try {
                const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
                handleContent(content);
            } catch (e: any) {
                console.error(e.message);
                process.exit(EXIT_CODES.ERROR);
            }
        }
    )
    .parse();

/**
 * Handles the content passed to the cli
 *
 * @param content content passed to the cli
 */
function handleContent(content: string): void {
    // options are designed to be passed, but we use constants for now
    const basket = new Basket({
        medicineKeywords: MEDICINE_KEYWORDS,
        foodKeywords: FOOD_KEYWORDS,
        bookKeywords: BOOK_KEYWORDS
    });
    const contentLines = content.split('\n');

    for (const line of contentLines) {
        basket.addItem(line);
    }

    const items = basket.getItems();

    const receipt = new Receipt({ generalRate: GENERAL_RATE, importRate: IMPORT_RATE, precision: PRECISION });

    for (const item of items) {
        receipt.addItem(item);
    }

    console.log(receipt.getSummary());
}
