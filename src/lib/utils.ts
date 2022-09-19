import path from 'path';
import fs from 'fs';

/**
 * Rounds the given value up to the next precision value (max 2 decimal places returned)
 *
 * @param val value to round
 * @param precision precision to round to
 */
export function roundUp(val: number, precision: number): number {
    return Math.round(Math.ceil(val / precision) * precision * 100) / 100;
}

/**
 * Ensures given parameter is a valid absolute path and file exists
 *
 * @param filePath path to check
 */
export function validatePath(filePath: unknown): asserts filePath is string {
    assertsString(filePath);

    if (!path.isAbsolute(filePath)) {
        throw new Error('Path is not absolute, provide an absolute path');
    }

    if (!fs.existsSync(filePath)) {
        throw new Error('File does not exist');
    }
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
