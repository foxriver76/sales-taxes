import { BasketOptions } from './Basket';
import { ReceiptOptions } from './Receipt';
/**
 * Rounds the given value up to the next precision value (max 2 decimal places returned)
 *
 * @param val value to round
 * @param precision precision to round to
 */
export declare function roundUp(val: number, precision: number): number;
/**
 * Rounds value to 2 decimal places
 * @param val value to round
 */
export declare function round(val: number): number;
/**
 * Ensures given parameter is a valid path and file exists
 *
 * @param filePath path to check
 */
export declare function validatePath(filePath: unknown): asserts filePath is string;
/**
 * Reads the basket config from the file system
 */
export declare function readBasketConfig(): BasketOptions;
/**
 * Reads the receipt config from the file system
 */
export declare function readReceiptConfig(): ReceiptOptions;
/**
 * Ensures an argument is of type string
 *
 * @param argument argument to check for
 */
export declare function assertsString(argument: unknown): asserts argument is string;
