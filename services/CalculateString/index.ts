import { ICalculateString, Priority, PriorityKeys } from "../../interfaces/calc";
import { IInternalMath } from "../../interfaces/math";

class CalculateStringService implements ICalculateString {

    priority: Priority;
    Math: IInternalMath

    constructor( priority: Priority, math: IInternalMath ) {
        this.priority = priority;
        this.Math = math;
    }

    private _evalOp = ( operators: Array< string >, values: Array< number | undefined > ): void | never => {
        const operator = operators.pop();
        
        const right: number | undefined = values.pop();
        const left: number | undefined = values.pop();
        
        if ( right != undefined && left != undefined ) {
          switch (operator) {
              case '+':
                values.push( this.Math.addition( left, right ) );
                break;
              case '-':
                values.push( this.Math.substraction( left, right ) );
                break;
              case '*':
                values.push( this.Math.multiply( left, right ) );
                break;
              case '/':
                values.push( this.Math.division( left, right ) );
                break;
            }
        } else {
          throw new Error( "Missing values!" );
        }
      }

    public calculate = ( expression: string ): number => {
        expression = expression.replaceAll(" ", '');
      
        const operators: Array<string> = [];
        const values: Array<number> = [];
      
        for (let i = 0; i < expression.length; i++) {
          const char: string = expression[i];
          if (char === ' ') {
            continue;
          } else if ( char === '(' ) {
            operators.push(char);
          } else if (!isNaN( char as unknown as number )) {
            let num = char;
            while ( i + 1 < expression.length && (!isNaN( expression[i + 1] as unknown as number ) || expression[i + 1] == ".") ) {
              num = num.toString() + expression[i + 1]
              i++;
            }
            values.push(parseFloat(num));
          } else if (char === ')') {
            while (
              operators.length > 0 &&
              operators[operators.length - 1] !== '('
            ) {
              this._evalOp(operators, values);
            }
            operators.pop();
          } else {
            while (
              operators.length > 0 &&
              this.priority[ operators[operators.length - 1] as PriorityKeys ] >= this.priority[char as PriorityKeys]
            ) {
              this._evalOp(operators, values);
            }
            operators.push(char);
          }
        }
      
        while (operators.length > 0) {
          this._evalOp(operators, values);
        }
    
        return values[0];
      }


}

export default CalculateStringService;