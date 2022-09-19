import { describe } from 'mocha';
import { roundUp } from '../src/lib/utils';
import { expect } from 'chai';

describe(`Test utils`, () => {
    it(`Should round correctly`, async () => {
        let roundedNumber = roundUp(156.03, 0.05);
        expect(roundedNumber).to.be.equal(156.05);

        roundedNumber = roundUp(234242.75, 0.1);
        expect(roundedNumber).to.be.equal(234242.8);
    });
});
