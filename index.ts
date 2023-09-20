import IOController from "./controllers/io";


import { ICalculateString, Priority } from "./interfaces/calc";
import { IUtils } from "./interfaces/utils";

import CalculateStringService from "./services/CalculateString";
import UtilsService from './services/Utils';


const CalculateString: ICalculateString = new CalculateStringService( );
const Utils: IUtils = new UtilsService( );

const IO = new IOController( CalculateString, Utils );

process.stdin.setEncoding( 'utf8' );
console.log( "Type 'help' to view commands." );

process.stdin.on('data', function( data: string ): void {
    let result: string | number = IO.getResult( data );
    console.log( result );
});