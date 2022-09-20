"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertsString = exports.validatePath = exports.round = exports.roundUp = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * Rounds the given value up to the next precision value (max 2 decimal places returned)
 *
 * @param val value to round
 * @param precision precision to round to
 */
function roundUp(val, precision) {
    return round(Math.ceil(val / precision) * precision);
}
exports.roundUp = roundUp;
/**
 * Rounds value to 2 decimal places
 * @param val value to round
 */
function round(val) {
    return Math.round(val * 100) / 100;
}
exports.round = round;
/**
 * Ensures given parameter is a valid absolute path and file exists
 *
 * @param filePath path to check
 */
function validatePath(filePath) {
    assertsString(filePath);
    if (!path_1.default.isAbsolute(filePath)) {
        throw new Error('Path is not absolute, provide an absolute path');
    }
    if (!fs_1.default.existsSync(filePath)) {
        throw new Error('File does not exist');
    }
}
exports.validatePath = validatePath;
/**
 * Ensures an argument is of type string
 *
 * @param argument argument to check for
 */
function assertsString(argument) {
    if (typeof argument !== 'string') {
        throw new Error(`Invalid argument, expected type "string", got type "${typeof argument}"`);
    }
}
exports.assertsString = assertsString;
//# sourceMappingURL=utils.js.map