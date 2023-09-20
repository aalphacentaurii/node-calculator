import CalculateStringService from '../services/CalculateString';
import { expect } from "chai";

const CalculateString = new CalculateStringService();

describe("CalculateStringService", ()=>{
    it("test calculateFn addition", ()=>{
        const result = CalculateString.calculate("2+2.1+3");
        expect(result).to.be.equal(7.1);
    });

    it("test calculateFn multiply", ()=>{
        const result = CalculateString.calculate("2*2*3");
        expect(result).to.be.equal(12);
    });

    it("test calculateFn division", ()=>{
        const result = CalculateString.calculate("2/2/1");
        const zeroError = CalculateString.calculate.bind(null, "2/0");
        expect(result).to.be.equal(1);
        expect(zeroError).to.throw("Zero division!");
    });

    it("test calculateFn substraction", ()=>{
        const result = CalculateString.calculate("4-3-2");
        expect(result).to.be.equal(-1);
    });

    it("test calculateFn brackets", ()=>{
        const result = CalculateString.calculate("(2+2)-((3*  2)+  123*2)");
        const missingCloseBrackets = CalculateString.calculate.bind(null, "(2+2");
        const missingOpenBrackets = CalculateString.calculate.bind(null, "2+2)");
        expect(result).to.be.equal(-248);
        expect(missingCloseBrackets).throws();
        expect(missingOpenBrackets).throws();
    });

    it("test calculateFn Decimals", ()=> {
        const result = CalculateString.calculate("(2.0031+2)-((3*2.00031)+  123*2)");
        expect(result).to.be.equal(-247.99783);
    });
});