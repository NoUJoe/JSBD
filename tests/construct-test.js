import JSBD from "../jsbd.js";

let expect = function (value)
{
    return {
        toEqual: function (expectedValue)
        {
            if (value !== expectedValue)
            {
                throw new Error (`Value: ${value} does not match expected value: ${expectedValue}`);
            }
        },
        toThrow: function (message = undefined)
        {
            let didPass = true;
            try
            {   
                value ();
                didPass = false;
            }
            catch (e)
            {
                if (typeof message == "string")
                {
                    if (e.message !== message)
                    {
                        throw new Error (`Test call threw, but thrown message, '${e.message}', does not match expected message, '${message}'`);
                    }
                }

                return;
            }

            if (!didPass) throw new Error (`Test call did not throw as expected`);
        }
    }
}

//Footnotes
//1. For "big" integer numbers (eg. 1e+25), its "true" value can be retrieved by converting to a BigInt
//   The E notation will be ignored in favour of converting to a BigInt and using that value
//   "1e+25" != 1e+25

//2. For really small non integer numbers (eg. 1e-25), there's no reliable way to retrieve the "true" value
//   that guarantees that all digits are included. So small numbers will first get the string
//   value of the number, if that string is E notation, then we parse that like we do when a 
//   E notation string is passed. "1e-25" == 1e-25

//####################################################
//########## VARIOUS TYPES ###########################
//####################################################
{
    expect (JSBD.BigD (false).toString ()).toEqual ("0");
    expect (JSBD.BigD (true).toString ()).toEqual ("1");
    expect (JSBD.BigD (null).toString ()).toEqual ("0");

    expect (JSBD.BigD ([]).toString ()).toEqual ("0");
    expect (JSBD.BigD ([1]).toString ()).toEqual ("1");
    expect (JSBD.BigD ([2]).toString ()).toEqual ("2");
    expect (JSBD.BigD ([1n]).toString ()).toEqual ("1");

    expect (JSBD.BigD ({
        valueOf: function () {return {}},
        toString: function () {return "1.1"}}).toString ()).toEqual ("1.1");

    expect (JSBD.BigD ({
        valueOf: function () {return new Number (1)},
        toString: function () {return "2.2"}}).toString ()).toEqual ("2.2");

    expect (JSBD.BigD ({
        valueOf: function () {return this},
        toString: function () {return "3.3"}}).toString ()).toEqual ("3.3");

    expect (JSBD.BigD ({[Symbol.toPrimitive]: function () {return 1}}).toString ()).toEqual ("1");
    expect (JSBD.BigD ({[Symbol.toPrimitive]: function () {return 2}}).toString ()).toEqual ("2");
    expect (JSBD.BigD ({[Symbol.toPrimitive]: function () {return 3}}).toString ()).toEqual ("3");
}


//####################################################
//########## VARIOUS TYPES ERRORS ####################
//####################################################
{
    expect (() => JSBD.BigD (undefined).toString ()).toThrow ("Cannot convert undefined to a JSBD");
    expect (() => JSBD.BigD (Symbol.toPrimitive).toString ()).toThrow ("Cannot convert a Symbol value to a number");
    expect (() => JSBD.BigD (function (){}).toString ()).toThrow ("Cannot convert function (){} to a JSBD");
    expect (() => JSBD.BigD (()=>{}).toString ()).toThrow ("Cannot convert ()=>{} to a JSBD");
    expect (() => JSBD.BigD ({}).toString ()).toThrow ("Cannot convert [object Object] to a JSBD");
    expect (() => JSBD.BigD ([1, 2]).toString ()).toThrow ("Cannot convert 1,2 to a JSBD");

    expect (() => JSBD.BigD (NaN).toString ()).toThrow ("Cannot convert NaN to a JSBD");
    expect (() => JSBD.BigD (Infinity).toString ()).toThrow ("Cannot convert Infinity to a JSBD");
    expect (() => JSBD.BigD ("Infinity").toString ()).toThrow ("Cannot convert Infinity to a JSBD");
    expect (() => JSBD.BigD (-Infinity).toString ()).toThrow ("Cannot convert -Infinity to a JSBD");
    expect (() => JSBD.BigD ("-Infinity").toString ()).toThrow ("Cannot convert -Infinity to a JSBD");

    expect (() => JSBD.BigD ({[Symbol.toPrimitive]: function () {return {}}}).toString ()).toThrow ("Cannot convert object to primitive value");
    expect (() => JSBD.BigD ({[Symbol.toPrimitive]: function () {return new Number (1)}}).toString ()).toThrow ("Cannot convert object to primitive value");
    expect (() => JSBD.BigD ({[Symbol.toPrimitive]: function () {return this}}).toString ()).toThrow ("Cannot convert object to primitive value");

    expect (() => JSBD.BigD ({
        valueOf: function () {return {}},
        toString: function () {return {}}}).toString ()).toThrow ("Cannot convert object to primitive value");

    expect (() => JSBD.BigD ({
        valueOf: function () {return new Number (1)},
        toString: function () {return new Number (1)}}).toString ()).toThrow ("Cannot convert object to primitive value");

    expect (() => JSBD.BigD ({
        valueOf: function () {return this},
        toString: function () {return this}}).toString ()).toThrow ("Cannot convert object to primitive value");
}


