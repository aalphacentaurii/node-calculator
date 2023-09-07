import IIO from '../../interfaces/io';
import { ICalculateString } from '../../interfaces/calc';
import { IUtils } from '../../interfaces/utils';

class IOController implements IIO {
    
    CalculateString: ICalculateString;
    Utils: IUtils;

    constructor( CalculateString: ICalculateString, Utils: IUtils) {
        this.CalculateString = CalculateString;
        this.Utils = Utils;
    }

    getResult = ( data: string ): number | string => {
        try {
            data = this.Utils.clearString( data );
    
            switch ( data ) {
            
                case "help": {
                    const result = 
                    "'+' - example: 16 + 2 => 18 \n" +
                    "'-' - example: 16 - 2 => 14 \n" +
                    "'*' - example: 16 * 2 => 32 \n" +
                    "'/' - example: 16 / 2 => 8 \n" +
                    "Also, you can use '( )', - example: (2+3)-2 => 3";
                    return result;
                }
                default: {
                    const checkRegExp = this.Utils.checkExpression( data );
                    if ( !checkRegExp ) {
                        throw new Error( "Incorrect input!" );
                    }
                    const result = this.CalculateString.calculate( data );
                    return result;
                }
            }
            
        } catch( err: any ) {
            let result = err.message;
            return result;
        }

    }
}

export default IOController;