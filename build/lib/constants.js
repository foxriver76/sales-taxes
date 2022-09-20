"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RELATIVE_RECEIPT_CONFIG_PATH = exports.RELATIVE_BASKET_CONFIG_PATH = exports.PRECISION = exports.GENERAL_RATE = exports.IMPORT_RATE = exports.BOOK_KEYWORDS = exports.MEDICINE_KEYWORDS = exports.FOOD_KEYWORDS = exports.IMPORTED_PHRASE = exports.CATEGORY = exports.EXIT_CODES = void 0;
const path_1 = __importDefault(require("path"));
var EXIT_CODES;
(function (EXIT_CODES) {
    EXIT_CODES[EXIT_CODES["NO_ERROR"] = 0] = "NO_ERROR";
    EXIT_CODES[EXIT_CODES["ERROR"] = 1] = "ERROR";
})(EXIT_CODES = exports.EXIT_CODES || (exports.EXIT_CODES = {}));
var CATEGORY;
(function (CATEGORY) {
    CATEGORY[CATEGORY["OTHER"] = 0] = "OTHER";
    CATEGORY[CATEGORY["FOOD"] = 1] = "FOOD";
    CATEGORY[CATEGORY["BOOK"] = 2] = "BOOK";
    CATEGORY[CATEGORY["MEDICINE"] = 3] = "MEDICINE";
})(CATEGORY = exports.CATEGORY || (exports.CATEGORY = {}));
exports.IMPORTED_PHRASE = 'imported';
exports.FOOD_KEYWORDS = ['chocolate'];
exports.MEDICINE_KEYWORDS = ['pill'];
exports.BOOK_KEYWORDS = ['book'];
exports.IMPORT_RATE = 0.05;
exports.GENERAL_RATE = 0.1;
exports.PRECISION = 0.05;
exports.RELATIVE_BASKET_CONFIG_PATH = path_1.default.join('config', 'basketConfig.json');
exports.RELATIVE_RECEIPT_CONFIG_PATH = path_1.default.join('config', 'receiptConfig.json');
//# sourceMappingURL=constants.js.map