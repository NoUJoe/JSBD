export default class JSBD 
{
    private constructor();

    static BigD(from: number | string | boolean | bigint | Object): JSBD;

    get decimals (): number;

    toString(radix?: number): string;
    toLocaleString (locale?: string | string[], options?: Intl.NumberFormatOptions): string
    toFixed (digits?: number): string;
    toExponential (fractionDigits?: number): string;
    toPrecision (precision?: number): string;

    static round (value: JSBD, roundOpts?: DecimalRoundingOptions): JSBD;

    static toNumber(x: JSBD): number;
    static toBigInt (x: JSBD): bigint;
    static toString (x: JSBD): string;
    static toBoolean (x: JSBD): boolean;
    static toSymbol (x: JSBD): symbol;

    static add(lhs: JSBD, rhs: JSBD, roundOpts?: DecimalRoundingOptions): JSBD;
    static subtract(lhs: JSBD, rhs: JSBD, roundOpts?: DecimalRoundingOptions): JSBD;
    static multiply(lhs: JSBD, rhs: JSBD, roundOpts?: DecimalRoundingOptions): JSBD;
    static divide(lhs: JSBD, rhs: JSBD, roundOpts?: DecimalRoundingOptions): JSBD;
    static divideSignif1(lhs: JSBD, rhs: JSBD, roundOpts?: DecimalRoundingOptions): JSBD;
    static divideSignif2(lhs: JSBD, rhs: JSBD, roundOpts?: DecimalRoundingOptions): JSBD;
    static divideSignif3(lhs: JSBD, rhs: JSBD, roundOpts?: DecimalRoundingOptions): JSBD;
    static remainder(lhs: JSBD, rhs: JSBD, roundOpts?: DecimalRoundingOptions): JSBD;
    static exponentiate(lhs: JSBD, rhs: JSBD, roundOpts?: DecimalRoundingOptions): JSBD;
    
    static lessThan(lhs: JSBD, rhs: JSBD): boolean;
    static lessThanOrEqual(lhs: JSBD, rhs: JSBD): boolean;
    static greaterThan(lhs: JSBD, rhs: JSBD): boolean;
    static greaterThanOrEqual(lhs: JSBD, rhs: JSBD): boolean;
    static equal(lhs: JSBD, rhs: JSBD): boolean;
    static notEqual(lhs: JSBD, rhs: JSBD): boolean;

    static unaryMinus(rhs: JSBD): JSBD;
    static logicalNot (rhs: JSBD): boolean;
    static logicalNot2 (rhs: JSBD): boolean;

    static bitwiseNot(rhs: JSBD): JSBD;
    static bitwiseNot2(rhs: JSBD): JSBD;
    static bitwiseOr(lhs: JSBD, rhs: JSBD): JSBD;
    static bitwiseXOr(lhs: JSBD, rhs: JSBD): JSBD;
    static bitwiseAnd(lhs: JSBD, rhs: JSBD): JSBD;
    static bitwiseLeftShift(lhs: JSBD, rhs: JSBD): JSBD;
    static bitwiseRightShift(lhs: JSBD, rhs: JSBD): JSBD;
    
    static EQ(lhs: any, rhs: any): boolean;
    static NE(lhs: any, rhs: any): boolean;
    static LT(lhs: any, rhs: any): boolean;
    static LE(lhs: any, rhs: any): boolean;
    static GT(lhs: any, rhs: any): boolean;
    static GE(lhs: any, rhs: any): boolean;
    static ADD(lhs: any, rhs: any): any;
}
  
export interface DecimalRoundingOptions
{
  roundingMode?: "trunc" | "expand" | "floor" | "ceil" | "halfTrunc" | "halfExpand" | "halfFloor" | "halfCeil" | "halfEven";
  roundingIncrement?: 1 | 2 | 5 | 10 | 20 | 25 | 50 | 100 | 200 | 250 | 500 | 1000 | 2000 | 2500 | 5000;
  maxFractionDigits?: number;
}