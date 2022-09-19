import { describe } from 'mocha';
import { roundUp } from '../src/lib/utils';
import { expect } from 'chai';
import { Basket } from "../src/lib/Basket";
import { BOOK_KEYWORDS, FOOD_KEYWORDS, MEDICINE_KEYWORDS, CATEGORY } from "../src/lib/constants";

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
        expect(item.category).to.be.equal(CATEGORY.BOOK)
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
        expect(item.category).to.be.equal(CATEGORY.MEDICINE)
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
        expect(item.category).to.be.equal(CATEGORY.FOOD)
        expect(item.price).to.be.equal(10.50);
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
        expect(item.category).to.be.equal(CATEGORY.OTHER)
        expect(item.price).to.be.equal(32.19);
    });
});
