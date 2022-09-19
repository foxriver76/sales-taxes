"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOOK_KEYWORDS = exports.MEDICINE_KEYWORDS = exports.FOOD_KEYWORDS = exports.IMPORTED_PHRASE = exports.CATEGORY = exports.EXIT_CODES = void 0;
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
//# sourceMappingURL=constants.js.map