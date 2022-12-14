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
const Receipt_1 = require("./lib/Receipt");
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
    .strictCommands()
    .demandCommand()
    .parse();
/**
 * Handles the content passed to the cli
 *
 * @param content content passed to the cli
 */
function handleContent(content) {
    // options are designed to be passed, but we use constants for now
    const basketOptions = (0, utils_1.readBasketConfig)();
    const basket = new Basket_1.Basket(basketOptions);
    const contentLines = content.split('\n');
    for (const line of contentLines) {
        basket.addItem(line);
    }
    const items = basket.getItems();
    const receiptOptions = (0, utils_1.readReceiptConfig)();
    const receipt = new Receipt_1.Receipt(receiptOptions);
    for (const item of items) {
        receipt.addItem(item);
    }
    console.log(receipt.getSummary());
}
//# sourceMappingURL=index.js.map