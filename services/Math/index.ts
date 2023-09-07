import { IInternalMath } from "../../interfaces/math";

class InternalMathService implements IInternalMath {

    multiply = ( a:number, b: number ): number => {
        return a * b;
    }

    division = ( a:number, b: number ): number => {
        if( b === 0 ) {
            throw new Error( 'Zero division!' );
        }
        return a / b;
    }

    addition = ( a: number, b: number ): number => {
        return a + b;
    }

    substraction = ( a: number, b: number ): number => {
        return a - b;
    }
}

export default InternalMathService;