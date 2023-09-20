import { ICalculateString, Priority, PriorityKeys } from "../../interfaces/calc";
import {Big} from 'big.js';
class CalculateStringService implements ICalculateString {

  priority: Priority = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  private _multiply = (a: number, b: number): number => {
    return parseFloat(new Big(a).mul(new Big(b)).toString());
  }

  private _division = (a: number, b: number): number => {
    if (b === 0) {
      throw new Error('Zero division!');
    }
    return parseFloat(new Big(a).div(new Big(b)).toString());
  }

  private _addition = (a: number, b: number): number => {
    return parseFloat(new Big(a).add(new Big(b)).toString());
  }

  private _substraction = (a: number, b: number): number => {
    return parseFloat(new Big(a).sub(new Big(b)).toString());
  }

  private _evalOp = (operators: Array<string>, values: Array<number | undefined>): void | never => {
    const operator = operators.pop();

    const right: number | undefined = values.pop();
    const left: number | undefined = values.pop();

    if (right != undefined && left != undefined) {
      switch (operator) {
        case '+':
          values.push(this._addition(left, right));
          break;
        case '-':
          values.push(this._substraction(left, right));
          break;
        case '*':
          values.push(this._multiply(left, right));
          break;
        case '/':
          values.push(this._division(left, right));
          break;
      }
    } else {
      throw new Error("Missing values!");
    }
  }

  public calculate = (expression: string): number => {
    expression = expression.replaceAll(" ", '');

    const operators: Array<string> = [];
    const values: Array<number> = [];

    for (let i = 0; i < expression.length; i++) {
      const char: string = expression[i];
      if (char === '(') {
        operators.push(char);
      } else if (!isNaN(char as unknown as number)) {
        let num = char;
        while (i + 1 < expression.length && (!isNaN(expression[i + 1] as unknown as number) || expression[i + 1] == ".")) {
          num = num.toString() + expression[i + 1]
          i++;
        }
        values.push(parseFloat(num));
      } else if (char === ')') {
        if( !operators.includes('(') ) throw new Error("Missing open brackets!");
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
          this.priority[operators[operators.length - 1] as PriorityKeys] >= this.priority[char as PriorityKeys]
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