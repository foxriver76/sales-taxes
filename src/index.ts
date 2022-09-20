import yargs from 'yargs';
import fs from 'fs';
import { validatePath, assertsString, readBasketConfig, readReceiptConfig } from './lib/utils';
import { EXIT_CODES } from './lib/constants';
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
    .strictCommands()
    .demandCommand()
    .parse();

/**
 * Handles the content passed to the cli
 *
 * @param content content passed to the cli
 */
function handleContent(content: string): void {
    // options are designed to be passed, but we use constants for now
    const basketOptions = readBasketConfig();

    const basket = new Basket(basketOptions);
    const contentLines = content.split('\n');

    for (const line of contentLines) {
        basket.addItem(line);
    }

    const items = basket.getItems();

    const receiptOptions = readReceiptConfig();
    const receipt = new Receipt(receiptOptions);

    for (const item of items) {
        receipt.addItem(item);
    }

    console.log(receipt.getSummary());
}
