import { IUtils } from "../../interfaces/utils";

class Utils implements IUtils {
    private _removeN( data: string ): string {
        if ( data.match('\n') ) { 
            return  data.replace('\n', ""); 
        }
        else {
            return data;
        }
    }
    
    private _removeSpace( data: string ): string {
        return data.replaceAll(' ', "");
    }
    
    clearString( data: string ): string {
        return this._removeSpace( this._removeN( data ) );
    }

    checkExpression = ( data: string ): boolean => {
        return /^(?:\(*[0-9]*[.,]?[0-9]+\(*\)*[()*+/-])+[0-9]*[.,]?[0-9]+\)*$/.test( data );
    }
}

export default Utils;

