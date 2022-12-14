import { describe } from 'mocha';
import { roundUp } from '../src/lib/utils';
import { expect } from 'chai';
import { Basket } from '../src/lib/Basket';
import { TaxCalculator } from '../src/lib/TaxCalculator';
import { CATEGORY } from '../src/lib/constants';
import fs from 'fs';
import { getSummaryForContent } from './helper';

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
        const basket = new Basket();

        basket.addItem('1 book at 12.49');

        const item = basket.getItems()[0];

        expect(item.name).to.be.equal('book');
        expect(item.count).to.be.equal(1);
        expect(item.imported).to.be.equal(false);
        expect(item.category).to.be.equal(CATEGORY.BOOK);
        expect(item.price).to.be.equal(12.49);
    });

    it('Should add category medicine', () => {
        const basket = new Basket();

        basket.addItem('1 packet of headache pills at 9.75');

        const item = basket.getItems()[0];

        expect(item.name).to.be.equal('packet of headache pills');
        expect(item.count).to.be.equal(1);
        expect(item.imported).to.be.equal(false);
        expect(item.category).to.be.equal(CATEGORY.MEDICINE);
        expect(item.price).to.be.equal(9.75);
    });

    it('Should add category food', () => {
        const basket = new Basket();

        basket.addItem('3 imported box of chocolates at 10.50');

        const item = basket.getItems()[0];

        expect(item.name).to.be.equal('box of chocolates');
        expect(item.count).to.be.equal(3);
        expect(item.imported).to.be.equal(true);
        expect(item.category).to.be.equal(CATEGORY.FOOD);
        expect(item.price).to.be.equal(10.5);
    });

    it('Should add category other', () => {
        const basket = new Basket();

        basket.addItem('1 bottle of imported perfume at 32.19');

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
        const taxCalculator = new TaxCalculator();

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
        const taxCalculator = new TaxCalculator();

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
        const taxCalculator = new TaxCalculator();

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
        const taxCalculator = new TaxCalculator();

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
        const taxCalculator = new TaxCalculator();

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

describe('Test Receipt', () => {
    it('Test case 1', () => {
        const content = fs.readFileSync('test/input1.txt', { encoding: 'utf-8' });

        const res =
            '1 book: 12.49\n' +
            '1 music CD: 16.49\n' +
            '1 chocolate bar: 0.85\n' +
            'Sales Taxes: 1.50\n' +
            'Total: 29.83';

        expect(getSummaryForContent(content)).to.be.equal(res);
    });

    it('Test case 2', () => {
        const content = fs.readFileSync('test/input2.txt', { encoding: 'utf-8' });

        const res =
            '1 imported box of chocolates: 10.50\n' +
            '1 imported bottle of perfume: 54.65\n' +
            'Sales Taxes: 7.65\n' +
            'Total: 65.15';

        expect(getSummaryForContent(content)).to.be.equal(res);
    });

    it('Test case 3', () => {
        const content = fs.readFileSync('test/input3.txt', { encoding: 'utf-8' });

        const res =
            '1 imported bottle of perfume: 32.19\n' +
            '1 bottle of perfume: 20.89\n' +
            '1 packet of headache pills: 9.75\n' +
            '1 imported box of chocolates: 11.85\n' +
            'Sales Taxes: 6.70\n' +
            'Total: 74.68';

        expect(getSummaryForContent(content)).to.be.equal(res);
    });
});
