export default class JSBD
{
    static #canConstruct = false;

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#roundingMode
    //has values for an existing roundingMode on NumberFormat, found this out when implementing toLocaleString
    //and made an executive decision
    static #roundModeSet = new Set (["trunc", "expand", "floor", "ceil", "halfTrunc", "halfExpand", "halfFloor", "halfCeil", "halfEven"]);

    static #precisionModeSet = new Set (["fractional", "significant", "significantFullInt", "significantFlex"]);

    static #roundHalfIncrMapByIncrement = new Map ([
        [1, {incrVal: 1n, halfIncrVal: "5", incrDigitCount: 1, halfIncrDigitCount: 1, shiftRightBy: 1}],
        [2, {incrVal: 2n, halfIncrVal: "1", incrDigitCount: 1, halfIncrDigitCount: 1, shiftRightBy: 0}],
        [5, {incrVal: 5n, halfIncrVal: "25", incrDigitCount: 1, halfIncrDigitCount: 2, shiftRightBy: 0}],
        [10, {incrVal: 10n, halfIncrVal: "5", incrDigitCount: 2, halfIncrDigitCount: 1, shiftRightBy: 1}],
        [20, {incrVal: 20n, halfIncrVal: "10", incrDigitCount: 2, halfIncrDigitCount: 2, shiftRightBy: 0}],
        [25, {incrVal: 25n, halfIncrVal: "125", incrDigitCount: 2, halfIncrDigitCount: 3, shiftRightBy: 0}],
        [50, {incrVal: 50n, halfIncrVal: "25", incrDigitCount: 2, halfIncrDigitCount: 2, shiftRightBy: 0}],
        [100, {incrVal: 100n, halfIncrVal: "50", incrDigitCount: 3, halfIncrDigitCount: 2, shiftRightBy: 1}],
        [200, {incrVal: 200n, halfIncrVal: "100", incrDigitCount: 3, halfIncrDigitCount: 3, shiftRightBy: 0}],
        [250, {incrVal: 250n, halfIncrVal: "125", incrDigitCount: 3, halfIncrDigitCount: 3, shiftRightBy: 0}],
        [500, {incrVal: 500n, halfIncrVal: "250", incrDigitCount: 3, halfIncrDigitCount: 3, shiftRightBy: 0}],
        [1000, {incrVal: 1000n, halfIncrVal: "500", incrDigitCount: 4, halfIncrDigitCount: 3, shiftRightBy: 1}],
        [2000, {incrVal: 2000n, halfIncrVal: "1000", incrDigitCount: 4, halfIncrDigitCount: 4, shiftRightBy: 0}],
        [2500, {incrVal: 2500n, halfIncrVal: "1250", incrDigitCount: 4, halfIncrDigitCount: 4, shiftRightBy: 0}],
        [5000, {incrVal: 5000n, halfIncrVal: "2500", incrDigitCount: 4, halfIncrDigitCount: 4, shiftRightBy: 0}]
    ]);

    static #defaultGenericRoundOpts = {
        maximumFractionDigits: undefined,   //This is handled slightly differently which is why its undefined
        roundingMode: "halfExpand",
        roundingIncrement: 1,
        precisionMode: "fractional"
    }

    static #divDefaultRoundOpts = {
        maximumFractionDigits: 34,
        roundingMode: "halfExpand",
        roundingIncrement: 1,
        incrSetup: JSBD.#roundHalfIncrMapByIncrement.get (1),
        precisionMode: "fractional"
    };

    static #cachedRoundOpts = {
        maximumFractionDigits: 0,
        roundingMode: "",
        roundingIncrement: 0,
        incrSetup: null,
        precisionMode: "fractional"
    };

    static #ZERO;

    static #staticConstructor ()
    {
        JSBD.#ZERO = JSBD.#Make ("0", 0);
    }

    #strVal;
    #decPlaces;

    constructor (val = "0", places = 0)
    {
        if (!JSBD.#canConstruct) throw new TypeError ("JSBD is not a constructor");

        /**
         * @private
        */
        this.#strVal = val;
        /**
         * @private
         */
        this.#decPlaces = places;
    }

    get decimals()
    {
        return this.#decPlaces;
    }

    static BigD (value)
    {
        if (value instanceof Object)
        {
            return JSBD.#ConstructFromObjectType (value);
        }

        let type = typeof value;

        let numVal, strVal;
        let isInfinite = false;

        switch (type)
        {
            case "number":
            {
                //safe enough
                if (~~value === value) return JSBD.#Make (value.toString (), 0);

                numVal = value;
                strVal = value.toString ();

                if (!isFinite (numVal))
                {
                    isInfinite = true;
                }

                if (numVal === 0) return JSBD.#ZERO;
                break;
            }
            case "bigint":
            {
                if (value === 0n) return JSBD.#ZERO;

                return JSBD.#Make (value.toString (), 0);
                break;
            }
            case "string":
            {
                numVal = Number (value);
                strVal = value.trim ();

                if (!isFinite (numVal))
                {
                    if (strVal === "Infinity" || strVal === "-Infinity")
                    {
                        isInfinite = true;
                    }
                }
                break;
            }
            default:
            {
                numVal = Number (value);
                strVal = numVal.toString ();

                if (numVal === 0) return JSBD.#ZERO;
                break;
            }
        }

        if (isNaN (numVal) || isInfinite)
        {
            throw new SyntaxError (`Cannot convert ${value} to a JSBD`);
        }

        let strIntegerPart;
        let strFractionPart = "";

        let sign;
        let signStr;
        let firstNonSignIndex;
        let loopStartIndex;

        let firstCharCode = strVal.codePointAt (0);

        //45 == "-"
        if (firstCharCode === 45)
        {
            sign = -1;
            signStr = "-";
            firstNonSignIndex = 1;
        }
        else
        {
            sign = 1;
            signStr = "";
            //43 == "+"
            firstNonSignIndex = firstCharCode === 43 ? 1 : 0;
        }

        //0b, 0x string literals
        //first character needs to be 0
        if (strVal.codePointAt (firstNonSignIndex) === 48)
        {
            loopStartIndex = firstNonSignIndex + 1;

            let charP = strVal.codePointAt (loopStartIndex);

            //second char must be above "9", and not "e" or "E"
            if (charP > 57 && charP !== 69 && charP !== 101)
            {
                try
                {
                    return JSBD.#Make (BigInt (strVal).toString (), 0);
                }
                catch 
                {
                    throw new SyntaxError (`Cannot convert ${strVal} to a JSBD`);
                }
            }
        }
        else
        {
            loopStartIndex = firstNonSignIndex;
        }

        let isZeroInt = true;
        let firstNonZeroIntDigitIndex = -1;
        let didFindInt = false;
        let didFindPoint = false;

        //Finding integer part of input value, if "e" or "E" is detected, then try construct from exp notation
        for (var j = loopStartIndex; j < strVal.length; j++)
        {
            let charCode = strVal.codePointAt (j);

            //48 - 57 numbers
            //47 /
            //101 e
            //69(nice) E 
            //46 .
            if (charCode === 46) 
            {
                didFindPoint = true;
                
                for (let k = loopStartIndex; k < j; k++)
                {
                    // "0"
                    if (strVal.codePointAt (k) !== 48)
                    {
                        didFindInt = true;
                        isZeroInt = false;
                        strIntegerPart =  strVal.substring (k, j);
                        break;
                    }
                }
                
                j++;
                break;
            }
            else if (charCode > 57)
            {
                if (charCode === 101 || charCode === 69)
                {
                    //handle primitive number exponential notation
                    //in primitive numbers:
                    //1e+1 = 10
                    //1e+25 = 10000000000000000905969664, and not 1 with 25 0s
                    //and yes i understand why this is the case (64bit floating point)
                    //but what I don't get is why theres no way to get this as a string reliably
                    //1e+25 is arguably even more inaccurate
                    //(which if we parse manually, would give us '10000000000000000000000000')
                    //toPrecision only works up to 100 digits
                    //you can get this string using BigInts, but this is just a side effect and not a dedicated way
                    if (type === "number" && strVal[j + 1] !== "-")
                    {
                        return JSBD.#Make (BigInt (numVal).toString (), 0);
                    }

                    return JSBD.#FromExponential (sign, firstNonSignIndex, strVal, j, strVal.substring (firstNonSignIndex, j));
                }
                else
                {
                    throw new SyntaxError (`Cannot convert ${strVal} to a JSBD`);
                }
            }
            else if (isZeroInt && charCode > 48)
            {
                isZeroInt = false;
                firstNonZeroIntDigitIndex = j;
            }            
        }

        if (didFindPoint)
        {
            if (!didFindInt) strIntegerPart = "0";
        }
        else
        {
            if (!isZeroInt) strIntegerPart = strVal.substring (firstNonZeroIntDigitIndex);
            else strIntegerPart = "0";
        }

        let lastNonZeroFracIdx = j - 1;

        //find fraction part of input, if "e" or "E" is detected then construct from exp notation
        //there's nothing wrong with the following loop I promise. Source: trust me bro
        //This is probably the best kind of loop logic
        for (let h = j; h < strVal.length; h++)
        {
            let charCode = strVal.codePointAt (h);

            //"0"
            if (charCode !== 48) 
            {
                for (let k = h; ;)
                {
                    //not a number, E or e
                    if (charCode > 57)
                    {
                        if (charCode === 101 || charCode === 69)
                        {   
                            if (type === "number" && strVal[k + 1] !== "-")
                            {
                                return JSBD.#Make (BigInt (numVal).toString (), 0);
                            }

                            return JSBD.#FromExponential (sign, firstNonSignIndex, strVal, k, strIntegerPart, strVal.substring (j, k));
                        }
                        else
                        {
                            throw new SyntaxError (`Cannot convert ${strVal} to a JSBD`);
                        }
                    }
                    else if (charCode !== 48)
                    {
                        lastNonZeroFracIdx = k;
                    }

                    k++;

                    if (k === strVal.length)
                    {
                        //hasFraction = true;
                        strFractionPart = strVal.substring (j, lastNonZeroFracIdx + 1);
                        break;
                    }

                    charCode = strVal.codePointAt (k);
                }

                break;
            }
        }
        
        if (strIntegerPart === "0" && strFractionPart === "") signStr = "";

        return JSBD.#Make (signStr + strIntegerPart + strFractionPart, strFractionPart.length);
    }

    static #CopyOptionsObject (target, source)
    {
        target.maximumFractionDigits = source.maximumFractionDigits;
        target.roundingMode = source.roundingMode;
        target.roundingIncrement = source.roundingIncrement;
        target.precisionMode = source.precisionMode;
        target.incrSetup = source.incrSetup;
    }
    
    static #ConstructFromObjectType (value)
    {
        if (value instanceof JSBD) return value;

        if (value[Symbol.toPrimitive] !== undefined)
        {
            if (typeof value[Symbol.toPrimitive] === "function")
            {
                let primVal = value[Symbol.toPrimitive]("number");

                //Not primitive
                if (primVal instanceof Object)
                {
                    throw new TypeError ("Cannot convert object to primitive value");
                }
                else
                {
                    return JSBD.BigD (primVal);
                }
            }
            else
            {
                throw new TypeError (`${typeof value[Symbol.toPrimitive]} is not a function`);
            }
        }

        if (typeof value.valueOf === "function")
        {
            let primVal = value.valueOf ();

            if (!(primVal instanceof Object))
            {
                return JSBD.BigD (primVal);
            }
        }

        if (typeof value.toString === "function")
        {
            let primVal = value.toString ();

            if (!(primVal instanceof Object))
            {
                return JSBD.BigD (primVal);
            }
        }

        throw new TypeError ("Cannot convert object to primitive value");
    }

    static #FromExponential (sign, firstNonSignIndex, value, eIndex, preDotMantisa = "", postDotMantisa = "")
    {
        //45 == "-"
        let signStr;

        if (sign < 0) signStr = "-";
        else signStr = "";
        
        let eSignCharCode = value.codePointAt (eIndex + 1);
        let mantisa;
        
        let loopStartIndex;

        if (preDotMantisa !== "")
        {
            mantisa = preDotMantisa;
            
            //stops the loop
            loopStartIndex = mantisa.length;

            if (postDotMantisa !== "")
            {
                //strip trailing
                postDotMantisa = JSBD.#StripTrailingZeros (postDotMantisa, Infinity);
            }
        }
        else
        {
            loopStartIndex = 0;
            mantisa = value.substring (firstNonSignIndex, eIndex);
            preDotMantisa = mantisa;
        }
        
        let eSign = eSignCharCode === 45 ? -1 : 1;
        let exp;

        if (eSignCharCode !== 45 && eSignCharCode !== 43)
        {
            exp = Number (value.substring (eIndex + 1));
        }
        else
        {
            exp = Number (value.substring (eIndex + 2));
        }

        for (var j = loopStartIndex; j < mantisa.length; j++)
        {
            // "."
            if (mantisa.codePointAt (j) === 46) 
            {
                preDotMantisa = mantisa.substring (0, j);
                //strip trailing
                postDotMantisa = JSBD.#StripTrailingZeros (mantisa.substring (j + 1), Infinity);
                break;
            }
        }

        //strip leading zeros
        preDotMantisa = BigInt (preDotMantisa).toString ();

        if (preDotMantisa === "0") preDotMantisa = "";

        if (preDotMantisa.length === 0 && postDotMantisa.length === 0) return JSBD.#ZERO;

        if (eSign > 0)
        {
            let decPlaces = postDotMantisa.length - exp;

            if (decPlaces <= 0)
            {
                return JSBD.#Make (`${signStr}${preDotMantisa}${postDotMantisa}${"0".repeat (-decPlaces)}`, 0);
            }
            else
            {
                if (preDotMantisa === "" && postDotMantisa.length - decPlaces <= 0) return JSBD.#Make (`${signStr}0${postDotMantisa}`, decPlaces);
                else return JSBD.#Make (`${signStr}${preDotMantisa}${postDotMantisa}`, decPlaces);
            }
        }
        else
        {
            let decPlaces = postDotMantisa.length + exp;
                
            let extraPrefixZeros = -(preDotMantisa.length - exp);

            if (extraPrefixZeros >= 0)
            {
                return JSBD.#Make (`${signStr}0${"0".repeat (extraPrefixZeros)}${preDotMantisa}${postDotMantisa}`, decPlaces);
            }
            else
            {
                return JSBD.#Make (`${signStr}${preDotMantisa}${postDotMantisa}`, decPlaces);
            }
        }
    }

    static #Make (val = "0", places = 0)
    {
        JSBD.#canConstruct = true;
        let bigD = new JSBD (val, places);
        JSBD.#canConstruct = false;
        return bigD;
    }

    static round (val, opts)
    {
        if (typeof opts !== "object")
        {
            return val;
        }

        JSBD.#CopyOptionsObject (this.#cachedRoundOpts, this.#defaultGenericRoundOpts);

        if (opts.maximumFractionDigits !== undefined) this.#cachedRoundOpts.maximumFractionDigits = opts.maximumFractionDigits;
        if (opts.roundingMode !== undefined) this.#cachedRoundOpts.roundingMode = opts.roundingMode;
        if (opts.roundingIncrement !== undefined) this.#cachedRoundOpts.roundingIncrement = opts.roundingIncrement;
        if (opts.precisionMode !== undefined) this.#cachedRoundOpts.precisionMode = opts.precisionMode;

        JSBD.#ValidateAndSanitiseRoundOpts (val.#decPlaces, this.#cachedRoundOpts);

        let expFromMostSignificant;

        switch (this.#cachedRoundOpts.precisionMode)
        {
            case "significant":
            case "significantFullInt":
            case "significantFlex":
            {
                let strVal = val.#strVal;
                let intDigitCount = strVal.length - val.#decPlaces;
                let isNegative = strVal[0] === "-";
                let firstDigitI;
                if (isNegative)
                {
                    firstDigitI = 1;
                    intDigitCount--;
                }
                else
                {
                    firstDigitI = 0;
                }

                if (intDigitCount > 1 || strVal[firstDigitI] !== "0")
                {
                    expFromMostSignificant = intDigitCount;
                }
                else
                {
                    expFromMostSignificant = 0;
                    let startI = firstDigitI + 1;

                    for (let i = startI; i < strVal.length; i++)
                    {
                        if (strVal.codePointAt (i) !== 48)
                        {
                            expFromMostSignificant = startI - i;
                            break;
                        }
                    }
                }

                break;
            }
        }

        return JSBD.#DoRound (val.#strVal, val.#decPlaces, this.#cachedRoundOpts.maximumFractionDigits, this.#cachedRoundOpts.roundingMode, this.#cachedRoundOpts.incrSetup, this.#cachedRoundOpts.precisionMode, expFromMostSignificant);
    }

    static #internalRound (strVal, decPlaces, opts, expFromMostSignificant)
    {
        JSBD.#CopyOptionsObject (this.#cachedRoundOpts, this.#defaultGenericRoundOpts);

        if (opts.maximumFractionDigits !== undefined) this.#cachedRoundOpts.maximumFractionDigits = opts.maximumFractionDigits;
        if (opts.roundingMode !== undefined) this.#cachedRoundOpts.roundingMode = opts.roundingMode;
        if (opts.roundingIncrement !== undefined) this.#cachedRoundOpts.roundingIncrement = opts.roundingIncrement;
        if (opts.precisionMode !== undefined) this.#cachedRoundOpts.precisionMode = opts.precisionMode;

        JSBD.#ValidateAndSanitiseRoundOpts (decPlaces, this.#cachedRoundOpts);

        return JSBD.#DoRound (strVal, decPlaces, this.#cachedRoundOpts.maximumFractionDigits, this.#cachedRoundOpts.roundingMode, this.#cachedRoundOpts.incrSetup, this.#cachedRoundOpts.precisionMode, expFromMostSignificant);
    }

    static #ValidateAndSanitiseRoundOpts (decPlaces, opts)
    {
        let maxFractionDigits = opts.maximumFractionDigits;

        if (maxFractionDigits === undefined) maxFractionDigits = decPlaces;
        else if (typeof maxFractionDigits === "bigint") throw new TypeError ("Cannot convert a BigInt value to a number");
        else maxFractionDigits = +maxFractionDigits;

        if (isNaN (maxFractionDigits) || !isFinite (maxFractionDigits) || maxFractionDigits < 0)
        {
            throw new RangeError ("maxFractionDigits value is out of range");
        }

        maxFractionDigits = ~~maxFractionDigits;

        let roundingIncrement = opts.roundingIncrement;

        // if (roundingIncrement === undefined) roundingIncrement = 1;
        // else 
        if (typeof roundingIncrement === "bigint") throw new TypeError ("Cannot convert a BigInt value to a number");
        else roundingIncrement = +roundingIncrement;
        
        if (isNaN (roundingIncrement) || !isFinite (roundingIncrement))
        {
            throw new RangeError ("roundingIncrement value is out of range");
        }

        roundingIncrement = ~~roundingIncrement;

        let incrSetup = JSBD.#roundHalfIncrMapByIncrement.get (roundingIncrement);

        if (incrSetup === undefined) throw new RangeError ("roundingIncrement value is out of range");

        //implicitly casts, toString () and String () are too explicit and don't behave like JS does internally
        let roundingMode = `${opts.roundingMode}`;

        // if (roundingMode === undefined) roundingMode = "halfExpand";
        // else 
        // {
            //roundingMode = `${roundingMode}`;
        //}
        
        if (!JSBD.#roundModeSet.has (roundingMode)) throw new RangeError (`roundingMode ${roundingMode} is out of range`);

        let precisionMode = `${opts.precisionMode}`;

        if (!JSBD.#precisionModeSet.has (precisionMode)) throw new RangeError (`precisionMode ${precisionMode} is out of range`);

        opts.maximumFractionDigits = maxFractionDigits;
        opts.roundingMode = roundingMode;
        opts.roundingIncrement = roundingIncrement;
        opts.incrSetup = incrSetup;
        opts.precisionMode = precisionMode;
    }

    static #DoRound (strVal, decPlaces, maxFractionDigits, roundingMode, roundIncrSetup, precisionMode, expFromMostSignificant)
    {
        switch (precisionMode)
        {
            case "significant":
            {
                if (expFromMostSignificant < 0)
                {
                    maxFractionDigits += -expFromMostSignificant;
                }
                else
                {
                    maxFractionDigits -= expFromMostSignificant;
                }
                break;
            }
            case "significantFullInt":
            { 
                if (expFromMostSignificant < 0)
                {
                    maxFractionDigits += -expFromMostSignificant;
                }
                else
                {
                    maxFractionDigits -= expFromMostSignificant;
                    if (maxFractionDigits < 0) maxFractionDigits = 0;
                }
                break;
            }
            case "significantFlex":
            {
                if (expFromMostSignificant < 0)
                {
                    maxFractionDigits += -expFromMostSignificant;
                }
                break;
            }
        }

        let isNegative = strVal.codePointAt (0) === 45;

        let firstNumIndex = isNegative ? 1 : 0;

        if (roundingMode === "trunc" && roundIncrSetup.incrVal === 1n)
        {
            if (maxFractionDigits >= decPlaces) return JSBD.#Make (strVal, decPlaces);
            else
            {
                let i = strVal.length - (decPlaces - maxFractionDigits);

                if (maxFractionDigits < 0)
                {
                    if (i <= firstNumIndex) return JSBD.#ZERO;

                    let str = strVal.substring (0, i) + "0".repeat (-maxFractionDigits);
                    //if (str === "-0") str = "0"; //shouldn't need cos int part should never be 0 or -0 when maxFractionDigits < 0

                    return JSBD.#Make (str, 0);
                }

                let stripped = JSBD.#StripTrailingZeros (strVal.substring (0, i), maxFractionDigits);

                maxFractionDigits -= i - stripped.length;

                if (stripped === "-0") stripped = "0";

                return JSBD.#Make (stripped, maxFractionDigits);
            }
        }

        let incrVal = roundIncrSetup.incrVal, halfIncrVal = roundIncrSetup.halfIncrVal, incrDigitCount = roundIncrSetup.incrDigitCount,
        halfIncrDigitCount = roundIncrSetup.halfIncrDigitCount, shiftRightBy = roundIncrSetup.shiftRightBy;

        let currentStrVal = strVal;

        let additionalDecimalPlaces = 0;

        //If rounding will have no effect on the result
        if (maxFractionDigits > decPlaces)
        {
            //Make sure there's no "overflow" before returning
            //e.g. Input: 1.23, maxFractionDigits: 3, roundingIncrement: 10 is an "overflow" case, so we would need to continue
            if (maxFractionDigits - incrDigitCount > decPlaces)
            {
                return JSBD.#Make (strVal, decPlaces);
            }

            //additional 0s needed during calculation due to "overflow"
            additionalDecimalPlaces = maxFractionDigits - decPlaces;
        }

        //
        //Kept me sane
        //
        // [1, {incrVal: 1n, halfIncrVal: "5", incrDigitCount: 1, halfIncrDigitCount: 1, shiftRightBy: 1}],
        // [2, {incrVal: 2n, halfIncrVal: "1", incrDigitCount: 1, halfIncrDigitCount: 1, shiftRightBy: 0}],
        // [5, {incrVal: 5n, halfIncrVal: "25", incrDigitCount: 1, halfIncrDigitCount: 2, shiftRightBy: 0}],
        // [10, {incrVal: 10n, halfIncrVal: "5", incrDigitCount: 2, halfIncrDigitCount: 1, shiftRightBy: 1}],

        //39.3 3100001
        //     1000000
        //     2500000
        // (3100001 / 1000000) % 2 = 1
        // (3100001 / 2500000) % 2 = 1

        let outputNumEndIndexInStrVal = (strVal.length) - (decPlaces - maxFractionDigits) - 1;

        let outputNumEndIndexPOne = outputNumEndIndexInStrVal + 1;
        let roundBasisStartIndex = outputNumEndIndexInStrVal - (incrDigitCount - 1) + shiftRightBy;

        //"output num" is the part of the input number that will be rounded
        //"round basis" is the part of the input number that determines how to round
        //e.g. Input: 1.234567, maxFractionDigits: 3, roundingIncrement: 2 ... "round basis" = 4567, "output num" = 1234
        if (roundBasisStartIndex < firstNumIndex) return JSBD.#ZERO;

        if (additionalDecimalPlaces > 0) currentStrVal += "0".repeat (additionalDecimalPlaces);

        let roundBasisStr = currentStrVal.substring (roundBasisStartIndex);
        let roundBasisBigIntNormalised = BigInt (roundBasisStr);

        if (roundBasisBigIntNormalised === 0n) return JSBD.#Make (strVal, decPlaces);

        let halfIncrToRoundBasisDiff = roundBasisStr.length - halfIncrDigitCount;
        let normalisedHalfIncr = halfIncrVal;

        if (halfIncrToRoundBasisDiff > 0) normalisedHalfIncr += "0".repeat (halfIncrToRoundBasisDiff);
        else if (halfIncrToRoundBasisDiff < 0) roundBasisBigIntNormalised = roundBasisBigIntNormalised * (10n ** BigInt (-halfIncrToRoundBasisDiff));

        let incrToHalfIncrDiff = normalisedHalfIncr.length - incrDigitCount;
        let normalisedIncr = incrVal;

        normalisedIncr = normalisedIncr * (10n ** BigInt (incrToHalfIncrDiff + shiftRightBy));

        normalisedHalfIncr = BigInt (normalisedHalfIncr);

        let newLastDigit = BigInt (currentStrVal.substring (firstNumIndex, outputNumEndIndexPOne));
        let newLastDigitStr;

        let isOnIncrement = roundBasisBigIntNormalised % normalisedIncr === 0n;

        //0: <
        //1: >
        //2: ==
        let halfIndicationBigInt = isOnIncrement ? 0n 
        : roundBasisBigIntNormalised % normalisedHalfIncr === 0n ? 2n : (roundBasisBigIntNormalised / normalisedHalfIncr) % 2n;

        switch (roundingMode)
        {
            case "trunc":
            {
                if (isNegative)
                {
                    newLastDigit = ((newLastDigit / incrVal)) * incrVal;
                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - 1 - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `-${"0".repeat (diff)}${newLastDigitStr}`;
                    else newLastDigitStr = "-" + newLastDigitStr;
                }
                else
                {
                    newLastDigit = ((newLastDigit / incrVal)) * incrVal;
                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `${"0".repeat (diff)}${newLastDigitStr}`;
                }

                break;
            }
            case "expand":
            {
                if (isNegative)
                {
                    if (isOnIncrement) newLastDigit = ((newLastDigit / incrVal)) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal) + 1n) * incrVal;

                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - 1 - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `-${"0".repeat (diff)}${newLastDigitStr}`;
                    else newLastDigitStr = "-" + newLastDigitStr;
                }
                else
                {
                    if (isOnIncrement) newLastDigit = ((newLastDigit / incrVal)) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal) + 1n) * incrVal;

                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `${"0".repeat (diff)}${newLastDigitStr}`;
                }
                break;
            }

            case "floor":
            {
                if (isNegative)
                {
                    if (isOnIncrement) newLastDigit = ((newLastDigit / incrVal)) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal) + 1n) * incrVal;

                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - 1 - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `-${"0".repeat (diff)}${newLastDigitStr}`;
                    else newLastDigitStr = "-" + newLastDigitStr;
                }
                else
                {
                    newLastDigit = ((newLastDigit / incrVal)) * incrVal;
                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `${"0".repeat (diff)}${newLastDigitStr}`;
                }

                break;
            }
            case "ceil":
            {
                if (isNegative)
                {
                    if (isOnIncrement) newLastDigit = ((newLastDigit / incrVal)) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal)) * incrVal;

                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - 1 - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `-${"0".repeat (diff)}${newLastDigitStr}`;
                    else newLastDigitStr = "-" + newLastDigitStr;
                }
                else
                {
                    if (isOnIncrement) newLastDigit = ((newLastDigit / incrVal)) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal) + 1n) * incrVal;

                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `${"0".repeat (diff)}${newLastDigitStr}`;
                }

                break;
            }

            case "halfTrunc":
            {
                if (isNegative)
                {
                    if (halfIndicationBigInt === 1n) newLastDigit = ((newLastDigit / incrVal) + 1n) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal)) * incrVal;
                    
                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - 1 - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `-${"0".repeat (diff)}${newLastDigitStr}`;
                    else newLastDigitStr = "-" + newLastDigitStr;
                }
                else
                {
                    if (halfIndicationBigInt === 1n) newLastDigit = ((newLastDigit / incrVal) + 1n) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal)) * incrVal;

                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `${"0".repeat (diff)}${newLastDigitStr}`;
                }
                
                break;
            }
            case "halfExpand":
            {
                if (isNegative)
                {
                    if (halfIndicationBigInt >= 1n) newLastDigit = ((newLastDigit / incrVal) + 1n) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal)) * incrVal;
                    
                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - 1 - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `-${"0".repeat (diff)}${newLastDigitStr}`;
                    else newLastDigitStr = "-" + newLastDigitStr;
                }
                else
                {
                    if (halfIndicationBigInt >= 1n) newLastDigit = ((newLastDigit / incrVal) + 1n) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal)) * incrVal;
                    
                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `${"0".repeat (diff)}${newLastDigitStr}`;
                } 

                break;
            }

            case "halfFloor":
            {
                if (isNegative)
                {
                    if (halfIndicationBigInt >= 1n) newLastDigit = ((newLastDigit / incrVal) + 1n) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal)) * incrVal;

                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - 1 - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `-${"0".repeat (diff)}${newLastDigitStr}`;
                    else newLastDigitStr = "-" + newLastDigitStr;
                }
                else
                {
                    if (halfIndicationBigInt === 1n) newLastDigit = ((newLastDigit / incrVal) + 1n) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal)) * incrVal;

                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `${"0".repeat (diff)}${newLastDigitStr}`;
                } 

                break;
            }
            case "halfCeil":
            {
                if (isNegative)
                {
                    if (halfIndicationBigInt === 1n) newLastDigit = ((newLastDigit / incrVal) + 1n) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal)) * incrVal;
                    
                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - 1 - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `-${"0".repeat (diff)}${newLastDigitStr}`;
                    else newLastDigitStr = "-" + newLastDigitStr;
                }
                else
                {
                    if (halfIndicationBigInt >= 1n) newLastDigit = ((newLastDigit / incrVal) + 1n) * incrVal;
                    else newLastDigit = ((newLastDigit / incrVal)) * incrVal;

                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `${"0".repeat (diff)}${newLastDigitStr}`;
                } 

                break;
            }

            case "halfEven":
            {
                if (isNegative)
                {
                    let q = newLastDigit / incrVal;

                    if (halfIndicationBigInt === 2n)
                    {
                        if (q % 2n === 0n) newLastDigit = q * incrVal;
                        else newLastDigit = (q + 1n) * incrVal;
                    }
                    else if (halfIndicationBigInt === 1n)
                    {
                        newLastDigit = (q + 1n) * incrVal;
                    }
                    else
                    {
                        newLastDigit = q * incrVal;
                    }

                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - 1 - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `-${"0".repeat (diff)}${newLastDigitStr}`;
                    else newLastDigitStr = "-" + newLastDigitStr;
                }
                else
                {
                    let q = newLastDigit / incrVal;

                    if (halfIndicationBigInt === 2n)
                    {
                        if (q % 2n === 0n) newLastDigit = q * incrVal;
                        else newLastDigit = (q + 1n) * incrVal;
                    }
                    else if (halfIndicationBigInt === 1n)
                    {
                        newLastDigit = (q + 1n) * incrVal;
                    }
                    else
                    {
                        newLastDigit = q * incrVal;
                    }

                    newLastDigitStr = newLastDigit.toString ();

                    let diff = outputNumEndIndexPOne - newLastDigitStr.length;

                    if (diff > 0) newLastDigitStr = `${"0".repeat (diff)}${newLastDigitStr}`;
                } 

                break;
            }
            default:
            {
                // return this.#Make (strVal, decPlaces);
                throw new RangeError (`roundingMode ${roundingMode} is out of range`);
            }
        }

        //
        //Construct resulting big decimal
        //
        if (maxFractionDigits < 0)
        {
            return JSBD.#Make (newLastDigitStr + "0".repeat (-maxFractionDigits), 0);
        }
        else if (newLastDigit % 10n === 0n)
        {
            let newStr = JSBD.#StripTrailingZeros (newLastDigitStr, maxFractionDigits);
            let newDecCount = maxFractionDigits - (newLastDigitStr.length - newStr.length);

            if (newDecCount === 0 && newStr === "-0") newStr = "0";
            
            return JSBD.#Make (newStr, newDecCount);
        }
        else
        {
            return JSBD.#Make (newLastDigitStr, maxFractionDigits);
        }
    }

    //
    //Strict Operators
    //

    static add (lhs, rhs, roundOpts = undefined)
    {
        let resultDecPlaces;

        let strAsInt, str2AsInt;

        let dDiff = lhs.#decPlaces - rhs.#decPlaces;

        if (dDiff > 0)
        {
            resultDecPlaces = lhs.#decPlaces;

            strAsInt = BigInt (lhs.#strVal);
            str2AsInt = BigInt (`${rhs.#strVal}${"0".repeat (dDiff)}`);
        }
        else
        {
            resultDecPlaces = rhs.#decPlaces;

            strAsInt = BigInt (`${lhs.#strVal}${"0".repeat (-dDiff)}`);
            str2AsInt = BigInt (rhs.#strVal);
        }

        let added = strAsInt + str2AsInt;

        let addedAbsAsStr;
        let preAbsLength;
        let postAbsLength;
        let signStr;

        if (added < 0n)
        {
            addedAbsAsStr = (-added).toString ();
            preAbsLength = addedAbsAsStr.length;
            signStr = "-";
        }
        else
        {
            addedAbsAsStr = added.toString ();
            preAbsLength = addedAbsAsStr.length;
            signStr = "";
        }
        
        addedAbsAsStr = JSBD.#StripTrailingZeros (addedAbsAsStr, resultDecPlaces);
        postAbsLength = addedAbsAsStr.length;

        if (postAbsLength === 0) return JSBD.#ZERO;

        resultDecPlaces -= preAbsLength - postAbsLength;
        
        if (postAbsLength <= resultDecPlaces)
        {
            let diff = resultDecPlaces - postAbsLength;

            if (typeof roundOpts === "object")
            {
                return JSBD.#internalRound (`${signStr}${"0".repeat (diff + 1)}${addedAbsAsStr}`, resultDecPlaces, roundOpts, -diff);
            }

            return JSBD.#Make (`${signStr}${"0".repeat (diff + 1)}${addedAbsAsStr}`, resultDecPlaces);
        }
        else
        {
            if (typeof roundOpts === "object")
            {
                let diff = resultDecPlaces - postAbsLength;

                return JSBD.#internalRound (signStr + addedAbsAsStr, resultDecPlaces, roundOpts, diff);
            }
            
            return JSBD.#Make (signStr + addedAbsAsStr, resultDecPlaces);
        }
    }

    static subtract (lhs, rhs, roundOpts = undefined)
    {
        let resultDecPlaces;

        let strAsInt, str2AsInt;

        let dDiff = lhs.#decPlaces - rhs.#decPlaces;

        if (dDiff > 0)
        {
            resultDecPlaces = lhs.#decPlaces;

            strAsInt = BigInt (lhs.#strVal);
            str2AsInt = BigInt (`${rhs.#strVal}${"0".repeat (dDiff)}`);
        }
        else
        {
            resultDecPlaces = rhs.#decPlaces;

            strAsInt = BigInt (`${lhs.#strVal}${"0".repeat (-dDiff)}`);
            str2AsInt = BigInt (rhs.#strVal);
        }

        let added = strAsInt - str2AsInt;

        let addedAbsAsStr;
        let preAbsLength;
        let postAbsLength;
        let signStr;

        if (added < 0n)
        {
            addedAbsAsStr = (-added).toString ();
            preAbsLength = addedAbsAsStr.length;
            signStr = "-";
        }
        else
        {
            addedAbsAsStr = added.toString ();
            preAbsLength = addedAbsAsStr.length;
            signStr = "";
        }
        
        addedAbsAsStr = JSBD.#StripTrailingZeros (addedAbsAsStr, resultDecPlaces);
        postAbsLength = addedAbsAsStr.length;

        if (postAbsLength === 0) return JSBD.#ZERO;

        resultDecPlaces -= preAbsLength - postAbsLength;

        if (postAbsLength <= resultDecPlaces)
        {
            let diff = resultDecPlaces - postAbsLength;

            if (typeof roundOpts === "object")
            {
                return JSBD.#internalRound (`${signStr}${"0".repeat (diff + 1)}${addedAbsAsStr}`, resultDecPlaces, roundOpts, -diff);
            }

            return JSBD.#Make (`${signStr}${"0".repeat (diff + 1)}${addedAbsAsStr}`, resultDecPlaces);
        }
        else
        {
            if (typeof roundOpts === "object")
            {
                let diff = resultDecPlaces - postAbsLength;

                return JSBD.#internalRound (signStr + addedAbsAsStr, resultDecPlaces, roundOpts, diff);
            }

            return JSBD.#Make (signStr + addedAbsAsStr, resultDecPlaces);
        }
    }

    static multiply (lhs, rhs, roundOpts = undefined)
    {
        let resultDecPlaces;
        let strAsInt, str2AsInt;

        resultDecPlaces = lhs.#decPlaces + rhs.#decPlaces;

        strAsInt = BigInt (lhs.#strVal);
        str2AsInt = BigInt (rhs.#strVal);

        let added = strAsInt * str2AsInt;

        let addedAbsAsStr, preAbsLength, postAbsLength, signStr;

        if (added < 0n)
        {
            addedAbsAsStr = (-added).toString ();
            preAbsLength = addedAbsAsStr.length;
            signStr = "-";
        }
        else
        {
            addedAbsAsStr = added.toString ();
            preAbsLength = addedAbsAsStr.length;
            signStr = "";
        }

        addedAbsAsStr = JSBD.#StripTrailingZeros (addedAbsAsStr, resultDecPlaces);
        postAbsLength = addedAbsAsStr.length;

        if (postAbsLength === 0) return JSBD.#ZERO;

        resultDecPlaces -= preAbsLength - postAbsLength;

        if (postAbsLength <= resultDecPlaces)
        {
            let diff = resultDecPlaces - postAbsLength;

            if (typeof roundOpts === "object")
            {
                return JSBD.#internalRound (`${signStr}${"0".repeat (diff + 1)}${addedAbsAsStr}`, resultDecPlaces, roundOpts, -diff);
            }

            return JSBD.#Make (`${signStr}${"0".repeat (diff + 1)}${addedAbsAsStr}`, resultDecPlaces);
        }
        else
        {
            if (typeof roundOpts === "object")
            {
                let diff = resultDecPlaces - postAbsLength;

                return JSBD.#internalRound (signStr + addedAbsAsStr, resultDecPlaces, roundOpts, diff);
            }

            return JSBD.#Make (signStr + addedAbsAsStr, resultDecPlaces);
        }
    }

    static divide (lhs, rhs, roundOpts = undefined)
    {
        let strAsInt, str2AsInt;

        let dDiff = lhs.#decPlaces - rhs.#decPlaces;

        let rhsStr = rhs.#strVal;
        let lhsStr = lhs.#strVal;

        let zeroCount;
        let maxFractionDigits;

        JSBD.#CopyOptionsObject (this.#cachedRoundOpts, this.#divDefaultRoundOpts);

        if (typeof roundOpts === "object")
        {
            if (roundOpts.maximumFractionDigits !== undefined) this.#cachedRoundOpts.maximumFractionDigits = roundOpts.maximumFractionDigits;
            if (roundOpts.roundingMode !== undefined) this.#cachedRoundOpts.roundingMode = roundOpts.roundingMode;
            if (roundOpts.roundingIncrement !== undefined) this.#cachedRoundOpts.roundingIncrement = roundOpts.roundingIncrement;
            if (roundOpts.precisionMode !== undefined) this.#cachedRoundOpts.precisionMode = roundOpts.precisionMode;

            JSBD.#ValidateAndSanitiseRoundOpts (this.#cachedRoundOpts.maximumFractionDigits, this.#cachedRoundOpts);

            maxFractionDigits = this.#cachedRoundOpts.maximumFractionDigits + 1;
        }
        else
        {
            maxFractionDigits = this.#cachedRoundOpts.maximumFractionDigits + 1;
        }

        if (dDiff > 0)
        {
            let rhsLen = rhsStr.length + -dDiff;
            if (rhsStr[0] === "-") rhsLen -= 1;

            let lhsLen = lhsStr[0] === "-" ? lhsStr.length - 1 : lhsStr.length;

            zeroCount = lhsLen > rhsLen ? lhsLen - rhsLen + maxFractionDigits : maxFractionDigits;

            strAsInt = BigInt (lhsStr + "0".repeat (zeroCount));
            str2AsInt = BigInt (`${rhsStr}${"0".repeat (dDiff)}`);
        }
        else
        {
            let lhsLen = lhsStr.length + -dDiff;
            if (lhsStr[0] === "-") lhsLen -= 1;

            let rhsLen = rhsStr[0] === "-" ? rhsStr.length - 1 : rhsStr.length;

            zeroCount = rhsLen > lhsLen ? rhsLen - lhsLen + maxFractionDigits : maxFractionDigits;

            strAsInt = BigInt (`${lhsStr}${"0".repeat (-dDiff + zeroCount)}`);
            str2AsInt = BigInt (rhsStr);
        }

        if (str2AsInt === 0n) throw new RangeError ("Division by zero");
        
        let added = strAsInt / str2AsInt;

        let addedAbsAsStr;
        let preAbsLength;
        let postAbsLength;
        let signStr;

        if (added < 0n)
        {
            addedAbsAsStr = (-added).toString ();
            preAbsLength = addedAbsAsStr.length;
            signStr = "-";
        }
        else
        {
            addedAbsAsStr = added.toString ();
            preAbsLength = addedAbsAsStr.length;
            signStr = "";
        }
        
        addedAbsAsStr = JSBD.#StripTrailingZeros (addedAbsAsStr, zeroCount);
        postAbsLength = addedAbsAsStr.length;

        if (postAbsLength === 0) return JSBD.#ZERO;

        zeroCount -= preAbsLength - postAbsLength;
        
        let diff = postAbsLength - zeroCount;

        if (diff <= 0)
        {
            return JSBD.#DoRound (`${signStr}${"0".repeat (-diff + 1)}${addedAbsAsStr}`, zeroCount, this.#cachedRoundOpts.maximumFractionDigits, this.#cachedRoundOpts.roundingMode, this.#cachedRoundOpts.incrSetup, this.#cachedRoundOpts.precisionMode, diff);
        }
        else
        {
            return JSBD.#DoRound (signStr + addedAbsAsStr, zeroCount, this.#cachedRoundOpts.maximumFractionDigits, this.#cachedRoundOpts.roundingMode, this.#cachedRoundOpts.incrSetup, this.#cachedRoundOpts.precisionMode, diff);
        }
    }

    static remainder (lhs, rhs, roundOpts = undefined)
    {
        let strAsInt, str2AsInt;

        let dDiff = lhs.#decPlaces - rhs.#decPlaces;

        let rhsStr = rhs.#strVal;
        let lhsStr = lhs.#strVal;

        let resultDecPlaces;

        if (dDiff > 0)
        {
            resultDecPlaces = lhs.#decPlaces;
            strAsInt = BigInt (lhsStr);
            str2AsInt = BigInt (`${rhsStr}${"0".repeat (dDiff)}`);
        }
        else
        {
            resultDecPlaces = rhs.#decPlaces;
            strAsInt = BigInt (`${lhsStr}${"0".repeat (-dDiff)}`);
            str2AsInt = BigInt (rhsStr);
        }

        if (str2AsInt === 0n) throw new RangeError ("Division by zero");
        
        let added = strAsInt / str2AsInt;

        let addedAbsAsStr, preAbsLength, postAbsLength, signStr;

        added = strAsInt - (added * str2AsInt);

        if (added < 0n)
        {
            addedAbsAsStr = (-added).toString ();
            preAbsLength = addedAbsAsStr.length;
            signStr = "-";
        }
        else
        {
            addedAbsAsStr = added.toString ();
            preAbsLength = addedAbsAsStr.length;
            signStr = "";
        }
        
        addedAbsAsStr = JSBD.#StripTrailingZeros (addedAbsAsStr, resultDecPlaces);
        postAbsLength = addedAbsAsStr.length;

        resultDecPlaces -= preAbsLength - postAbsLength;
        
        if (postAbsLength <= resultDecPlaces)
        {
            let diff = resultDecPlaces - postAbsLength;

            if (typeof roundOpts === "object")
            {
                return JSBD.#internalRound (`${signStr}${"0".repeat (diff + 1)}${addedAbsAsStr}`, resultDecPlaces, roundOpts, -diff);
            }

            return JSBD.#Make (`${signStr}${"0".repeat (diff + 1)}${addedAbsAsStr}`, resultDecPlaces);
        }
        else
        {
            if (typeof roundOpts === "object")
            {
                let diff = resultDecPlaces - postAbsLength;

                return JSBD.#internalRound (signStr + addedAbsAsStr, resultDecPlaces, roundOpts, diff);
            }

            return JSBD.#Make (signStr + addedAbsAsStr, resultDecPlaces);
        }
    }

    static exponentiate(lhs, rhs, roundOpts = undefined)
    {
        try
        {
            rhs = JSBD.toBigInt (rhs);
        }
        catch (e)
        {
            if (e instanceof RangeError)
            {
                throw new RangeError (`Exponent ${rhs.toString ()} is not a valid integer`);
            }
            else
            {
                throw e;
            }
        }

        let maxFractionDigits, outputMaxFractionDigits;

        JSBD.#CopyOptionsObject (this.#cachedRoundOpts, this.#divDefaultRoundOpts);

        if (typeof roundOpts === "object")
        {
            if (roundOpts.maximumFractionDigits !== undefined) this.#cachedRoundOpts.maximumFractionDigits = roundOpts.maximumFractionDigits;
            if (roundOpts.roundingMode !== undefined) this.#cachedRoundOpts.roundingMode = roundOpts.roundingMode;
            if (roundOpts.roundingIncrement !== undefined) this.#cachedRoundOpts.roundingIncrement = roundOpts.roundingIncrement;
            if (roundOpts.precisionMode !== undefined) this.#cachedRoundOpts.precisionMode = roundOpts.precisionMode;

            JSBD.#ValidateAndSanitiseRoundOpts (this.#cachedRoundOpts.maximumFractionDigits, this.#cachedRoundOpts);

            outputMaxFractionDigits = this.#cachedRoundOpts.maximumFractionDigits;
            maxFractionDigits = outputMaxFractionDigits + 1;
        }
        else
        {
            outputMaxFractionDigits = this.#cachedRoundOpts.maximumFractionDigits;
            maxFractionDigits = outputMaxFractionDigits + 1;
        }

        let lhsStrVal, lhsDecPlaces;

        //truncate lhs regardless of what happens below
        if (lhs.#decPlaces > outputMaxFractionDigits)
        {
            lhsStrVal = lhs.#strVal.substring (0, lhs.#strVal.length - (lhs.#decPlaces - outputMaxFractionDigits));
            lhsDecPlaces = outputMaxFractionDigits;
        }
        else
        {
            lhsStrVal = lhs.#strVal;
            lhsDecPlaces = lhs.#decPlaces;
        }

        //inlining divide because I'm a boss
        //(and also there's plenty of changes to be made for specific use case, but really, im a boss)
        if (rhs < 0n)
        {
            let lhsBigInt = BigInt (lhsStrVal);

            //check original value, not truncated. Only throw if input in 0, return 0 if truncated value is 0
            if (lhs.#strVal === "0") throw new RangeError ("Left hand side must be non zero when raising to a negative power");

            if (lhsBigInt === 0n) return JSBD.#ZERO;

            let step = {
                lhsOrigDecPlaces: lhsDecPlaces,
                lhsBigIntValOrig: lhsBigInt,
                remainderRHS: -rhs,
                lastResult: 0n,
                resultDecPlaces: 0
            };

            JSBD.#DoExpIterations (step, maxFractionDigits);

            let resultDecPlaces = step.resultDecPlaces;
            let invDenom = step.lastResult;

            let zeroCount = maxFractionDigits + resultDecPlaces;

            let numerator = BigInt ("1" + "0".repeat (zeroCount));

            let added = numerator / invDenom;
            
            let addedAbsAsStr;
            let preAbsLength;
            let postAbsLength;
            let signStr;

            if (added < 0n)
            {
                addedAbsAsStr = (-added).toString ();
                preAbsLength = addedAbsAsStr.length;
                signStr = "-";
            }
            else
            {
                addedAbsAsStr = added.toString ();
                preAbsLength = addedAbsAsStr.length;
                signStr = "";
            }

            addedAbsAsStr = JSBD.#StripTrailingZeros (addedAbsAsStr, zeroCount);
            postAbsLength = addedAbsAsStr.length;

            if (postAbsLength === 0) return JSBD.#ZERO;

            zeroCount -= (preAbsLength - postAbsLength);// + lhsDecPlaces;
            
            let newDecCount = zeroCount - resultDecPlaces;
            let diff = postAbsLength - (newDecCount);// Number ((BigInt (lhsDecPlaces) * -rhs)));

            if (diff <= 0)
            {
                return JSBD.#DoRound (`${signStr}${"0".repeat (-diff + 1)}${addedAbsAsStr}`, newDecCount, this.#cachedRoundOpts.maximumFractionDigits, this.#cachedRoundOpts.roundingMode, this.#cachedRoundOpts.incrSetup, this.#cachedRoundOpts.precisionMode, diff);
            }
            else
            {
                return JSBD.#DoRound (signStr + addedAbsAsStr, newDecCount, this.#cachedRoundOpts.maximumFractionDigits, this.#cachedRoundOpts.roundingMode, this.#cachedRoundOpts.incrSetup, this.#cachedRoundOpts.precisionMode, diff);
            }
        }
        else
        {
            let resultDecPlaces = lhsDecPlaces * Number (rhs);
            let added;

            if (resultDecPlaces >= maxFractionDigits)
            {
                let step = {
                    lhsOrigDecPlaces: lhsDecPlaces,
                    lhsBigIntValOrig: BigInt (lhsStrVal),
                    remainderRHS: BigInt (rhs),
                    lastResult: 0n,
                    resultDecPlaces: 0
                };
    
                JSBD.#DoExpIterations (step, maxFractionDigits);
    
                resultDecPlaces = step.resultDecPlaces;
                added = step.lastResult;
            }
            else
            {
                added = BigInt (lhsStrVal) ** rhs;
            }

            let addedAbsAsStr, preAbsLength, postAbsLength, signStr;

            if (added < 0n)
            {
                addedAbsAsStr = (-added).toString ();
                preAbsLength = addedAbsAsStr.length;
                signStr = "-";
            }
            else
            {
                addedAbsAsStr = added.toString ();
                preAbsLength = addedAbsAsStr.length;
                signStr = "";
            }
            
            addedAbsAsStr = JSBD.#StripTrailingZeros (addedAbsAsStr, resultDecPlaces);
            postAbsLength = addedAbsAsStr.length;

            if (postAbsLength === 0) return JSBD.#ZERO;

            resultDecPlaces -= preAbsLength - postAbsLength;

            if (postAbsLength <= resultDecPlaces)
            {
                let diff = resultDecPlaces - postAbsLength;

                return JSBD.#DoRound (`${signStr}${"0".repeat (diff + 1)}${addedAbsAsStr}`, resultDecPlaces, this.#cachedRoundOpts.maximumFractionDigits, this.#cachedRoundOpts.roundingMode, this.#cachedRoundOpts.incrSetup, this.#cachedRoundOpts.precisionMode, -diff);
            }
            else
            {
                let diff = postAbsLength - resultDecPlaces;

                return JSBD.#DoRound (signStr + addedAbsAsStr, resultDecPlaces, this.#cachedRoundOpts.maximumFractionDigits, this.#cachedRoundOpts.roundingMode, this.#cachedRoundOpts.incrSetup, this.#cachedRoundOpts.precisionMode, diff);
            }
        }
    }

    static #DoExpIterations (outStep, maxFractionDigits)
    {
        let result = 1n;
        let resultDecPlaces = 0;

        while (outStep.remainderRHS > 0n)
        {
            JSBD.#CalcExpIterationStep (outStep.lhsOrigDecPlaces, outStep.lhsBigIntValOrig, outStep.remainderRHS, maxFractionDigits, outStep);

            result *= outStep.lastResult;

            resultDecPlaces += outStep.resultDecPlaces;

            if (resultDecPlaces > maxFractionDigits)
            {
                let str = result.toString ();

                result = BigInt (str.substring (0, str.length - (resultDecPlaces - maxFractionDigits)));
                resultDecPlaces = maxFractionDigits;
            }
            // else if (resultDecPlaces === 0)
            // {
            //     resultDecPlaces = outStep.resultDecPlaces;
            // }
        }

        outStep.lastResult = result;
        outStep.resultDecPlaces = resultDecPlaces;
    }
    
    static #CalcExpIterationStep (lhsOrigDecPlaces, lhsBigIntValOrig, rhs, maxFractionDigits, outStep)
    {
        //our example is:
        //rhs = 250
        //maxFractionDigits = 35

        //dec places will be <= maxFractionDigits
        let decPlaces = lhsOrigDecPlaces;

        //would be 2
        //let log10Floor = Math.floor (Math.log10 (Number (rhs)));
        let log10Floor = rhs.toString ().length - 1;
        //10^2 = 100
        let nearestPOW10 = 10n ** BigInt (log10Floor);
        //250 / 100 = 2.5 floor = 2
        //this is how many times we need to do ^10 to get to our nearestPOW10
        let rhsWholeFactorNPOW10 = rhs / nearestPOW10;
        //250 % 100 = 50
        let remainderFactor = rhs % nearestPOW10;

        let result = lhsBigIntValOrig;

        //do lhs ^ 10, x times... In example, would be 2 times
        //trunc precision to maxFractionDigits if necessary
        for (let i = 0; i < log10Floor; i++)
        {
            let resDecPlaces = decPlaces * 10;

            let extraDecimals = resDecPlaces - maxFractionDigits;

            if (extraDecimals > 0)
            {
                let pow10Res = result ** 10n;
                let str = pow10Res.toString ();

                result = BigInt (str.substring (0, str.length - extraDecimals));
                decPlaces = maxFractionDigits;
            }
            else
            {
                result = result ** 10n;
                decPlaces = resDecPlaces;
            }
        }
        
        //Do it one more time if needed, with the "remainder" amount
        //using our example, this would bring us up to ^200, we've done ^10 twice, 10^10 = 100
        //we have 2 remaining, 100 * 2 = 200, meaning we've done the equiv. of lhs ^ 200
        //and have ^50 remaining (remainderFactor) for the next step
        if (rhsWholeFactorNPOW10 > 1n)
        {
            let resDecPlaces = decPlaces * Number (rhsWholeFactorNPOW10);

            let extraDecimals = resDecPlaces - maxFractionDigits;

            if (extraDecimals > 0)
            {
                let powFactorRes = result ** rhsWholeFactorNPOW10;
                let str = powFactorRes.toString ();

                result = BigInt (str.substring (0, str.length - extraDecimals));

                decPlaces = maxFractionDigits;
            }
            else
            {
                result = result ** rhsWholeFactorNPOW10;
                decPlaces = resDecPlaces;
            }
        }

        //set the current state, let the while loop in #DoExpIterations
        //call again if remainderRHS > 0n
        outStep.resultDecPlaces = decPlaces;
        outStep.lastResult = result;
        outStep.remainderRHS = remainderFactor;
    }

    static lessThan (lhs, rhs)
    {
        let strAsInt, str2AsInt;

        let dDiff = lhs.#decPlaces - rhs.#decPlaces;

        if (dDiff > 0)
        {
            strAsInt = BigInt (lhs.#strVal);
            str2AsInt = BigInt (`${rhs.#strVal}${"0".repeat (dDiff)}`);
        }
        else
        {
            strAsInt = BigInt (`${lhs.#strVal}${"0".repeat (-dDiff)}`);
            str2AsInt = BigInt (rhs.#strVal);
        }

        return strAsInt < str2AsInt;
    }

    static lessThanOrEqual (lhs, rhs)
    {
        let strAsInt, str2AsInt;

        let dDiff = lhs.#decPlaces - rhs.#decPlaces;

        if (dDiff > 0)
        {
            strAsInt = BigInt (lhs.#strVal);
            str2AsInt = BigInt (`${rhs.#strVal}${"0".repeat (dDiff)}`);
        }
        else
        {
            strAsInt = BigInt (`${lhs.#strVal}${"0".repeat (-dDiff)}`);
            str2AsInt = BigInt (rhs.#strVal);
        }

        return strAsInt <= str2AsInt;
    }

    static greaterThan (lhs, rhs)
    {
        let strAsInt, str2AsInt;

        let dDiff = lhs.#decPlaces - rhs.#decPlaces;

        if (dDiff > 0)
        {
            strAsInt = BigInt (lhs.#strVal);
            str2AsInt = BigInt (`${rhs.#strVal}${"0".repeat (dDiff)}`);
        }
        else
        {
            strAsInt = BigInt (`${lhs.#strVal}${"0".repeat (-dDiff)}`);
            str2AsInt = BigInt (rhs.#strVal);
        }

        return strAsInt > str2AsInt;
    }

    static greaterThanOrEqual (lhs, rhs)
    {
        let strAsInt, str2AsInt;

        let dDiff = lhs.#decPlaces - rhs.#decPlaces;

        if (dDiff > 0)
        {
            strAsInt = BigInt (lhs.#strVal);
            str2AsInt = BigInt (`${rhs.#strVal}${"0".repeat (dDiff)}`);
        }
        else
        {
            strAsInt = BigInt (`${lhs.#strVal}${"0".repeat (-dDiff)}`);
            str2AsInt = BigInt (rhs.#strVal);
        }

        return strAsInt >= str2AsInt;
    }

    static equal (lhs, rhs)
    {
        try
        {
            let strAsInt, str2AsInt;

            let dDiff = lhs.#decPlaces - rhs.#decPlaces;

            if (dDiff === 0)
            {
                return lhs.#strVal === rhs.#strVal;
            }
            else if (dDiff > 0)
            {
                strAsInt = BigInt (lhs.#strVal);
                str2AsInt = BigInt (`${rhs.#strVal}${"0".repeat (dDiff)}`);
            }
            else
            {
                strAsInt = BigInt (`${lhs.#strVal}${"0".repeat (-dDiff)}`);
                str2AsInt = BigInt (rhs.#strVal);
            }

            return strAsInt === str2AsInt;
        }
        catch (e)
        {
            return false;
        }
    }

    static notEqual (lhs, rhs)
    {
        try
        {
            let strAsInt, str2AsInt;

            let dDiff = lhs.#decPlaces - rhs.#decPlaces;

            if (dDiff === 0)
            {
                return lhs.#strVal !== rhs.#strVal;
            }
            else if (dDiff > 0)
            {
                strAsInt = BigInt (lhs.#strVal);
                str2AsInt = BigInt (`${rhs.#strVal}${"0".repeat (dDiff)}`);
            }
            else
            {
                strAsInt = BigInt (`${lhs.#strVal}${"0".repeat (-dDiff)}`);
                str2AsInt = BigInt (rhs.#strVal);
            }

            return strAsInt !== str2AsInt;
        }
        catch (e)
        {
            return true;
        }
    }

    static unaryMinus (rhs)
    {
        if (rhs.#strVal === "0") return rhs;

        if (rhs.#strVal[0] === "-")
        {
            return JSBD.#Make (rhs.#strVal.substring (1), rhs.#decPlaces);
        }
        else
        {
            return JSBD.#Make ("-" + rhs.#strVal, rhs.#decPlaces);
        }
    }

    static logicalNot (rhs)
    {
        return rhs.#strVal === "0";
    }

    static logicalNot2 (rhs)
    {
        return rhs.#strVal !== "0";
    }

    static bitwiseNot (rhs)
    {
        return JSBD.#Make ((~BigInt (rhs.#strVal.substring (0, rhs.#strVal.length - rhs.#decPlaces))).toString (), 0);
    }

    static bitwiseNot2 (rhs)
    {
        return JSBD.#Make (rhs.#strVal.substring (0, rhs.#strVal.length - rhs.#decPlaces), 0);
    }

    static bitwiseOr (lhs, rhs)
    {
        if (!(rhs instanceof JSBD) || !(lhs instanceof JSBD)) throw new TypeError ("Cannot mix BigD and other types, use explicit conversions");
    
        let rhsBigInt = BigInt (rhs.#strVal.substring (0, rhs.#strVal.length - rhs.#decPlaces));
        let lhsBigInt = BigInt (lhs.#strVal.substring (0, lhs.#strVal.length - lhs.#decPlaces));

        return JSBD.#Make ((lhsBigInt | rhsBigInt).toString (), 0);
    }

    static bitwiseXOr (lhs, rhs)
    {
        if (!(rhs instanceof JSBD) || !(lhs instanceof JSBD)) throw new TypeError ("Cannot mix BigD and other types, use explicit conversions");
    
        let rhsBigInt = BigInt (rhs.#strVal.substring (0, rhs.#strVal.length - rhs.#decPlaces));
        let lhsBigInt = BigInt (lhs.#strVal.substring (0, lhs.#strVal.length - lhs.#decPlaces));

        return JSBD.#Make ((lhsBigInt ^ rhsBigInt).toString (), 0);
    }

    static bitwiseAnd (lhs, rhs)
    {
        if (!(rhs instanceof JSBD) || !(lhs instanceof JSBD)) throw new TypeError ("Cannot mix BigD and other types, use explicit conversions");
    
        let rhsBigInt = BigInt (rhs.#strVal.substring (0, rhs.#strVal.length - rhs.#decPlaces));
        let lhsBigInt = BigInt (lhs.#strVal.substring (0, lhs.#strVal.length - lhs.#decPlaces));

        return JSBD.#Make ((lhsBigInt & rhsBigInt).toString (), 0);
    }

    static bitwiseLeftShift (lhs, rhs)
    {
        if (!(rhs instanceof JSBD) || !(lhs instanceof JSBD)) throw new TypeError ("Cannot mix BigD and other types, use explicit conversions");
    
        let rhsBigInt = BigInt (rhs.#strVal.substring (0, rhs.#strVal.length - rhs.#decPlaces));
        let lhsBigInt = BigInt (lhs.#strVal.substring (0, lhs.#strVal.length - lhs.#decPlaces));

        return JSBD.#Make ((lhsBigInt << rhsBigInt).toString (), 0);
    }

    static bitwiseRightShift (lhs, rhs)
    {
        if (!(rhs instanceof JSBD) || !(lhs instanceof JSBD)) throw new TypeError ("Cannot mix BigD and other types, use explicit conversions");
    
        let rhsBigInt = BigInt (rhs.#strVal.substring (0, rhs.#strVal.length - rhs.#decPlaces));
        let lhsBigInt = BigInt (lhs.#strVal.substring (0, lhs.#strVal.length - lhs.#decPlaces));

        return JSBD.#Make ((lhsBigInt >> rhsBigInt).toString (), 0);
    }

    //
    //Loose operators
    //

    static EQ (lhs, rhs)
    {
        if (lhs instanceof JSBD)
        {
            if (rhs instanceof JSBD) 
            {
                return JSBD.equal (lhs, rhs);
            }

            try
            {
                rhs = JSBD.BigD (rhs);
            }
            catch (e)
            {
                return false;
            }

            return JSBD.equal (lhs, rhs);
        }
        
        if (rhs instanceof JSBD) 
        {
            if (lhs instanceof JSBD)
            {
                return JSBD.equal (lhs, rhs);
            }

            try
            {
                lhs = JSBD.BigD (lhs);
            }
            catch (e)
            {
                return false;
            }

            return JSBD.equal (lhs, rhs);
        }

        return lhs == rhs;
    }

    static NE (lhs, rhs)
    {
        if (lhs instanceof JSBD)
        {
            if (rhs instanceof JSBD) 
            {
                return JSBD.notEqual (lhs, rhs);
            }

            try
            {
                rhs = JSBD.BigD (rhs);
            }
            catch (e)
            {
                return true;
            }

            return JSBD.notEqual (lhs, rhs);
        }
        
        if (rhs instanceof JSBD) 
        {
            if (lhs instanceof JSBD)
            {
                return JSBD.notEqual (lhs, rhs);
            }

            try
            {
                lhs = JSBD.BigD (lhs);
            }
            catch (e)
            {
                return true;
            }

            return JSBD.notEqual (lhs, rhs);
        }

        return lhs != rhs;
    }

    static LT (lhs, rhs)
    {
        if (lhs instanceof JSBD)
        {
            if (rhs instanceof JSBD) 
            {
                return JSBD.lessThan (lhs, rhs);
            }

            try
            {
                rhs = JSBD.BigD (rhs);
            }
            catch (e)
            {
                return false;
            }

            return JSBD.lessThan (lhs, rhs);
        }
        
        if (rhs instanceof JSBD) 
        {
            if (lhs instanceof JSBD)
            {
                return JSBD.lessThan (lhs, rhs);
            }

            try
            {
                lhs = JSBD.BigD (lhs);
            }
            catch (e)
            {
                return false;
            }

            return JSBD.lessThan (lhs, rhs);
        }

        return lhs < rhs;
    }

    static LE (lhs, rhs)
    {
        if (lhs instanceof JSBD)
        {
            if (rhs instanceof JSBD) 
            {
                return JSBD.lessThanOrEqual (lhs, rhs);
            }

            try
            {
                rhs = JSBD.BigD (rhs);
            }
            catch (e)
            {
                return false;
            }

            return JSBD.lessThanOrEqual (lhs, rhs);
        }
        
        if (rhs instanceof JSBD) 
        {
            if (lhs instanceof JSBD)
            {
                return JSBD.lessThanOrEqual (lhs, rhs);
            }

            try
            {
                lhs = JSBD.BigD (lhs);
            }
            catch (e)
            {
                return false;
            }

            return JSBD.lessThanOrEqual (lhs, rhs);
        }

        return lhs <= rhs;
    }

    static GT (lhs, rhs)
    {
        if (lhs instanceof JSBD)
        {
            if (rhs instanceof JSBD) 
            {
                return JSBD.greaterThan (lhs, rhs);
            }

            try
            {
                rhs = JSBD.BigD (rhs);
            }
            catch (e)
            {
                return false;
            }

            return JSBD.greaterThan (lhs, rhs);
        }
        
        if (rhs instanceof JSBD) 
        {
            if (lhs instanceof JSBD)
            {
                return JSBD.greaterThan (lhs, rhs);
            }

            try
            {
                lhs = JSBD.BigD (lhs);
            }
            catch (e)
            {
                return false;
            }

            return JSBD.greaterThan (lhs, rhs);
        }

        return lhs > rhs;
    }

    static GE (lhs, rhs)
    {
        if (lhs instanceof JSBD)
        {
            if (rhs instanceof JSBD) 
            {
                return JSBD.greaterThanOrEqual (lhs, rhs);
            }

            try
            {
                rhs = JSBD.BigD (rhs);
            }
            catch (e)
            {
                return false;
            }

            return JSBD.greaterThanOrEqual (lhs, rhs);
        }
        
        if (rhs instanceof JSBD) 
        {
            if (lhs instanceof JSBD)
            {
                return JSBD.greaterThanOrEqual (lhs, rhs);
            }

            try
            {
                lhs = JSBD.BigD (lhs);
            }
            catch (e)
            {
                return false;
            }

            return JSBD.greaterThanOrEqual (lhs, rhs);
        }

        return lhs >= rhs;
    }

    static ADD (lhs, rhs)
    {
        if (lhs instanceof JSBD)
        {
            if (rhs instanceof JSBD) 
            {
                return JSBD.add (lhs, rhs);
            }
            else if (typeof rhs === "string")
            {
                return lhs.toString () + rhs;
            }
            else
            {
                throw new TypeError ("Cannot mix BigD and other types, use explicit conversions");
            }
        }
        
        if (rhs instanceof JSBD) 
        {
            if (lhs instanceof JSBD)
            {
                return JSBD.add (lhs, rhs);
            }
            else if (typeof lhs === "string")
            {
                return lhs + rhs.toString ();
            }
            else
            {
                throw new TypeError ("Cannot mix BigD and other types, use explicit conversions");
            }
        }

        return lhs + rhs;
    }

    //
    //Conversions
    //e.g Number (x), BigInt (x), String (x), Boolean (x)
    //
    static toNumber(x)
    {
        return Number (x.toString ());
    }

    static toBigInt (x)
    {
        if (x.#decPlaces === 0)
        {
            return BigInt (x.#strVal);
        }

        let diff = x.#strVal.length - x.#decPlaces;

        throw new RangeError (`${x.#strVal.substring (0, diff)}.${x.#strVal.substring (diff)} can't be converted to BigInt because it isn't an integer`);
    }

    static toString (x)
    {
        return x.toString ();
    }

    static toBoolean (x)
    {
        return x.#strVal !== "0";
    }

    static toSymbol (x)
    {
        return Symbol (x.toString ());
    }
  
    /**
     * If maxLookback is 0 and startOffset > 0, string will truncate from start to (end - startOffset)
     * @param {string} str 
     * @param {number} maxLookback 
     * @param {number} startOffset 
     * @returns {string}
     */
    static #StripTrailingZeros (str, maxLookback, startOffset = 0)
    {
        if (maxLookback == 0)
        {
            if (startOffset > 0) return str.substring (0, str.length - startOffset); 
            return str;
        }

        let mOne = str.length - 1 - startOffset;

        if (str.codePointAt (mOne) != 48)
        {
            return str;
        }

        let lastZeroIndex = mOne;

        let minIExcl = Math.max (-1, mOne - maxLookback);

        for (let i = mOne - 1; i > minIExcl; i--)
        {
            if (str.codePointAt (i) == 48)
            {
                lastZeroIndex = i;
            }
            else
            {
                break;
            }
        }

        return str.substring (0, lastZeroIndex);
    }

    //
    //Instance methods
    //

    toString (radix = 10)
    {
        radix = Math.trunc (radix);

        if (radix === 10)
        {
            if (this.#decPlaces === 0)
            {
                return this.#strVal;
            }

            let diff = this.#strVal.length - this.#decPlaces;

            return `${this.#strVal.substring (0, diff)}.${this.#strVal.substring (diff)}`;
        }
        else
        {
            if (this.#decPlaces === 0)
            {
                return BigInt (this.#strVal).toString (radix);
            }

            let diff = this.#strVal.length - this.#decPlaces;

            return `${BigInt (this.#strVal.substring (0, diff)).toString (radix)}.${BigInt (this.#strVal.substring (diff)).toString (radix)}`;
        }
    }

    toLocaleString (locale, options)
    {
        return new Intl.NumberFormat (locale, options).format (this.toString ());
    }

    toFixed (digits)
    {
        //mimics https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tonumber
        //allows NaN, undefined etc.
        digits = +digits;
        digits = ~~digits;

        if (digits < 0 || digits > 100) throw new RangeError ("toFixed() digits argument must be between 0 and 100");
        
        if (digits > this.#decPlaces)
        {
            let extraDecimals = digits - this.#decPlaces;

            if (this.#decPlaces === 0)
            {
                return `${this.#strVal}.${"0".repeat (extraDecimals)}`;
            }

            let diff = this.#strVal.length - this.#decPlaces;

            return `${this.#strVal.substring (0, diff)}.${this.#strVal.substring (diff)}${"0".repeat (extraDecimals)}`;
        }
        else if (digits === this.#decPlaces)
        {
            if (this.#decPlaces === 0)
            {
                return this.#strVal;
            }

            let diff = this.#strVal.length - this.#decPlaces;

            return `${this.#strVal.substring (0, diff)}.${this.#strVal.substring (diff)}`;
        }

        let decPlaces = this.#decPlaces, maxFractionDigits = digits, strVal = this.#strVal;

        //
        //halfExpand
        //
        let chopCount = decPlaces - maxFractionDigits;

        let index = strVal.length - (chopCount);
        let num = Number (strVal[index]);

        let newLastDigit;
        let newLastDigitStr;

        if (strVal.codePointAt (0) === 45)
        {
            newLastDigit = BigInt (strVal.substring (1, index));
            if (num >= 5) newLastDigit += 1n;
            
            newLastDigitStr = newLastDigit.toString ();

            let diff = index - 1 - newLastDigitStr.length;

            if (diff > 0) newLastDigitStr = `-${"0".repeat (diff)}${newLastDigitStr}`;
            else newLastDigitStr = "-" + newLastDigitStr;
        }
        else
        {
            newLastDigit = BigInt (strVal.substring (0, index));
            if (num >= 5) newLastDigit += 1n;

            newLastDigitStr = newLastDigit.toString ();

            let diff = index - newLastDigitStr.length;

            if (diff > 0) newLastDigitStr = `${"0".repeat (diff)}${newLastDigitStr}`;
        } 

        if (newLastDigit % 10n === 0n)
        {
            let newStr = JSBD.#StripTrailingZeros (newLastDigitStr, maxFractionDigits);
            let newDecCount = maxFractionDigits - (newLastDigitStr.length - newStr.length);

            if (newDecCount === 0 && newStr === "-0") newStr = "0";
            
            if (maxFractionDigits === 0)
            {
                return `${newStr.substring (0)}`;
            }

            let diff = newStr.length - newDecCount;

            if (newDecCount < maxFractionDigits) 
            {
                return `${newStr.substring (0, diff)}.${"0".repeat (maxFractionDigits - newDecCount)}`;
            }

            return `${newStr.substring (0, diff)}.${newStr.substring (diff)}`;
        }
        else
        {
            if (maxFractionDigits === 0)
            {
                return `${newLastDigitStr.substring (0)}`;
            }

            let diff = newLastDigitStr.length - maxFractionDigits;

            return `${newLastDigitStr.substring (0, diff)}.${newLastDigitStr.substring (diff)}`;
        }
    }

    toExponential (fractionDigits)
    {
        //mimics https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tonumber
        //allows NaN, undefined etc.
        fractionDigits = +fractionDigits;
        fractionDigits = ~~fractionDigits;

        if (fractionDigits < 0 || fractionDigits > 100) throw new RangeError ("toExponential() fractionDigits argument must be between 0 and 100");

        let strVal = this.#strVal;
        let isNegative = strVal.codePointAt (0) === 45;
        let intDigitCount = strVal.length - this.#decPlaces;

        if (isNegative)
        {
            intDigitCount--;

            let newLastDigit, numStr, leadingZeroCount = 0, preRoundLength = 0;

            for (let i = 1; i < strVal.length; i++)
            {
                if (strVal[i] !== "0")
                {
                    //I also pee pee
                    let iPP = i + fractionDigits + 1;

                    let str = strVal.substring (i, iPP + 1);
                    preRoundLength = str.length;

                    newLastDigit = BigInt (str);
                    numStr = strVal.substring (iPP, iPP + 1);
                    leadingZeroCount = i - 1;
                    break;
                }
            }

            if (!numStr)
            {
                if (newLastDigit === undefined)
                {
                    return fractionDigits > 0 ? `0.${"0".repeat (fractionDigits)}e+0` : `0e+0`;
                }
                else
                {
                    let newLastDigitStr = newLastDigit.toString ();

                    if (leadingZeroCount > 0)
                    {
                        if (fractionDigits > 0)
                        {
                            let extraZeros = fractionDigits - (newLastDigitStr.length - 1);
                            return `-${newLastDigitStr.substring (0,1)}.${newLastDigitStr.substring (1, 1 + fractionDigits)}${"0".repeat (extraZeros)}e-${leadingZeroCount}`;
                        }
                        else return `-${newLastDigitStr}e-${leadingZeroCount}`;
                    }
                    else
                    {
                        if (fractionDigits > 0)
                        {
                            let extraZeros = fractionDigits - (newLastDigitStr.length - 1);
                            return `-${newLastDigitStr.substring (0,1)}.${newLastDigitStr.substring (1, 1 + fractionDigits)}${"0".repeat (extraZeros)}e+${intDigitCount - 1}`;
                        }
                        else return `-${newLastDigitStr}e+${intDigitCount - 1}`;
                    }
                }
            }

            if (Number (numStr) >= 5)
            {
                newLastDigit += 10n;
                newLastDigit -= newLastDigit % 10n;
            }
        
            let newLastDigitStr = newLastDigit.toString ();

            if (newLastDigitStr.length > preRoundLength) leadingZeroCount--;
            
            if (leadingZeroCount > 0)
            {
                if (fractionDigits > 0)
                {
                    let extraZeros = Math.max (0, fractionDigits - (newLastDigitStr.length - 1));
                    return `-${newLastDigitStr.substring (0,1)}.${newLastDigitStr.substring (1, 1 + fractionDigits)}${"0".repeat (extraZeros)}e-${leadingZeroCount}`;
                }
                else return `-${newLastDigitStr.substring (0,1)}e-${leadingZeroCount}`;
            }
            else
            {
                if (fractionDigits > 0)
                {
                    let extraZeros = Math.max (0, fractionDigits - (newLastDigitStr.length - 1));
                    return `-${newLastDigitStr.substring (0,1)}.${newLastDigitStr.substring (1, 1 + fractionDigits)}${"0".repeat (extraZeros)}e+${intDigitCount - 1 - leadingZeroCount}`;
                }
                else return `-${newLastDigitStr.substring (0,1)}e+${intDigitCount - leadingZeroCount - 1}`;
            }
        }
        else
        {
            let newLastDigit, numStr, leadingZeroCount = 0, preRoundLength = 0;

            for (let i = 0; i < strVal.length; i++)
            {
                if (strVal[i] !== "0")
                {
                    //I also pee pee
                    let iPP = i + fractionDigits + 1;

                    let str = strVal.substring (i, iPP + 1);
                    preRoundLength = str.length;

                    newLastDigit = BigInt (str);
                    numStr = strVal.substring (iPP, iPP + 1);
                    leadingZeroCount = i;
                    break;
                }
            }

            if (!numStr)
            {
                if (newLastDigit === undefined)
                {
                    return fractionDigits > 0 ? `0.${"0".repeat (fractionDigits)}e+0` : `0e+0`;
                }
                else
                {
                    let newLastDigitStr = newLastDigit.toString ();

                    if (leadingZeroCount > 0)
                    {
                        if (fractionDigits > 0)
                        {
                            let extraZeros = fractionDigits - (newLastDigitStr.length - 1);
                            return `${newLastDigitStr.substring (0,1)}.${newLastDigitStr.substring (1, 1 + fractionDigits)}${"0".repeat (extraZeros)}e-${leadingZeroCount}`;
                        }
                        else return `${newLastDigitStr}e-${leadingZeroCount}`;
                    }
                    else
                    {
                        if (fractionDigits > 0)
                        {
                            let extraZeros = fractionDigits - (newLastDigitStr.length - 1);
                            return `${newLastDigitStr.substring (0,1)}.${newLastDigitStr.substring (1, 1 + fractionDigits)}${"0".repeat (extraZeros)}e+${intDigitCount - 1}`;
                        }
                        else return `${newLastDigitStr}e+${intDigitCount - 1}`;
                    }
                }
            }

            if (Number (numStr) >= 5)
            {
                newLastDigit += 10n;
                newLastDigit -= newLastDigit % 10n;
            }
        
            let newLastDigitStr = newLastDigit.toString ();

            if (newLastDigitStr.length > preRoundLength) leadingZeroCount--;
            
            if (leadingZeroCount > 0)
            {
                if (fractionDigits > 0)
                {
                    let extraZeros = Math.max (0, fractionDigits - (newLastDigitStr.length - 1));
                    return `${newLastDigitStr.substring (0,1)}.${newLastDigitStr.substring (1, 1 + fractionDigits)}${"0".repeat (extraZeros)}e-${leadingZeroCount}`;
                }
                else return `${newLastDigitStr.substring (0,1)}e-${leadingZeroCount}`;
            }
            else
            {
                if (fractionDigits > 0)
                {
                    let extraZeros = Math.max (0, fractionDigits - (newLastDigitStr.length - 1));
                    return `${newLastDigitStr.substring (0,1)}.${newLastDigitStr.substring (1, 1 + fractionDigits)}${"0".repeat (extraZeros)}e+${intDigitCount - 1 - leadingZeroCount}`;
                }
                else return `${newLastDigitStr.substring (0,1)}e+${intDigitCount - leadingZeroCount - 1}`;
            }
        }
    }

    toPrecision (precision)
    {
        //mimics https://tc39.es/ecma262/multipage/abstract-operations.html#sec-tonumber
        //allows NaN, undefined etc.
        precision = +precision;
        precision = ~~precision;
        
        if (precision < 1 || precision > 100) throw new RangeError ("toPrecision() precision argument must be between 1 and 100");

        let strVal = this.#strVal;
        let isNegative = strVal.codePointAt (0) === 45;
        let intDigitCount = strVal.length - this.#decPlaces;

        if (isNegative) intDigitCount--;

        if (precision < intDigitCount)
        {
            //halfExpand
            let finalDecimalCount = precision - 1;
            let exponent = intDigitCount - 1;// - precision;

            let chopCount = this.#decPlaces + (intDigitCount - precision);

            let index = strVal.length - (chopCount);
            let num = Number (strVal[index]);

            let newLastDigit;
            let newLastDigitStr;

            if (isNegative)
            {
                newLastDigit = BigInt (strVal.substring (1, index));
                if (num >= 5) newLastDigit += 1n;
                
                newLastDigitStr = "-" + newLastDigit.toString ();

                if (newLastDigitStr.length - 1 > precision) exponent++;

                if (precision > 1)
                {
                    return `${newLastDigitStr.substring (0, 2)}.${newLastDigitStr.substring (2, 2 + finalDecimalCount)}e+${exponent}`;
                }
                else
                {
                    return `${newLastDigitStr.substring (0, 2)}e+${exponent}`;
                }
            }
            else
            {
                newLastDigit = BigInt (strVal.substring (0, index));
                if (num >= 5) newLastDigit += 1n;

                newLastDigitStr = newLastDigit.toString ();

                if (newLastDigitStr.length > precision) exponent++;

                if (precision > 1)
                {
                    return `${newLastDigitStr.substring (0, 1)}.${newLastDigitStr.substring (1, 1 + finalDecimalCount)}e+${exponent}`;
                }
                else
                {
                    return `${newLastDigitStr.substring (0, 1)}e+${exponent}`;
                }
            }
        }
        else if (precision == intDigitCount)
        {
            let chopCount = this.#decPlaces;

            if (chopCount === 0)
            {
                return strVal;
            }

            if ((isNegative && strVal[1] === "0") || (!isNegative && strVal[0] === "0"))
            {
                if (isNegative)
                {
                    let newLastDigit;
                    let numStr;
                    let leadingZeroCount;

                    //Start from the first decimal
                    for (let i = 2; i < strVal.length; i++)
                    {
                        if (strVal[i] !== "0")
                        {
                            //I also pee pee
                            let iPP = i + precision;

                            newLastDigit = BigInt (strVal.substring (i, iPP));
                            numStr = strVal.substring (iPP, iPP + 1);
                            leadingZeroCount = i - 1;
                            break;
                        }
                    }

                    if (!numStr) return `-0.${strVal.substring (2)}`;

                    if (Number (numStr) >= 5) newLastDigit += 1n;

                    let newLastDigitStr = newLastDigit.toString ();

                    if (newLastDigitStr.length > precision)
                    {
                        leadingZeroCount--;
                        newLastDigitStr = newLastDigitStr.substring (0, newLastDigitStr.length - 1);
                    }
                    
                    if (leadingZeroCount > 0)
                    {
                        return `-0.${"0".repeat (leadingZeroCount - 1)}${newLastDigitStr}`;
                    }
                    else
                    {
                        return "-" + newLastDigitStr;
                    }
                }
                else
                {
                    let newLastDigit;
                    let numStr;
                    let leadingZeroCount;

                    for (let i = 1; i < strVal.length; i++)
                    {
                        if (strVal[i] !== "0")
                        {
                            //I also pee pee
                            let iPP = i + precision;

                            newLastDigit = BigInt (strVal.substring (i, iPP));
                            numStr = strVal.substring (iPP, iPP + 1);
                            leadingZeroCount = i;
                            break;
                        }
                    }

                    if (!numStr) return `0.${strVal.substring (1)}`;

                    if (Number (numStr) >= 5) newLastDigit += 1n;

                    let newLastDigitStr = newLastDigit.toString ();

                    if (newLastDigitStr.length > precision)
                    {
                        leadingZeroCount--;
                        newLastDigitStr = newLastDigitStr.substring (0, newLastDigitStr.length - 1);
                    }
                    
                    if (leadingZeroCount > 0)
                    {
                        return `0.${"0".repeat (leadingZeroCount - 1)}${newLastDigitStr}`;
                    }
                    else
                    {
                        return newLastDigitStr;
                    }
                }
            }
            //
            //else, do this
            //
            let index = strVal.length - chopCount;

            let num = Number (strVal[index]);

            let newLastDigit;
            let newLastDigitStr;

            if (isNegative)
            {
                newLastDigit = BigInt (strVal.substring (1, index));
                if (num >= 5) newLastDigit += 1n;
                
                newLastDigitStr = newLastDigit.toString ();

                let diff = index - 1 - newLastDigitStr.length;

                if (diff > 0) newLastDigitStr = `-${"0".repeat (diff)}${newLastDigitStr}`;
                else newLastDigitStr = "-" + newLastDigitStr;

                if (newLastDigitStr.length - 1 > precision)
                {
                    if (precision > 1) return `${newLastDigitStr.substring (0, 2)}.${newLastDigitStr.substring (2, precision + 1)}e+${precision}`;

                    return `${newLastDigitStr.substring (0, precision + 1)}e+${precision}`;
                }

                return `${newLastDigitStr.substring (0, precision + 1)}`;
            }
            else
            {
                newLastDigit = BigInt (strVal.substring (0, index));
                if (num >= 5) newLastDigit += 1n;

                newLastDigitStr = newLastDigit.toString ();

                let diff = index - newLastDigitStr.length;

                if (diff > 0) newLastDigitStr = `${"0".repeat (diff)}${newLastDigitStr}`;

                if (newLastDigitStr.length > precision)
                {
                    if (precision > 1) return `${newLastDigitStr.substring (0, 1)}.${newLastDigitStr.substring (1, precision)}e+${precision}`;

                    return `${newLastDigitStr.substring (0, 1)}e+${precision}`;
                }

                return `${newLastDigitStr.substring (0, precision)}`;
            } 
        }
        else
        {
            let finalDecimalCount;

            if ((isNegative && strVal[1] === "0") || (!isNegative && strVal[0] === "0"))
            {
                if (isNegative)
                {
                    for (let i = 2; i < strVal.length; i++)
                    {
                        if (strVal[i] !== "0")
                        {
                            finalDecimalCount = i + precision - 2;
                            break;
                        }
                    }

                    if (finalDecimalCount === undefined) finalDecimalCount = precision - intDigitCount;
                }
                else
                {
                    for (let i = 1; i < strVal.length; i++)
                    {
                        if (strVal[i] !== "0")
                        {
                            finalDecimalCount = i + precision - 1;
                            break;
                        }
                    }

                    if (finalDecimalCount === undefined) finalDecimalCount = precision - intDigitCount;
                }
            }
            else
            {
                finalDecimalCount = precision - intDigitCount;
            }


            if (finalDecimalCount === this.#decPlaces)
            {
                let diff = strVal.length - this.#decPlaces;

                return `${strVal.substring (0, diff)}.${strVal.substring (diff)}`;
            }
            else if (finalDecimalCount > this.#decPlaces)
            {
                let extraDecimals = finalDecimalCount - this.#decPlaces;

                let diff = strVal.length - this.#decPlaces;

                return `${strVal.substring (0, diff)}.${strVal.substring (diff)}${"0".repeat (extraDecimals)}`;
            }

            let chopCount = this.#decPlaces - finalDecimalCount;

            let index = strVal.length - (chopCount);
            let num = Number (strVal[index]);

            let newLastDigit;
            let newLastDigitStr;

            if (isNegative)
            {
                newLastDigit = BigInt (strVal.substring (1, index));
                if (num >= 5) newLastDigit += 1n;
                
                newLastDigitStr = newLastDigit.toString ();

                let diff = index - 1 - newLastDigitStr.length;

                if (diff > 0) newLastDigitStr = `-${"0".repeat (diff)}${newLastDigitStr}`;
                else newLastDigitStr = "-" + newLastDigitStr;
            }
            else
            {
                newLastDigit = BigInt (strVal.substring (0, index));
                if (num >= 5) newLastDigit += 1n;

                newLastDigitStr = newLastDigit.toString ();

                let diff = index - newLastDigitStr.length;

                if (diff > 0) newLastDigitStr = `${"0".repeat (diff)}${newLastDigitStr}`;
            } 

            if (newLastDigit % 10n === 0n)
            {
                if (newLastDigitStr.length > index) finalDecimalCount--;
                
                if (finalDecimalCount === 0) return newLastDigitStr;

                let diff = newLastDigitStr.length - finalDecimalCount;

                return `${newLastDigitStr.substring (0, diff)}.${newLastDigitStr.substring (diff, diff + finalDecimalCount)}`;
            }
            else
            {
                let diff = newLastDigitStr.length - finalDecimalCount;

                return `${newLastDigitStr.substring (0, diff)}.${newLastDigitStr.substring (diff)}`;
            }
        }
    }

    static {
        JSBD.#staticConstructor ();
    }
}