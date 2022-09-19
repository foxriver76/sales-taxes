"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./lib/utils");
const constants_1 = require("./lib/constants");
const Basket_1 = require("./lib/Basket");
yargs_1.default
    .command('input <input>', 'Provide basket as direct input', yargs => yargs, argv => {
    const content = argv.input;
    try {
        (0, utils_1.assertsString)(content);
        handleContent(content);
    }
    catch (e) {
        console.error(e.message);
        process.exit(constants_1.EXIT_CODES.ERROR);
    }
})
    .command('file <path>', 'Provide basket from file', yargs => yargs, argv => {
    const filePath = argv.path;
    try {
        (0, utils_1.validatePath)(filePath);
    }
    catch (e) {
        console.error(e.message);
        process.exit(constants_1.EXIT_CODES.ERROR);
    }
    try {
        const content = fs_1.default.readFileSync(filePath, { encoding: 'utf-8' });
        handleContent(content);
    }
    catch (e) {
        console.error(e.message);
        process.exit(constants_1.EXIT_CODES.ERROR);
    }
})
    .parse();
/**
 * Handles the content passed to the cli
 *
 * @param content content passed to the cli
 */
function handleContent(content) {
    // options are designed to be passed, but we use constants for now
    const basket = new Basket_1.Basket({
        medicineKeywords: constants_1.MEDICINE_KEYWORDS,
        foodKeywords: constants_1.FOOD_KEYWORDS,
        bookKeywords: constants_1.BOOK_KEYWORDS
    });
    const contentLines = content.split('\n');
    for (const line of contentLines) {
        basket.addItem(line);
    }
    // basket.getItems()
    // receipt.addItem(..)
    // receipt.printAll()
}
//# sourceMappingURL=index.js.map