import { describe } from 'mocha';
import { roundUp } from '../src/lib/utils';
import { expect } from 'chai';
import { Basket } from '../src/lib/Basket';
import { TaxCalculator } from '../src/lib/TaxCalculator';
import {
    BOOK_KEYWORDS,
    FOOD_KEYWORDS,
    MEDICINE_KEYWORDS,
    PRECISION,
    CATEGORY,
    GENERAL_RATE,
    IMPORT_RATE
} from '../src/lib/constants';

describe('Test utils', () => {
    it('Should round correctly', async () => {
        let roundedNumber = roundUp(156.03, 0.05);
        expect(roundedNumber).to.be.equal(156.05);

        roundedNumber = roundUp(234242.75, 0.1);
        expect(roundedNumber).to.be.equal(234242.8);
    });
});

describe('Test Basket', () => {
    it('Should add category book', () => {
        const basket = new Basket({
            medicineKeywords: MEDICINE_KEYWORDS,
            foodKeywords: FOOD_KEYWORDS,
            bookKeywords: BOOK_KEYWORDS
        });

        basket.addItem('1 book at 12.49');

        const item = basket.getItems()[0];

        expect(item.name).to.be.equal('book');
        expect(item.count).to.be.equal(1);
        expect(item.imported).to.be.equal(false);
        expect(item.category).to.be.equal(CATEGORY.BOOK);
        expect(item.price).to.be.equal(12.49);
    });

    it('Should add category medicine', () => {
        const basket = new Basket({
            medicineKeywords: MEDICINE_KEYWORDS,
            foodKeywords: FOOD_KEYWORDS,
            bookKeywords: BOOK_KEYWORDS
        });

        basket.addItem('1 packet of headache pills at 9.75');

        const item = basket.getItems()[0];

        expect(item.name).to.be.equal('packet of headache pills');
        expect(item.count).to.be.equal(1);
        expect(item.imported).to.be.equal(false);
        expect(item.category).to.be.equal(CATEGORY.MEDICINE);
        expect(item.price).to.be.equal(9.75);
    });

    it('Should add category food', () => {
        const basket = new Basket({
            medicineKeywords: MEDICINE_KEYWORDS,
            foodKeywords: FOOD_KEYWORDS,
            bookKeywords: BOOK_KEYWORDS
        });

        basket.addItem('3 imported box of chocolates: 10.50');

        const item = basket.getItems()[0];

        expect(item.name).to.be.equal('box of chocolates');
        expect(item.count).to.be.equal(3);
        expect(item.imported).to.be.equal(true);
        expect(item.category).to.be.equal(CATEGORY.FOOD);
        expect(item.price).to.be.equal(10.5);
    });

    it('Should add category other', () => {
        const basket = new Basket({
            medicineKeywords: MEDICINE_KEYWORDS,
            foodKeywords: FOOD_KEYWORDS,
            bookKeywords: BOOK_KEYWORDS
        });

        basket.addItem('1 imported bottle of perfume: 32.19');

        const item = basket.getItems()[0];

        expect(item.name).to.be.equal('bottle of perfume');
        expect(item.count).to.be.equal(1);
        expect(item.imported).to.be.equal(true);
        expect(item.category).to.be.equal(CATEGORY.OTHER);
        expect(item.price).to.be.equal(32.19);
    });
});

describe('Test TaxCalculator', () => {
    it('Should calculate only import tax', () => {
        const taxCalculator = new TaxCalculator({
            generalRate: GENERAL_RATE,
            importRate: IMPORT_RATE,
            precision: PRECISION
        });

        const tax = taxCalculator.calculateTax({
            price: 10,
            category: CATEGORY.FOOD,
            imported: true,
            count: 1,
            name: 'Chocolate'
        });

        expect(tax).to.be.equal(0.5);
    });

    it('Should calculate no tax', () => {
        const taxCalculator = new TaxCalculator({
            generalRate: GENERAL_RATE,
            importRate: IMPORT_RATE,
            precision: PRECISION
        });

        const tax = taxCalculator.calculateTax({
            price: 10,
            category: CATEGORY.FOOD,
            imported: false,
            count: 1,
            name: 'Chocolate'
        });

        expect(tax).to.be.equal(0);
    });

    it('Should calculate general tax', () => {
        const taxCalculator = new TaxCalculator({
            generalRate: GENERAL_RATE,
            importRate: IMPORT_RATE,
            precision: PRECISION
        });

        const tax = taxCalculator.calculateTax({
            price: 10,
            category: CATEGORY.OTHER,
            imported: false,
            count: 1,
            name: 'Beer'
        });

        expect(tax).to.be.equal(1);
    });

    it('Should calculate both taxes', () => {
        const taxCalculator = new TaxCalculator({
            generalRate: GENERAL_RATE,
            importRate: IMPORT_RATE,
            precision: PRECISION
        });

        const tax = taxCalculator.calculateTax({
            price: 10,
            category: CATEGORY.OTHER,
            imported: true,
            count: 1,
            name: 'Beer'
        });

        expect(tax).to.be.equal(1.5);
    });

    it('Should calculate both taxes for three items, still for each', () => {
        const taxCalculator = new TaxCalculator({
            generalRate: GENERAL_RATE,
            importRate: IMPORT_RATE,
            precision: PRECISION
        });

        const tax = taxCalculator.calculateTax({
            price: 10,
            category: CATEGORY.OTHER,
            imported: true,
            count: 3,
            name: 'Beer'
        });

        // should stay the same as tax is calculated per piece
        expect(tax).to.be.equal(1.5);
    });
});
