/**
 * Rounds the given value up to the next precision value (max 2 decimal places returned)
 *
 * @param val value to round
 * @param precision precision to round to
 */
export function roundUp(val: number, precision: number): number {
    return Math.round(Math.ceil(val / precision) * precision * 100) / 100;
}