//####################################################
//########## E NOTATION ##############################
//####################################################
{
    expect (JSBD.BigD ("   01e1     ").toString ()).toEqual ("10");
    expect (JSBD.BigD ("-01e1").toString ()).toEqual ("-10");
    expect (JSBD.BigD ("+01e1").toString ()).toEqual ("10");

    expect (JSBD.BigD ("0e+25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("-0e+25").toString ()).toEqual ("0");
    expect (JSBD.BigD (".0e+25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("0.e+25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("0e-25").toString ()).toEqual ("0");
    expect (JSBD.BigD (".0e-25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("0.e-25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("-0e+25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("-.0e+25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("-0.e+25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("-0e-25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("-.0e-25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("-0.e-25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("-0.0e+25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("-0.0e-25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("0.0e+25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("0.0e-25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("000.000e+25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("000.000e-25").toString ()).toEqual ("0");
    expect (JSBD.BigD ("000.000e+0").toString ()).toEqual ("0");
    expect (JSBD.BigD ("000.000e-0").toString ()).toEqual ("0");
    expect (JSBD.BigD ("000.000e+000").toString ()).toEqual ("0");
    expect (JSBD.BigD ("000.000e-000").toString ()).toEqual ("0");

    expect (JSBD.BigD ("01e+1").toString ()).toEqual ("10");
    expect (JSBD.BigD ("-01e+1").toString ()).toEqual ("-10");
    expect (JSBD.BigD ("0001e+1").toString ()).toEqual ("10");
    expect (JSBD.BigD ("-0001e+1").toString ()).toEqual ("-10");

    expect (JSBD.BigD ("+01e+1").toString ()).toEqual ("10");
    expect (JSBD.BigD ("+0001e+1").toString ()).toEqual ("10");

    expect (JSBD.BigD ("01e+01").toString ()).toEqual ("10");
    expect (JSBD.BigD ("-01e+01").toString ()).toEqual ("-10");
    expect (JSBD.BigD ("0001e+0001").toString ()).toEqual ("10");
    expect (JSBD.BigD ("-0001e+0001").toString ()).toEqual ("-10");
    expect (JSBD.BigD ("1.0e+001").toString ()).toEqual ("10");
    expect (JSBD.BigD ("-1.0e+001").toString ()).toEqual ("-10");
    expect (JSBD.BigD ("1.00e+0001").toString ()).toEqual ("10");
    expect (JSBD.BigD ("-1.00e+0001").toString ()).toEqual ("-10");

    expect (JSBD.BigD ("+01e+01").toString ()).toEqual ("10");
    expect (JSBD.BigD ("+0001e+0001").toString ()).toEqual ("10");
    expect (JSBD.BigD ("+1.0e+001").toString ()).toEqual ("10");
    expect (JSBD.BigD ("+1.00e+0001").toString ()).toEqual ("10");

    expect (JSBD.BigD ("1e+1").toString ()).toEqual ("10");
    expect (JSBD.BigD ("-1e+1").toString ()).toEqual ("-10");
    expect (JSBD.BigD ("1.e+1").toString ()).toEqual ("10");
    expect (JSBD.BigD ("-1.e+1").toString ()).toEqual ("-10");
    expect (JSBD.BigD ("1.0e+1").toString ()).toEqual ("10");
    expect (JSBD.BigD ("-1.0e+1").toString ()).toEqual ("-10");
    expect (JSBD.BigD ("1.00e+1").toString ()).toEqual ("10");
    expect (JSBD.BigD ("-1.00e+1").toString ()).toEqual ("-10");

    expect (JSBD.BigD ("+1e+1").toString ()).toEqual ("10");
    expect (JSBD.BigD ("+1.e+1").toString ()).toEqual ("10");
    expect (JSBD.BigD ("+1.0e+1").toString ()).toEqual ("10");
    expect (JSBD.BigD ("+1.00e+1").toString ()).toEqual ("10");


    expect (JSBD.BigD (".10e+1").toString ()).toEqual ("1");
    expect (JSBD.BigD ("-.10e+1").toString ()).toEqual ("-1");
    expect (JSBD.BigD (".1000e+1").toString ()).toEqual ("1");
    expect (JSBD.BigD ("-.1000e+1").toString ()).toEqual ("-1");
    expect (JSBD.BigD (".1e+1").toString ()).toEqual ("1");
    expect (JSBD.BigD ("-.1e+1").toString ()).toEqual ("-1");
    expect (JSBD.BigD ("1e+0").toString ()).toEqual ("1");
    expect (JSBD.BigD ("-1e+0").toString ()).toEqual ("-1");
    expect (JSBD.BigD ("1.e+0").toString ()).toEqual ("1");
    expect (JSBD.BigD ("-1.e+0").toString ()).toEqual ("-1");
    expect (JSBD.BigD (".1e+0").toString ()).toEqual ("0.1");
    expect (JSBD.BigD ("-.1e+0").toString ()).toEqual ("-0.1");
    expect (JSBD.BigD ("1e+000").toString ()).toEqual ("1");
    expect (JSBD.BigD ("-1e+000").toString ()).toEqual ("-1");

    expect (JSBD.BigD ("+.10e+1").toString ()).toEqual ("1");
    expect (JSBD.BigD ("+.1000e+1").toString ()).toEqual ("1");
    expect (JSBD.BigD ("+.1e+1").toString ()).toEqual ("1");
    expect (JSBD.BigD ("+1e+0").toString ()).toEqual ("1");
    expect (JSBD.BigD ("+1.e+0").toString ()).toEqual ("1");
    expect (JSBD.BigD ("+.1e+0").toString ()).toEqual ("0.1");
    expect (JSBD.BigD ("+1e+000").toString ()).toEqual ("1");

    expect (JSBD.BigD ("1e+2").toString ()).toEqual ("100");
    expect (JSBD.BigD ("-1e+2").toString ()).toEqual ("-100");
    expect (JSBD.BigD ("1.e+2").toString ()).toEqual ("100");
    expect (JSBD.BigD ("-1.e+2").toString ()).toEqual ("-100");
    expect (JSBD.BigD ("10e+1").toString ()).toEqual ("100");
    expect (JSBD.BigD ("-10e+1").toString ()).toEqual ("-100");

    expect (JSBD.BigD ("+1e+2").toString ()).toEqual ("100");
    expect (JSBD.BigD ("+1.e+2").toString ()).toEqual ("100");
    expect (JSBD.BigD ("+10e+1").toString ()).toEqual ("100");

    expect (JSBD.BigD (".1e+2").toString ()).toEqual ("10");
    expect (JSBD.BigD ("-.1e+2").toString ()).toEqual ("-10");

    expect (JSBD.BigD ("+.1e+2").toString ()).toEqual ("10");

    expect (JSBD.BigD ("+.1234e+2").toString ()).toEqual ("12.34");
    expect (JSBD.BigD ("+.1234e+4").toString ()).toEqual ("1234");
    expect (JSBD.BigD ("+.1234e+5").toString ()).toEqual ("12340");
    expect (JSBD.BigD ("+.1234e-2").toString ()).toEqual ("0.001234");
    expect (JSBD.BigD ("+.1234e-4").toString ()).toEqual ("0.00001234");
    expect (JSBD.BigD ("+.1234e-5").toString ()).toEqual ("0.000001234");

    expect (JSBD.BigD (".1234e+2").toString ()).toEqual ("12.34");
    expect (JSBD.BigD (".1234e+4").toString ()).toEqual ("1234");
    expect (JSBD.BigD (".1234e+5").toString ()).toEqual ("12340");
    expect (JSBD.BigD (".1234e-2").toString ()).toEqual ("0.001234");
    expect (JSBD.BigD (".1234e-4").toString ()).toEqual ("0.00001234");
    expect (JSBD.BigD (".1234e-5").toString ()).toEqual ("0.000001234");

    expect (JSBD.BigD ("-.1234e+2").toString ()).toEqual ("-12.34");
    expect (JSBD.BigD ("-.1234e+4").toString ()).toEqual ("-1234");
    expect (JSBD.BigD ("-.1234e+5").toString ()).toEqual ("-12340");
    expect (JSBD.BigD ("-.1234e-2").toString ()).toEqual ("-0.001234");
    expect (JSBD.BigD ("-.1234e-4").toString ()).toEqual ("-0.00001234");
    expect (JSBD.BigD ("-.1234e-5").toString ()).toEqual ("-0.000001234");

    expect (JSBD.BigD (".1234000e+0002").toString ()).toEqual ("12.34");
    expect (JSBD.BigD ("0.123400e+4").toString ()).toEqual ("1234");
    expect (JSBD.BigD ("0.1234e+005").toString ()).toEqual ("12340");
    expect (JSBD.BigD ("000.1234e-2").toString ()).toEqual ("0.001234");
    expect (JSBD.BigD (".12340e-4").toString ()).toEqual ("0.00001234");
    expect (JSBD.BigD (".1234e-00000005").toString ()).toEqual ("0.000001234");

    expect (JSBD.BigD ("-00.1234e+02").toString ()).toEqual ("-12.34");
    expect (JSBD.BigD ("-00.1234e+4").toString ()).toEqual ("-1234");
    expect (JSBD.BigD ("-0.1234e+00005").toString ()).toEqual ("-12340");
    expect (JSBD.BigD ("-.12340000e-2").toString ()).toEqual ("-0.001234");
    expect (JSBD.BigD ("-00.1234e-00004").toString ()).toEqual ("-0.00001234");
    expect (JSBD.BigD ("-.1234e-05").toString ()).toEqual ("-0.000001234");

    expect (JSBD.BigD (".1234000e0002").toString ()).toEqual ("12.34");
    expect (JSBD.BigD ("0.123400e4").toString ()).toEqual ("1234");
    expect (JSBD.BigD ("0.1234e005").toString ()).toEqual ("12340");

    expect (JSBD.BigD ("6.9e+1").toString ()).toEqual ("69");
    expect (JSBD.BigD ("6.9e+2").toString ()).toEqual ("690");
    expect (JSBD.BigD ("6.969e+1").toString ()).toEqual ("69.69");
    expect (JSBD.BigD ("6.969e+2").toString ()).toEqual ("696.9");
    expect (JSBD.BigD ("69.69e+1").toString ()).toEqual ("696.9");
    expect (JSBD.BigD ("69.69e+2").toString ()).toEqual ("6969");
    expect (JSBD.BigD ("69.69e+3").toString ()).toEqual ("69690");
    expect (JSBD.BigD ("69.69e+4").toString ()).toEqual ("696900");
    expect (JSBD.BigD ("69.69e+5").toString ()).toEqual ("6969000");

    expect (JSBD.BigD ("6.96969e+1").toString ()).toEqual ("69.6969");
    expect (JSBD.BigD ("6.96969e+2").toString ()).toEqual ("696.969");
    expect (JSBD.BigD ("6.96969e+3").toString ()).toEqual ("6969.69");
    expect (JSBD.BigD ("6.96969e+4").toString ()).toEqual ("69696.9");
    expect (JSBD.BigD ("6.96969e+5").toString ()).toEqual ("696969");
    expect (JSBD.BigD ("6.96969e+6").toString ()).toEqual ("6969690");
    expect (JSBD.BigD ("6.96969e+7").toString ()).toEqual ("69696900");

    expect (JSBD.BigD ("69.6969e+7").toString ()).toEqual ("696969000");
    expect (JSBD.BigD ("69.6969e+6").toString ()).toEqual ("69696900");
    expect (JSBD.BigD ("69.6969e+5").toString ()).toEqual ("6969690");
    expect (JSBD.BigD ("69.6969e+4").toString ()).toEqual ("696969");
    expect (JSBD.BigD ("69.6969e+3").toString ()).toEqual ("69696.9");
    expect (JSBD.BigD ("69.6969e+2").toString ()).toEqual ("6969.69");
    expect (JSBD.BigD ("69.6969e+1").toString ()).toEqual ("696.969");
    expect (JSBD.BigD ("69.6969e+0").toString ()).toEqual ("69.6969");
    expect (JSBD.BigD ("69.6969e-0").toString ()).toEqual ("69.6969");
    expect (JSBD.BigD ("69.6969e-1").toString ()).toEqual ("6.96969");
    expect (JSBD.BigD ("69.6969e-2").toString ()).toEqual ("0.696969");
    expect (JSBD.BigD ("69.6969e-3").toString ()).toEqual ("0.0696969");
    expect (JSBD.BigD ("69.6969e-4").toString ()).toEqual ("0.00696969");
    expect (JSBD.BigD ("69.6969e-5").toString ()).toEqual ("0.000696969");
    expect (JSBD.BigD ("69.6969e-6").toString ()).toEqual ("0.0000696969");
    expect (JSBD.BigD ("69.6969e-7").toString ()).toEqual ("0.00000696969");

    expect (JSBD.BigD ("696.969e-8").toString ()).toEqual ("0.00000696969");
    expect (JSBD.BigD ("696.969e-7").toString ()).toEqual ("0.0000696969");
    expect (JSBD.BigD ("696.969e-6").toString ()).toEqual ("0.000696969");
    expect (JSBD.BigD ("696.969e-5").toString ()).toEqual ("0.00696969");
    expect (JSBD.BigD ("696.969e-4").toString ()).toEqual ("0.0696969");
    expect (JSBD.BigD ("696.969e-3").toString ()).toEqual ("0.696969");
    expect (JSBD.BigD ("696.969e-2").toString ()).toEqual ("6.96969");
    expect (JSBD.BigD ("696.969e-1").toString ()).toEqual ("69.6969");
    expect (JSBD.BigD ("696.969e-0").toString ()).toEqual ("696.969");
    expect (JSBD.BigD ("696.969e+0").toString ()).toEqual ("696.969");
    expect (JSBD.BigD ("696.969e+1").toString ()).toEqual ("6969.69");
    expect (JSBD.BigD ("696.969e+2").toString ()).toEqual ("69696.9");
    expect (JSBD.BigD ("696.969e+3").toString ()).toEqual ("696969");
    expect (JSBD.BigD ("696.969e+4").toString ()).toEqual ("6969690");
    expect (JSBD.BigD ("696.969e+5").toString ()).toEqual ("69696900");
    expect (JSBD.BigD ("696.969e+6").toString ()).toEqual ("696969000");
    expect (JSBD.BigD ("696.969e+7").toString ()).toEqual ("6969690000");

    expect (JSBD.BigD ("-6.9e+1").toString ()).toEqual ("-69");
    expect (JSBD.BigD ("-6.9e+2").toString ()).toEqual ("-690");
    expect (JSBD.BigD ("-6.969e+1").toString ()).toEqual ("-69.69");
    expect (JSBD.BigD ("-6.969e+2").toString ()).toEqual ("-696.9");
    expect (JSBD.BigD ("-69.69e+1").toString ()).toEqual ("-696.9");
    expect (JSBD.BigD ("-69.69e+2").toString ()).toEqual ("-6969");
    expect (JSBD.BigD ("-69.69e+3").toString ()).toEqual ("-69690");
    expect (JSBD.BigD ("-69.69e+4").toString ()).toEqual ("-696900");
    expect (JSBD.BigD ("-69.69e+5").toString ()).toEqual ("-6969000");

    expect (JSBD.BigD ("-6.96969e+1").toString ()).toEqual ("-69.6969");
    expect (JSBD.BigD ("-6.96969e+2").toString ()).toEqual ("-696.969");
    expect (JSBD.BigD ("-6.96969e+3").toString ()).toEqual ("-6969.69");
    expect (JSBD.BigD ("-6.96969e+4").toString ()).toEqual ("-69696.9");
    expect (JSBD.BigD ("-6.96969e+5").toString ()).toEqual ("-696969");
    expect (JSBD.BigD ("-6.96969e+6").toString ()).toEqual ("-6969690");
    expect (JSBD.BigD ("-6.96969e+7").toString ()).toEqual ("-69696900");

    expect (JSBD.BigD ("-69.6969e+7").toString ()).toEqual ("-696969000");
    expect (JSBD.BigD ("-69.6969e+6").toString ()).toEqual ("-69696900");
    expect (JSBD.BigD ("-69.6969e+5").toString ()).toEqual ("-6969690");
    expect (JSBD.BigD ("-69.6969e+4").toString ()).toEqual ("-696969");
    expect (JSBD.BigD ("-69.6969e+3").toString ()).toEqual ("-69696.9");
    expect (JSBD.BigD ("-69.6969e+2").toString ()).toEqual ("-6969.69");
    expect (JSBD.BigD ("-69.6969e+1").toString ()).toEqual ("-696.969");
    expect (JSBD.BigD ("-69.6969e+0").toString ()).toEqual ("-69.6969");
    expect (JSBD.BigD ("-69.6969e-0").toString ()).toEqual ("-69.6969");
    expect (JSBD.BigD ("-69.6969e-1").toString ()).toEqual ("-6.96969");
    expect (JSBD.BigD ("-69.6969e-2").toString ()).toEqual ("-0.696969");
    expect (JSBD.BigD ("-69.6969e-3").toString ()).toEqual ("-0.0696969");
    expect (JSBD.BigD ("-69.6969e-4").toString ()).toEqual ("-0.00696969");
    expect (JSBD.BigD ("-69.6969e-5").toString ()).toEqual ("-0.000696969");
    expect (JSBD.BigD ("-69.6969e-6").toString ()).toEqual ("-0.0000696969");
    expect (JSBD.BigD ("-69.6969e-7").toString ()).toEqual ("-0.00000696969");

    expect (JSBD.BigD ("-696.969e-8").toString ()).toEqual ("-0.00000696969");
    expect (JSBD.BigD ("-696.969e-7").toString ()).toEqual ("-0.0000696969");
    expect (JSBD.BigD ("-696.969e-6").toString ()).toEqual ("-0.000696969");
    expect (JSBD.BigD ("-696.969e-5").toString ()).toEqual ("-0.00696969");
    expect (JSBD.BigD ("-696.969e-4").toString ()).toEqual ("-0.0696969");
    expect (JSBD.BigD ("-696.969e-3").toString ()).toEqual ("-0.696969");
    expect (JSBD.BigD ("-696.969e-2").toString ()).toEqual ("-6.96969");
    expect (JSBD.BigD ("-696.969e-1").toString ()).toEqual ("-69.6969");
    expect (JSBD.BigD ("-696.969e-0").toString ()).toEqual ("-696.969");
    expect (JSBD.BigD ("-696.969e+0").toString ()).toEqual ("-696.969");
    expect (JSBD.BigD ("-696.969e+1").toString ()).toEqual ("-6969.69");
    expect (JSBD.BigD ("-696.969e+2").toString ()).toEqual ("-69696.9");
    expect (JSBD.BigD ("-696.969e+3").toString ()).toEqual ("-696969");
    expect (JSBD.BigD ("-696.969e+4").toString ()).toEqual ("-6969690");
    expect (JSBD.BigD ("-696.969e+5").toString ()).toEqual ("-69696900");
    expect (JSBD.BigD ("-696.969e+6").toString ()).toEqual ("-696969000");
    expect (JSBD.BigD ("-696.969e+7").toString ()).toEqual ("-6969690000");
}

//####################################################
//##### DECIMAL LITERALS (as in base 10 numbers) #####
//####################################################
{
    expect (JSBD.BigD (0).toString ()).toEqual ("0");
    expect (JSBD.BigD (-0).toString ()).toEqual ("0");
    expect (JSBD.BigD (1).toString ()).toEqual ("1");
    expect (JSBD.BigD (2).toString ()).toEqual ("2");
    expect (JSBD.BigD (10).toString ()).toEqual ("10");
    expect (JSBD.BigD (200).toString ()).toEqual ("200");
    expect (JSBD.BigD (1000).toString ()).toEqual ("1000");
    expect (JSBD.BigD (10000).toString ()).toEqual ("10000");
    expect (JSBD.BigD (100000).toString ()).toEqual ("100000");
    expect (JSBD.BigD (1000000).toString ()).toEqual ("1000000");
    expect (JSBD.BigD (10000000).toString ()).toEqual ("10000000");
    expect (JSBD.BigD (100000000).toString ()).toEqual ("100000000");

    expect (JSBD.BigD (1000000000000000).toString ()).toEqual ("1000000000000000");
    expect (JSBD.BigD (10000000000000000).toString ()).toEqual ("10000000000000000");
    expect (JSBD.BigD (100000000000000000).toString ()).toEqual ("100000000000000000");
    //see 1
    expect (JSBD.BigD (100000000000000000000000).toString ()).toEqual ("99999999999999991611392");

    expect (JSBD.BigD (1n).toString ()).toEqual ("1");
    expect (JSBD.BigD (2n).toString ()).toEqual ("2");
    expect (JSBD.BigD (10n).toString ()).toEqual ("10");
    expect (JSBD.BigD (200n).toString ()).toEqual ("200");
    expect (JSBD.BigD (1000n).toString ()).toEqual ("1000");
    expect (JSBD.BigD (10000n).toString ()).toEqual ("10000");
    expect (JSBD.BigD (100000n).toString ()).toEqual ("100000");
    expect (JSBD.BigD (1000000n).toString ()).toEqual ("1000000");
    expect (JSBD.BigD (10000000n).toString ()).toEqual ("10000000");
    expect (JSBD.BigD (100000000n).toString ()).toEqual ("100000000");

    expect (JSBD.BigD (1000000000000000n).toString ()).toEqual ("1000000000000000");
    expect (JSBD.BigD (10000000000000000n).toString ()).toEqual ("10000000000000000");
    expect (JSBD.BigD (100000000000000000n).toString ()).toEqual ("100000000000000000");
    expect (JSBD.BigD (100000000000000000000000n).toString ()).toEqual ("100000000000000000000000");


    expect (JSBD.BigD (0.1).toString ()).toEqual ("0.1");
    expect (JSBD.BigD (0.2).toString ()).toEqual ("0.2");
    expect (JSBD.BigD (0.3).toString ()).toEqual ("0.3");
    expect (JSBD.BigD (0.4).toString ()).toEqual ("0.4");
    expect (JSBD.BigD (0.5).toString ()).toEqual ("0.5");
    expect (JSBD.BigD (0.6).toString ()).toEqual ("0.6");
    expect (JSBD.BigD (0.7).toString ()).toEqual ("0.7");
    expect (JSBD.BigD (0.8).toString ()).toEqual ("0.8");
    expect (JSBD.BigD (0.9).toString ()).toEqual ("0.9");

    expect (JSBD.BigD (0.1 + 0.2).toString ()).toEqual ("0.30000000000000004");
    expect (JSBD.BigD (0.2 + 0.2).toString ()).toEqual ("0.4");
}


//####################################################
//########## STRING DECIMAL LITERALS #################
//####################################################
{
    expect (JSBD.BigD ("-0").toString ()).toEqual ("0");
    expect (JSBD.BigD ("0").toString ()).toEqual ("0");
    expect (JSBD.BigD ("1").toString ()).toEqual ("1");
    expect (JSBD.BigD ("2").toString ()).toEqual ("2");
    expect (JSBD.BigD ("10").toString ()).toEqual ("10");
    expect (JSBD.BigD ("200").toString ()).toEqual ("200");

    expect (JSBD.BigD ("0.69").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("0.6969").toString ()).toEqual ("0.6969");
    expect (JSBD.BigD ("0.696").toString ()).toEqual ("0.696");
    expect (JSBD.BigD (".6969").toString ()).toEqual ("0.6969");
    expect (JSBD.BigD (".696").toString ()).toEqual ("0.696");
    expect (JSBD.BigD (".69").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("69").toString ()).toEqual ("69");
    expect (JSBD.BigD ("69.").toString ()).toEqual ("69");
    expect (JSBD.BigD ("696.").toString ()).toEqual ("696");
    expect (JSBD.BigD ("69.6").toString ()).toEqual ("69.6");
    expect (JSBD.BigD ("69.69").toString ()).toEqual ("69.69");
    expect (JSBD.BigD ("69.696").toString ()).toEqual ("69.696");
    expect (JSBD.BigD ("696.6").toString ()).toEqual ("696.6");
    expect (JSBD.BigD ("696.69").toString ()).toEqual ("696.69");
    expect (JSBD.BigD ("696.696").toString ()).toEqual ("696.696");

    expect (JSBD.BigD ("0000.690000").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("00.696900").toString ()).toEqual ("0.6969");
    expect (JSBD.BigD ("00.69600").toString ()).toEqual ("0.696");
    expect (JSBD.BigD (".6969000").toString ()).toEqual ("0.6969");
    expect (JSBD.BigD (".696000").toString ()).toEqual ("0.696");
    expect (JSBD.BigD (".690").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("0.690").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("0000.690").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("0069").toString ()).toEqual ("69");
    expect (JSBD.BigD ("00069.").toString ()).toEqual ("69");
    expect (JSBD.BigD ("00696.").toString ()).toEqual ("696");

    expect (JSBD.BigD ("-0000.690000").toString ()).toEqual ("-0.69");
    expect (JSBD.BigD ("-00.696900").toString ()).toEqual ("-0.6969");
    expect (JSBD.BigD ("-00.69600").toString ()).toEqual ("-0.696");
    expect (JSBD.BigD ("-.6969000").toString ()).toEqual ("-0.6969");
    expect (JSBD.BigD ("-.696000").toString ()).toEqual ("-0.696");
    expect (JSBD.BigD ("-.690").toString ()).toEqual ("-0.69");
    expect (JSBD.BigD ("-0.690").toString ()).toEqual ("-0.69");
    expect (JSBD.BigD ("-0000.690").toString ()).toEqual ("-0.69");
    expect (JSBD.BigD ("-0069").toString ()).toEqual ("-69");
    expect (JSBD.BigD ("-00069.").toString ()).toEqual ("-69");
    expect (JSBD.BigD ("-00696.").toString ()).toEqual ("-696");

    expect (JSBD.BigD ("+0000.690000").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("+00.696900").toString ()).toEqual ("0.6969");
    expect (JSBD.BigD ("+00.69600").toString ()).toEqual ("0.696");
    expect (JSBD.BigD ("+.6969000").toString ()).toEqual ("0.6969");
    expect (JSBD.BigD ("+.696000").toString ()).toEqual ("0.696");
    expect (JSBD.BigD ("+.690").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("+0.690").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("+0000.690").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("+0069").toString ()).toEqual ("69");
    expect (JSBD.BigD ("+00069.").toString ()).toEqual ("69");
    expect (JSBD.BigD ("+00696.").toString ()).toEqual ("696");
    

    expect (JSBD.BigD ("00069").toString ()).toEqual ("69");
    expect (JSBD.BigD ("0069.0000").toString ()).toEqual ("69");
    expect (JSBD.BigD ("0000696.").toString ()).toEqual ("696");
    expect (JSBD.BigD ("0069.600").toString ()).toEqual ("69.6");
    expect (JSBD.BigD ("069.69000").toString ()).toEqual ("69.69");
    expect (JSBD.BigD ("00069.6960").toString ()).toEqual ("69.696");
    expect (JSBD.BigD ("00696.600").toString ()).toEqual ("696.6");
    expect (JSBD.BigD ("0696.690").toString ()).toEqual ("696.69");
    expect (JSBD.BigD ("00696.69600").toString ()).toEqual ("696.696");

    expect (JSBD.BigD ("  1  ").toString ()).toEqual ("1");
    expect (JSBD.BigD ("  2").toString ()).toEqual ("2");
    expect (JSBD.BigD (" 10 ").toString ()).toEqual ("10");
    expect (JSBD.BigD ("200   ").toString ()).toEqual ("200");

    expect (JSBD.BigD ("0.69 ").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("  0.6969").toString ()).toEqual ("0.6969");
    expect (JSBD.BigD ("0.696  ").toString ()).toEqual ("0.696");
    expect (JSBD.BigD (" .6969 ").toString ()).toEqual ("0.6969");
    expect (JSBD.BigD ("  .696").toString ()).toEqual ("0.696");
    expect (JSBD.BigD (".69  ").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("  69    ").toString ()).toEqual ("69");
    expect (JSBD.BigD (" 69.").toString ()).toEqual ("69");
    expect (JSBD.BigD ("696. ").toString ()).toEqual ("696");
    expect (JSBD.BigD ("   69.6 ").toString ()).toEqual ("69.6");
    expect (JSBD.BigD ("69.69 ").toString ()).toEqual ("69.69");
    expect (JSBD.BigD ("  69.696").toString ()).toEqual ("69.696");
    expect (JSBD.BigD (" 696.6  ").toString ()).toEqual ("696.6");
    expect (JSBD.BigD ("696.69  ").toString ()).toEqual ("696.69");
    expect (JSBD.BigD ("   696.696  ").toString ()).toEqual ("696.696");

    expect (JSBD.BigD ("  0000.690000  ").toString ()).toEqual ("0.69");
    expect (JSBD.BigD (" 00.696900   ").toString ()).toEqual ("0.6969");
    expect (JSBD.BigD ("00.69600   ").toString ()).toEqual ("0.696");
    expect (JSBD.BigD ("   .6969000   ").toString ()).toEqual ("0.6969");
    expect (JSBD.BigD ("    .696000").toString ()).toEqual ("0.696");
    expect (JSBD.BigD (" .690  ").toString ()).toEqual ("0.69");
    expect (JSBD.BigD (" 0.690  ").toString ()).toEqual ("0.69");
    expect (JSBD.BigD ("   0000.690").toString ()).toEqual ("0.69");
    expect (JSBD.BigD (" 0069 ").toString ()).toEqual ("69");
    expect (JSBD.BigD ("  00069.  ").toString ()).toEqual ("69");
    expect (JSBD.BigD (" 00696. ").toString ()).toEqual ("696");

    expect (JSBD.BigD ("  00069  ").toString ()).toEqual ("69");
    expect (JSBD.BigD ("  0069.0000 ").toString ()).toEqual ("69");
    expect (JSBD.BigD (" 0000696.  ").toString ()).toEqual ("696");
    expect (JSBD.BigD (" 0069.600").toString ()).toEqual ("69.6");
    expect (JSBD.BigD ("  069.69000  ").toString ()).toEqual ("69.69");
    expect (JSBD.BigD ("    00069.6960 ").toString ()).toEqual ("69.696");
    expect (JSBD.BigD (" 00696.600 ").toString ()).toEqual ("696.6");
    expect (JSBD.BigD ("  0696.690 ").toString ()).toEqual ("696.69");
    expect (JSBD.BigD ("  00696.69600").toString ()).toEqual ("696.696");

    expect (JSBD.BigD ("\n  00069  \n").toString ()).toEqual ("69");
    expect (JSBD.BigD (" \r 0069.0000 ").toString ()).toEqual ("69");
    expect (JSBD.BigD ("\n\r 0000696.  ").toString ()).toEqual ("696");
    expect (JSBD.BigD (" \n0069.600").toString ()).toEqual ("69.6");
    expect (JSBD.BigD ("  069.69000 \n ").toString ()).toEqual ("69.69");
    expect (JSBD.BigD ("    00069.6960\r ").toString ()).toEqual ("69.696");
    expect (JSBD.BigD (" \n00696.600 ").toString ()).toEqual ("696.6");
    expect (JSBD.BigD ("\n\r  0696.690 ").toString ()).toEqual ("696.69");
    expect (JSBD.BigD (" \n 00696.69600").toString ()).toEqual ("696.696");


    expect (JSBD.BigD ("0.0609 ").toString ()).toEqual ("0.0609");
    expect (JSBD.BigD ("  0.60906090").toString ()).toEqual ("0.6090609");
    expect (JSBD.BigD ("0.060906  ").toString ()).toEqual ("0.060906");
    expect (JSBD.BigD (" .60906090 ").toString ()).toEqual ("0.6090609");
    expect (JSBD.BigD ("  .060906").toString ()).toEqual ("0.060906");
    expect (JSBD.BigD (".06090  ").toString ()).toEqual ("0.0609");
    expect (JSBD.BigD ("  06090    ").toString ()).toEqual ("6090");
    expect (JSBD.BigD (" 06090.").toString ()).toEqual ("6090");
    expect (JSBD.BigD ("06906. ").toString ()).toEqual ("6906");
    expect (JSBD.BigD ("   0690.060 ").toString ()).toEqual ("690.06");
    expect (JSBD.BigD ("6090.06090 ").toString ()).toEqual ("6090.0609");
    expect (JSBD.BigD ("  0609.60906").toString ()).toEqual ("609.60906");
    expect (JSBD.BigD (" 060906.60  ").toString ()).toEqual ("60906.6");
    expect (JSBD.BigD ("60906.06090  ").toString ()).toEqual ("60906.0609");
    expect (JSBD.BigD ("   060960.0609060  ").toString ()).toEqual ("60960.060906");

    expect (JSBD.BigD ("  0000.6090000  ").toString ()).toEqual ("0.609");
    expect (JSBD.BigD (" 00.0609060900   ").toString ()).toEqual ("0.06090609");
    expect (JSBD.BigD ("00.609600   ").toString ()).toEqual ("0.6096");
    expect (JSBD.BigD ("   .6090609000   ").toString ()).toEqual ("0.6090609");
    expect (JSBD.BigD ("    .060906000").toString ()).toEqual ("0.060906");
    expect (JSBD.BigD (" .6090  ").toString ()).toEqual ("0.609");
    expect (JSBD.BigD (" 0.060900  ").toString ()).toEqual ("0.0609");
    expect (JSBD.BigD ("   0000.060900").toString ()).toEqual ("0.0609");
    expect (JSBD.BigD (" 00609 ").toString ()).toEqual ("609");
    expect (JSBD.BigD ("  000609.  ").toString ()).toEqual ("609");
    expect (JSBD.BigD (" 0060906. ").toString ()).toEqual ("60906");

    expect (JSBD.BigD ("  000609  ").toString ()).toEqual ("609");
    expect (JSBD.BigD ("  00609.0000 ").toString ()).toEqual ("609");
    expect (JSBD.BigD (" 000060906.  ").toString ()).toEqual ("60906");
    expect (JSBD.BigD (" 00609.0600").toString ()).toEqual ("609.06");
    expect (JSBD.BigD ("  06090.609000  ").toString ()).toEqual ("6090.609");
    expect (JSBD.BigD ("    000609.609060 ").toString ()).toEqual ("609.60906");
    expect (JSBD.BigD (" 0060906.600 ").toString ()).toEqual ("60906.6");
    expect (JSBD.BigD ("  060906.6090 ").toString ()).toEqual ("60906.609");
    expect (JSBD.BigD ("  0060906.06090600").toString ()).toEqual ("60906.060906");

    expect (JSBD.BigD ("1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000").toString ())
    .toEqual ("1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")

    expect (JSBD.BigD ("0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001").toString ())
    .toEqual ("0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001");

    expect (JSBD.BigD ("-1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000").toString ())
    .toEqual ("-1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")

    expect (JSBD.BigD ("-0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001").toString ())
    .toEqual ("-0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001");
}


//####################################################
//########## BINARY LITERALS #########################
//####################################################
{
    expect (JSBD.BigD (0b0).toString ()).toEqual ("0");
    expect (JSBD.BigD (0b1).toString ()).toEqual ("1");
    expect (JSBD.BigD (0b11).toString ()).toEqual ("3");
    expect (JSBD.BigD (0b101).toString ()).toEqual ("5");
    expect (JSBD.BigD (0b111).toString ()).toEqual ("7");
    expect (JSBD.BigD (0b1000101).toString ()).toEqual ("69");
    expect (JSBD.BigD (0b110100100).toString ()).toEqual ("420");
    expect (JSBD.BigD (0b10000111100101100).toString ()).toEqual ("69420");
    expect (JSBD.BigD (0b10110111110000010100101011001011110000101010011111000010000100011001100001010101100).toString ()).toEqual ("6942069420694206664409088");

    expect (JSBD.BigD (0b0n).toString ()).toEqual ("0");
    expect (JSBD.BigD (0b1n).toString ()).toEqual ("1");
    expect (JSBD.BigD (0b11n).toString ()).toEqual ("3");
    expect (JSBD.BigD (0b101n).toString ()).toEqual ("5");
    expect (JSBD.BigD (0b111n).toString ()).toEqual ("7");
    expect (JSBD.BigD (0b1000101n).toString ()).toEqual ("69");
    expect (JSBD.BigD (0b110100100n).toString ()).toEqual ("420");
    expect (JSBD.BigD (0b10000111100101100n).toString ()).toEqual ("69420");
    expect (JSBD.BigD (0b10110111110000010100101011001011110000101010011111000010000100011001100001010101100n).toString ()).toEqual ("6942069420694206942069420");

    expect (JSBD.BigD ("0b0").toString ()).toEqual ("0");
    expect (JSBD.BigD ("0b1").toString ()).toEqual ("1");
    expect (JSBD.BigD ("0b11").toString ()).toEqual ("3");
    expect (JSBD.BigD ("0b101").toString ()).toEqual ("5");
    expect (JSBD.BigD ("0b111").toString ()).toEqual ("7");
    expect (JSBD.BigD ("0b1000101").toString ()).toEqual ("69");
    expect (JSBD.BigD ("0b110100100").toString ()).toEqual ("420");
    expect (JSBD.BigD ("0b10000111100101100").toString ()).toEqual ("69420");
    expect (JSBD.BigD ("0b10110111110000010100101011001011110000101010011111000010000100011001100001010101100").toString ()).toEqual ("6942069420694206942069420");
}


//####################################################
//########## HEX LITERALS ############################
//####################################################
{
    expect (JSBD.BigD ("0x0").toString ()).toEqual ("0");
    expect (JSBD.BigD ("0xa").toString ()).toEqual ("10");
    expect (JSBD.BigD ("0xf").toString ()).toEqual ("15");
    expect (JSBD.BigD ("0x45").toString ()).toEqual ("69");
    expect (JSBD.BigD ("0xff").toString ()).toEqual ("255");
    expect (JSBD.BigD ("0x1A4").toString ()).toEqual ("420");
    expect (JSBD.BigD ("0xA455").toString ()).toEqual ("42069");
}


//####################################################
//########## STRING Vs NUMBER COMPARISONS ############
//####################################################
{
    //see 1
    expect (JSBD.BigD (1e+25).toString ()).toEqual ("10000000000000000905969664");
    expect (JSBD.BigD (-1e+25).toString ()).toEqual ("-10000000000000000905969664");
    //see 2
    expect (JSBD.BigD (1e-25).toString ()).toEqual ("0.0000000000000000000000001");
    expect (JSBD.BigD (-1e-25).toString ()).toEqual ("-0.0000000000000000000000001");

    //see 1
    expect (JSBD.BigD ("1e+25").toString ()).toEqual ("10000000000000000000000000");
    expect (JSBD.BigD ("-1e+25").toString ()).toEqual ("-10000000000000000000000000");
    //see 2
    expect (JSBD.BigD ("-1e-25").toString ()).toEqual ("-0.0000000000000000000000001");
    expect (JSBD.BigD ("1e-25").toString ()).toEqual ("0.0000000000000000000000001");

    expect (JSBD.BigD (0.264758316253843273483).toString ()).toEqual ("0.2647583162538433");
    expect (JSBD.BigD ("0.264758316253843273483").toString ()).toEqual ("0.264758316253843273483");

    expect (JSBD.BigD (9007199254740993n).toString ()).toEqual ("9007199254740993");
    expect (JSBD.BigD (9007199254740993).toString ()).toEqual ("9007199254740992");
    expect (JSBD.BigD ("9007199254740993").toString ()).toEqual ("9007199254740993");
}

console.log ("Test passed, winning");