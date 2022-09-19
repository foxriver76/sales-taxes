/**
 * Rounds the given value up to the next precision value (max 2 decimal places returned)
 *
 * @param val value to round
 * @param precision precision to round to
 */
export declare function roundUp(val: number, precision: number): number;
/**
 * Ensures given parameter is a valid absolute path and file exists
 *
 * @param filePath path to check
 */
export declare function validatePath(filePath: unknown): asserts filePath is string;
/**
 * Ensures an argument is of type string
 *
 * @param argument argument to check for
 */
export declare function assertsString(argument: unknown): asserts argument is string;
