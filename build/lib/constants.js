"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RELATIVE_RECEIPT_CONFIG_PATH = exports.RELATIVE_BASKET_CONFIG_PATH = exports.DEFAULT_PRECISION = exports.DEFAULT_GENERAL_RATE = exports.DEFAULT_IMPORT_RATE = exports.DEFAULT_BOOK_KEYWORDS = exports.DEFAULT_MEDICINE_KEYWORDS = exports.DEFAULT_FOOD_KEYWORDS = exports.DEFAULT_IMPORTED_PHRASE = exports.CATEGORY = exports.EXIT_CODES = void 0;
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
exports.DEFAULT_IMPORTED_PHRASE = 'imported';
exports.DEFAULT_FOOD_KEYWORDS = ['chocolate'];
exports.DEFAULT_MEDICINE_KEYWORDS = ['pill'];
exports.DEFAULT_BOOK_KEYWORDS = ['book'];
exports.DEFAULT_IMPORT_RATE = 0.05;
exports.DEFAULT_GENERAL_RATE = 0.1;
exports.DEFAULT_PRECISION = 0.05;
exports.RELATIVE_BASKET_CONFIG_PATH = path_1.default.join('config', 'basketConfig.json');
exports.RELATIVE_RECEIPT_CONFIG_PATH = path_1.default.join('config', 'receiptConfig.json');
//# sourceMappingURL=constants.js.map