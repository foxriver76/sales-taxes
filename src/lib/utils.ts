import path from 'path';
import fs from 'fs';
import { BasketOptions } from './Basket';
import { RELATIVE_BASKET_CONFIG_PATH, RELATIVE_RECEIPT_CONFIG_PATH } from './constants';
import { ReceiptOptions } from './Receipt';

/**
 * Rounds the given value up to the next precision value (max 2 decimal places returned)
 *
 * @param val value to round
 * @param precision precision to round to
 */
export function roundUp(val: number, precision: number): number {
    return round(Math.ceil(val / precision) * precision);
}

/**
 * Rounds value to 2 decimal places
 * @param val value to round
 */
export function round(val: number): number {
    return Math.round(val * 100) / 100;
}

/**
 * Ensures given parameter is a valid path and file exists
 *
 * @param filePath path to check
 */
export function validatePath(filePath: unknown): asserts filePath is string {
    assertsString(filePath);

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist');
    }
}

/**
 * Reads the basket config from the file system
 */
export function readBasketConfig(): BasketOptions {
    return JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', '..', RELATIVE_BASKET_CONFIG_PATH), { encoding: 'utf-8' })
    );
}

/**
 * Reads the receipt config from the file system
 */
export function readReceiptConfig(): ReceiptOptions {
    return JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', '..', RELATIVE_RECEIPT_CONFIG_PATH), { encoding: 'utf-8' })
    );
}

/**
 * Ensures an argument is of type string
 *
 * @param argument argument to check for
 */
export function assertsString(argument: unknown): asserts argument is string {
    if (typeof argument !== 'string') {
        throw new Error(`Invalid argument, expected type "string", got type "${typeof argument}"`);
    }
}
