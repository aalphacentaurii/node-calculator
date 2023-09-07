import IOController from "./controllers/io";

import { IInternalMath } from "./interfaces/math";
import { ICalculateString, Priority } from "./interfaces/calc";
import { IUtils } from "./interfaces/utils";

import InternalMathService from "./services/Math";
import CalculateStringService from "./services/CalculateString";
import UtilsService from './services/Utils';

const priority: Priority = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

const InternalMath: IInternalMath = new InternalMathService( );
const CalculateString: ICalculateString = new CalculateStringService( priority, InternalMath );
const Utils: IUtils = new UtilsService( );

const IO = new IOController( CalculateString, Utils );

process.stdin.setEncoding( 'utf8' );
console.log( "Type 'help' to view commands." );

process.stdin.on('data', function( data: string ): void {
    let result: string | number = IO.getResult( data );
    console.log( result );
});