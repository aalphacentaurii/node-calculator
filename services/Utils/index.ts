import { IUtils } from "../../interfaces/utils";

class Utils implements IUtils {
    
    private _removeWinShit( data: string ): string {

        switch( true ) {
            case !!data.match('\n'): data = data.replace('\n', "");
            case !!data.match('\r'): return data.replace('\r', "");
            default: return data;
        }
    
    }
    
    private _removeSpace( data: string ): string {
        return data.replaceAll(' ', "");
    }
    
    clearString( data: string ): string {
        return this._removeSpace( this._removeWinShit( data ) );
    }

    checkExpression = ( data: string ): boolean => {
        return /^(?:\(*[0-9]*[.,]?[0-9]+\(*\)*[()*+/-])+[0-9]*[.,]?[0-9]+\)*$/.test( data );
    }
}

export default Utils;

