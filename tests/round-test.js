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

//#############################################################################
//#################### ROUNDING MODE ERRORS & MISC ############################
//#############################################################################
{
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "hurrDurr"})).toThrow ("roundingMode hurrDurr is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "hAlFeXpAnD"})).toThrow ("roundingMode hAlFeXpAnD is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: false})).toThrow ("roundingMode false is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: true})).toThrow ("roundingMode true is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: 0})).toThrow ("roundingMode 0 is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: 0n})).toThrow ("roundingMode 0 is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: 1})).toThrow ("roundingMode 1 is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: 1n})).toThrow ("roundingMode 1 is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: null})).toThrow ("roundingMode null is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: NaN})).toThrow ("roundingMode NaN is out of range");
    
    //Unsure if message is technically correct but functionality is so...
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: Symbol.toPrimitive})).toThrow ("Cannot convert a Symbol value to a string");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: function (){}})).toThrow ("roundingMode function (){} is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode:  () => {}})).toThrow ("roundingMode () => {} is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: {}})).toThrow ("roundingMode [object Object] is out of range");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: undefined}).toString ()).toEqual ("69.6969");

    expect (JSBD.round (JSBD.BigD ("-69.1016"), 
    {
        roundingMode: {
            [Symbol.toPrimitive]: function (){return "floor";}
        },
        maximumFractionDigits: 3
    }).toString ()).toEqual ("-69.102");
}


//#############################################################################
//#################### ROUNDING INCREMENT ERRORS & MISC #######################
//#############################################################################
{
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 0})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 3})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 4})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 7})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 9})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 12})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 22})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 30})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 99})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 111})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 169})).toThrow ("roundingIncrement value is out of range");

    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: false})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 0})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 0n})).toThrow ("Cannot convert a BigInt value to a number");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 1n})).toThrow ("Cannot convert a BigInt value to a number");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: null})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: NaN})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: Symbol.toPrimitive})).toThrow ("Cannot convert a Symbol value to a number");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: function (){}})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: () => {}})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: {}})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: Infinity})).toThrow ("roundingIncrement value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: -Infinity})).toThrow ("roundingIncrement value is out of range");

    expect (() => {
        JSBD.round (JSBD.BigD ("69.6969"), 
        {
            roundingIncrement: {
                [Symbol.toPrimitive]: function (){return 1n;}
            }
        })
    }).toThrow ("Cannot convert a BigInt value to a number");


    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: true}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: undefined}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 20}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 25}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 50}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 100}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 200}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 250}).toString ()).toEqual ("75");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 500}).toString ()).toEqual ("50");    
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 1000}).toString ()).toEqual ("100"); 
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 2000}).toString ()).toEqual ("0"); 
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 2500}).toString ()).toEqual ("0"); 
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: 5000}).toString ()).toEqual ("0"); 

    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "1"}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "2"}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "5"}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "10"}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "20"}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "25"}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "50"}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "100"}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "200"}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "250"}).toString ()).toEqual ("75");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "500"}).toString ()).toEqual ("50");    
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "1000"}).toString ()).toEqual ("100"); 
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "2000"}).toString ()).toEqual ("0"); 
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "2500"}).toString ()).toEqual ("0"); 
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingIncrement: "5000"}).toString ()).toEqual ("0"); 

    expect (JSBD.round (JSBD.BigD ("69.6"), 
    {
        roundingIncrement: {
            [Symbol.toPrimitive]: function (){return 1000;}
        }
    }).toString ()).toEqual ("100");

    expect (JSBD.round (JSBD.BigD ("69.6"), 
    {
        roundingIncrement: {
            [Symbol.toPrimitive]: function (){return "1000";}
        }
    }).toString ()).toEqual ("100");
}


//#############################################################################
//#################### MAX FRACTION DIGITS ERRORS & MISC ######################
//#############################################################################
{
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: -1})).toThrow ("maxFractionDigits value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: NaN})).toThrow ("maxFractionDigits value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: Infinity})).toThrow ("maxFractionDigits value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: -Infinity})).toThrow ("maxFractionDigits value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 0n})).toThrow ("Cannot convert a BigInt value to a number");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 1n})).toThrow ("Cannot convert a BigInt value to a number");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: Symbol.toPrimitive})).toThrow ("Cannot convert a Symbol value to a number");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: function (){}})).toThrow ("maxFractionDigits value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: ()=>{}})).toThrow ("maxFractionDigits value is out of range");
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: {}})).toThrow ("maxFractionDigits value is out of range");

    expect (() => {
        JSBD.round (JSBD.BigD ("69.6969"), 
        {
            maximumFractionDigits: {
                [Symbol.toPrimitive]: function (){return 1n;}
            }
        })
    }).toThrow ("Cannot convert a BigInt value to a number");


    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: true}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: null}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: undefined}).toString ()).toEqual ("69.6969");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: "0"}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: "1"}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: "2"}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: "3"}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: "4"}).toString ()).toEqual ("69.6969");

    expect (JSBD.round (JSBD.BigD ("69.6969"), 
    {
        maximumFractionDigits: {
            [Symbol.toPrimitive]: function (){return 0;}
        }
    }).toString ()).toEqual ("70");

    expect (JSBD.round (JSBD.BigD ("69.6969"), 
    {
        maximumFractionDigits: {
            [Symbol.toPrimitive]: function (){return "1";}
        }
    }).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6969"), 
    {
        maximumFractionDigits: {
            [Symbol.toPrimitive]: function (){return 2;}
        }
    }).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6969"), 
    {
        maximumFractionDigits: {
            [Symbol.toPrimitive]: function (){return "3";}
        }
    }).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6969"), 
    {
        maximumFractionDigits: {
            [Symbol.toPrimitive]: function (){return 4;}
        }
    }).toString ()).toEqual ("69.6969");
}

//#############################################################################
//#################### MAX FRACTION DIGITS OVERFLOW ###########################
//#############################################################################
{
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 1000, maximumFractionDigits: 6}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 2000, maximumFractionDigits: 6}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 2000, maximumFractionDigits: 7}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 2000, maximumFractionDigits: 8}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 1000, maximumFractionDigits: 7}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 20, maximumFractionDigits: 5}).toString ()).toEqual ("69.697");
}

//#############################################################################
//#################### EXTRA ERRORS ###########################################
//#############################################################################
{
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "hurrDurr", roundingIncrement: 0})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "hAlFeXpAnD", roundingIncrement: 3})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: false, roundingIncrement: 4})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: true, roundingIncrement: 7})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: 0, roundingIncrement: 9})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: 0n, roundingIncrement: 12})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: 1, roundingIncrement: 22})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: 1n, roundingIncrement: 30})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: null, roundingIncrement: 99})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: NaN, roundingIncrement: 111})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: Symbol.toPrimitive, roundingIncrement: 169})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: function (){}, roundingIncrement: 99})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode:  () => {}, roundingIncrement: 111})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: {}, roundingIncrement: 169})).toThrow ();

    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "hurrDurr", maximumFractionDigits: -1})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "hAlFeXpAnD", maximumFractionDigits: "number"})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: false, maximumFractionDigits: NaN})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: true, maximumFractionDigits: 7n})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: 0, maximumFractionDigits: -9})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: 0n, maximumFractionDigits: Infinity})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: 1, maximumFractionDigits: 22})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: 1n, maximumFractionDigits: "wow"})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: null, maximumFractionDigits: 420})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: NaN, maximumFractionDigits: "lackOf420"})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: Symbol.toPrimitive, maximumFractionDigits: "69IsImmature"})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: function (){}, maximumFractionDigits: 69})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode:  () => {}, maximumFractionDigits: 69})).toThrow ();
    expect (() => JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: {}, maximumFractionDigits: 69})).toThrow ();
}



//#############################################################################
//#################### HALF EXPAND ############################################
//#############################################################################
{
    expect (JSBD.round (JSBD.BigD ("69.1230000005"), {roundingMode: "halfExpand", maximumFractionDigits: 3}).toString ()).toEqual ("69.123");

    //Increment 1
    expect (JSBD.round (JSBD.BigD ("69.6969")).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand"}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 4}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfExpand", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfExpand", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfExpand", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfExpand", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfExpand", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "halfExpand", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.64"), {roundingMode: "halfExpand", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfExpand", maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfExpand", maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "halfExpand", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 69}).toString ()).toEqual ("69.6969");


    //Increment 2
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", roundingIncrement: 2}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.699"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.697"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.698");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.694");
    expect (JSBD.round (JSBD.BigD ("69.691"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.692");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.68"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.67"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.66"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.9"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.3"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.1"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.2");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("66");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("64");
    expect (JSBD.round (JSBD.BigD ("61"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("62");

    expect (JSBD.round (JSBD.BigD ("1"), {roundingMode: "halfExpand", roundingIncrement: 2}).toString ()).toEqual ("2");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("69.6969");


    //Increment 5
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", roundingIncrement: 5}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6925"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6924"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6759"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6749"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.625"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.62499"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.7501"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7499"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.2499"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.5000"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.4999"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("67.5000"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("67.4999"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("69.6969");


    //Increment 10
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfExpand", roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfExpand", roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfExpand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.69651"), {roundingMode: "halfExpand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfExpand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6950"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6951"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6500"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6501"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6499"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5000"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.5000"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.4999"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("64.9999"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("69.6969");



    //################## ZEROS ######################
    //Zeros - Increment 1
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand"}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 4}).toString ()).toEqual ("0.0069");

    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfExpand", maximumFractionDigits: 3}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0055"), {roundingMode: "halfExpand", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfExpand", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0951"), {roundingMode: "halfExpand", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.095"), {roundingMode: "halfExpand", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0949"), {roundingMode: "halfExpand", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");

    expect (JSBD.round (JSBD.BigD ("0.65"), {roundingMode: "halfExpand", maximumFractionDigits: 1}).toString ()).toEqual ("0.7");
    expect (JSBD.round (JSBD.BigD ("0.55"), {roundingMode: "halfExpand", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.64"), {roundingMode: "halfExpand", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");

    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfExpand", maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "halfExpand", maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "halfExpand", maximumFractionDigits: 0}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 69}).toString ()).toEqual ("0.0069");



    //Zeros - Increment 2
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", roundingIncrement: 2}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.009"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.007"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.004");
    expect (JSBD.round (JSBD.BigD ("0.001"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.002");

    expect (JSBD.round (JSBD.BigD ("0.0969"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.08"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.07"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.06"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.05"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.9"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.3"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.1"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.2");

    expect (JSBD.round (JSBD.BigD ("8.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("6");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("4");
    expect (JSBD.round (JSBD.BigD ("1"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("2");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 5
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", roundingIncrement: 5}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0025"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0024"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0075"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0074"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0076"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");

    expect (JSBD.round (JSBD.BigD ("0.0869"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.075"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0749"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.025"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02501"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02499"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.75"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7501"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7499"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25001"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.2499"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");

    expect (JSBD.round (JSBD.BigD ("9.6869"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.6969"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.5000"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.4999"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("7.5000"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7.4999"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("6"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("4"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 10
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfExpand", roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfExpand", roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfExpand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.00651"), {roundingMode: "halfExpand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfExpand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0050"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0051"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0049"), {roundingMode: "halfExpand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0964"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0500"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0501"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0499"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6964"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5000"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("9.6964"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.5000"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.4999"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
}

//#############################################################################
//#################### HALF EVEN ##############################################
//#############################################################################
{
    //Increment 1
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven"}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 4}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfEven", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6955"), {roundingMode: "halfEven", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfEven", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfEven", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfEven", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.685"), {roundingMode: "halfEven", maximumFractionDigits: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "halfEven", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfEven", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "halfEven", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.55"), {roundingMode: "halfEven", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.64"), {roundingMode: "halfEven", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfEven", maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfEven", maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68.5"), {roundingMode: "halfEven", maximumFractionDigits: 0}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "halfEven", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 69}).toString ()).toEqual ("69.6969");

    //Increment 2
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", roundingIncrement: 2}).toString ()).toEqual ("69.6968");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("69.6968");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.699"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.697"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.692");
    expect (JSBD.round (JSBD.BigD ("69.691"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.692");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.68"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.67"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.66"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.64");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.9"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.3"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.2");
    expect (JSBD.round (JSBD.BigD ("69.1"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.2");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68.6969"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("64");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("64");
    expect (JSBD.round (JSBD.BigD ("61"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("69.6969");

    //Increment 5
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", roundingIncrement: 5}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6925"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6924"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6975"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6974"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6976"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.675"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6749"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.625"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.62499"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.75"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7501"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7499"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25001"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.2499"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.6969"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.5000"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("62.4999"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("67.5000"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("67.4999"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("66"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("64"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("69.6969");


    //Increment 10
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfEven", roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfEven", roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.69651"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6950"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6951"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6500"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6501"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6499"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5000"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.5000"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.4999"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("64.9999"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfEven", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("69.6969");

    //################## ZEROS ######################
    //Zeros - Increment 1
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven"}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 4}).toString ()).toEqual ("0.0069");

    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfEven", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0055"), {roundingMode: "halfEven", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfEven", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0951"), {roundingMode: "halfEven", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.095"), {roundingMode: "halfEven", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0949"), {roundingMode: "halfEven", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");

    expect (JSBD.round (JSBD.BigD ("0.65"), {roundingMode: "halfEven", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.55"), {roundingMode: "halfEven", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.64"), {roundingMode: "halfEven", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");

    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfEven", maximumFractionDigits: 0}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "halfEven", maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "halfEven", maximumFractionDigits: 0}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 69}).toString ()).toEqual ("0.0069");



    //Zeros - Increment 2
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", roundingIncrement: 2}).toString ()).toEqual ("0.0068");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("0.0068");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.009"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.007"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.004");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.004");
    expect (JSBD.round (JSBD.BigD ("0.001"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0969"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.08"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.07"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.06"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.05"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.04");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.9"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.7"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.3"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.1"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("8.6969"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("4");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("4");
    expect (JSBD.round (JSBD.BigD ("1"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 5
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", roundingIncrement: 5}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0025"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0024"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0075"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0074"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0076"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");

    expect (JSBD.round (JSBD.BigD ("0.0869"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.075"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0749"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.025"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.02501"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02499"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.75"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7501"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7499"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25001"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.2499"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");

    expect (JSBD.round (JSBD.BigD ("9.6869"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.6969"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.5000"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("2.4999"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("7.5000"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7.4999"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("6"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("4"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 10
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfEven", roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfEven", roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.00651"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0050"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0051"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0049"), {roundingMode: "halfEven", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0964"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0500"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0501"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0499"), {roundingMode: "halfEven", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6964"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5000"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "halfEven", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("9.6964"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.5000"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.4999"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfEven", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
}


//#############################################################################
//#################### HALF TRUNC #############################################
//#############################################################################
{
    //Increment 1
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc"}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 4}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfTrunc", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6955"), {roundingMode: "halfTrunc", maximumFractionDigits: 3}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfTrunc", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfTrunc", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfTrunc", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.685"), {roundingMode: "halfTrunc", maximumFractionDigits: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "halfTrunc", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfTrunc", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "halfTrunc", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.55"), {roundingMode: "halfTrunc", maximumFractionDigits: 1}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.64"), {roundingMode: "halfTrunc", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfTrunc", maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfTrunc", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("68.5"), {roundingMode: "halfTrunc", maximumFractionDigits: 0}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "halfTrunc", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 69}).toString ()).toEqual ("69.6969");

    //Increment 2
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", roundingIncrement: 2}).toString ()).toEqual ("69.6968");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("69.6968");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.699"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.698");
    expect (JSBD.round (JSBD.BigD ("69.697"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.694");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.692");
    expect (JSBD.round (JSBD.BigD ("69.691"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.68"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.67"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.66"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.64");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.9"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.7"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.3"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.2");
    expect (JSBD.round (JSBD.BigD ("69.1"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("66");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("64");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("62");
    expect (JSBD.round (JSBD.BigD ("61"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("69.6969");

    //Increment 5
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", roundingIncrement: 5}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6925"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6924"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6975"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6974"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6976"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.675"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.6749"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.625"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.62501"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.62499"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.75"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.7501"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7499"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25001"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.2499"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.5000"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("62.4999"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("67.5000"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("67.4999"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("66"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("64"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("69.6969");


    //Increment 10
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfTrunc", roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfTrunc", roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfTrunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.69651"), {roundingMode: "halfTrunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfTrunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6950"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6951"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6500"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6501"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6499"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5000"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.5000"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.4999"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("64.9999"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("69.6969");


    //################## ZEROS ######################
    //Zeros - Increment 1
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc"}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 4}).toString ()).toEqual ("0.0069");

    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfTrunc", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0055"), {roundingMode: "halfTrunc", maximumFractionDigits: 3}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfTrunc", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0951"), {roundingMode: "halfTrunc", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.095"), {roundingMode: "halfTrunc", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");
    expect (JSBD.round (JSBD.BigD ("0.0949"), {roundingMode: "halfTrunc", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");

    expect (JSBD.round (JSBD.BigD ("0.65"), {roundingMode: "halfTrunc", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.55"), {roundingMode: "halfTrunc", maximumFractionDigits: 1}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.64"), {roundingMode: "halfTrunc", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");

    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfTrunc", maximumFractionDigits: 0}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "halfTrunc", maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "halfTrunc", maximumFractionDigits: 0}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 69}).toString ()).toEqual ("0.0069");



    //Zeros - Increment 2
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", roundingIncrement: 2}).toString ()).toEqual ("0.0068");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("0.0068");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.009"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.007"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.004");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.002");
    expect (JSBD.round (JSBD.BigD ("0.001"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0969"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.08"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.07"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.06"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.05"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.04");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.9"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.7"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.3"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.2");
    expect (JSBD.round (JSBD.BigD ("0.1"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("8.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("6");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("4");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("2");
    expect (JSBD.round (JSBD.BigD ("1"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 5
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", roundingIncrement: 5}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0025"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0024"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0075"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0074"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0076"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");

    expect (JSBD.round (JSBD.BigD ("0.0869"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.075"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.0749"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.025"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.02501"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02499"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.75"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.7501"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7499"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25001"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.2499"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");

    expect (JSBD.round (JSBD.BigD ("9.6869"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.6969"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.5000"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("2.4999"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("7.5000"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("7.4999"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("6"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("4"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 10
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfTrunc", roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfTrunc", roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfTrunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.00651"), {roundingMode: "halfTrunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfTrunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0050"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0051"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0049"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0964"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0500"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0501"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0499"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6964"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5000"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("9.6964"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.5000"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.4999"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfTrunc", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
}


//#############################################################################
//#################### HALF CEIL ##############################################
//#############################################################################
{
    //Increment 1
    expect (JSBD.round (JSBD.BigD ("69.6969")).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil"}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 4}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfCeil", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfCeil", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfCeil", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfCeil", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfCeil", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "halfCeil", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.64"), {roundingMode: "halfCeil", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfCeil", maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfCeil", maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "halfCeil", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 69}).toString ()).toEqual ("69.6969");


    //Increment 2
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", roundingIncrement: 2}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.699"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.697"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.698");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.694");
    expect (JSBD.round (JSBD.BigD ("69.691"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.692");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.68"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.67"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.66"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.9"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.3"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.1"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.2");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("66");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("64");
    expect (JSBD.round (JSBD.BigD ("61"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("62");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("69.6969");


    //Increment 5
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", roundingIncrement: 5}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6925"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6924"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6759"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6749"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.625"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.62499"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.7501"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7499"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.2499"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.5000"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.4999"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("67.5000"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("67.4999"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("69.6969");


    //Increment 10
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfCeil", roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfCeil", roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfCeil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.69651"), {roundingMode: "halfCeil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfCeil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6950"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6951"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6500"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6501"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6499"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5000"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.5000"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.4999"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("64.9999"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("69.6969");



    //################## ZEROS ######################
    //Zeros - Increment 1
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil"}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 4}).toString ()).toEqual ("0.0069");

    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfCeil", maximumFractionDigits: 3}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0055"), {roundingMode: "halfCeil", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfCeil", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0951"), {roundingMode: "halfCeil", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.095"), {roundingMode: "halfCeil", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0949"), {roundingMode: "halfCeil", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");

    expect (JSBD.round (JSBD.BigD ("0.65"), {roundingMode: "halfCeil", maximumFractionDigits: 1}).toString ()).toEqual ("0.7");
    expect (JSBD.round (JSBD.BigD ("0.55"), {roundingMode: "halfCeil", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.64"), {roundingMode: "halfCeil", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");

    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfCeil", maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "halfCeil", maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "halfCeil", maximumFractionDigits: 0}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 69}).toString ()).toEqual ("0.0069");



    //Zeros - Increment 2
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", roundingIncrement: 2}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.009"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.007"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.004");
    expect (JSBD.round (JSBD.BigD ("0.001"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.002");

    expect (JSBD.round (JSBD.BigD ("0.0969"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.08"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.07"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.06"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.05"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.9"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.3"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.1"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.2");

    expect (JSBD.round (JSBD.BigD ("8.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("6");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("4");
    expect (JSBD.round (JSBD.BigD ("1"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("2");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 5
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", roundingIncrement: 5}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0025"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0024"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0075"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0074"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0076"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");

    expect (JSBD.round (JSBD.BigD ("0.0869"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.075"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0749"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.025"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02501"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02499"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.75"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7501"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7499"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25001"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.2499"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");

    expect (JSBD.round (JSBD.BigD ("9.6869"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.6969"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.5000"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.4999"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("7.5000"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7.4999"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("6"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("4"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 10
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfCeil", roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfCeil", roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfCeil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.00651"), {roundingMode: "halfCeil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfCeil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0050"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0051"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0049"), {roundingMode: "halfCeil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0964"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0500"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0501"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0499"), {roundingMode: "halfCeil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6964"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5000"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "halfCeil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("9.6964"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.5000"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.4999"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfCeil", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
}


//#############################################################################
//#################### HALF FLOOR #############################################
//#############################################################################
{
    //Increment 1
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor"}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 4}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfFloor", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6955"), {roundingMode: "halfFloor", maximumFractionDigits: 3}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfFloor", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfFloor", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfFloor", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.685"), {roundingMode: "halfFloor", maximumFractionDigits: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "halfFloor", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfFloor", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "halfFloor", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.55"), {roundingMode: "halfFloor", maximumFractionDigits: 1}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.64"), {roundingMode: "halfFloor", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfFloor", maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfFloor", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("68.5"), {roundingMode: "halfFloor", maximumFractionDigits: 0}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "halfFloor", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 69}).toString ()).toEqual ("69.6969");

    //Increment 2
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", roundingIncrement: 2}).toString ()).toEqual ("69.6968");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("69.6968");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.699"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.698");
    expect (JSBD.round (JSBD.BigD ("69.697"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.694");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.692");
    expect (JSBD.round (JSBD.BigD ("69.691"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.68"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.67"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.66"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.64");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.9"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.7"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.3"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.2");
    expect (JSBD.round (JSBD.BigD ("69.1"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("66");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("64");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("62");
    expect (JSBD.round (JSBD.BigD ("61"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("69.6969");

    //Increment 5
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", roundingIncrement: 5}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6925"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6924"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6975"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6974"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6976"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.675"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.6749"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.625"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.62501"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.62499"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.75"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.7501"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7499"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25001"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.2499"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.5000"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("62.4999"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("67.5000"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("67.4999"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("66"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("64"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("69.6969");


    //Increment 10
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfFloor", roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfFloor", roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "halfFloor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.69651"), {roundingMode: "halfFloor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfFloor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6950"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6951"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6500"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6501"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6499"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5000"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.5000"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.4999"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("64.9999"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("69.6969");


    //################## ZEROS ######################
    //Zeros - Increment 1
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor"}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 4}).toString ()).toEqual ("0.0069");

    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfFloor", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0055"), {roundingMode: "halfFloor", maximumFractionDigits: 3}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfFloor", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0951"), {roundingMode: "halfFloor", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.095"), {roundingMode: "halfFloor", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");
    expect (JSBD.round (JSBD.BigD ("0.0949"), {roundingMode: "halfFloor", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");

    expect (JSBD.round (JSBD.BigD ("0.65"), {roundingMode: "halfFloor", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.55"), {roundingMode: "halfFloor", maximumFractionDigits: 1}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.64"), {roundingMode: "halfFloor", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");

    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfFloor", maximumFractionDigits: 0}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "halfFloor", maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "halfFloor", maximumFractionDigits: 0}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 69}).toString ()).toEqual ("0.0069");



    //Zeros - Increment 2
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", roundingIncrement: 2}).toString ()).toEqual ("0.0068");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("0.0068");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.009"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.007"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.004");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.002");
    expect (JSBD.round (JSBD.BigD ("0.001"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0969"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.08"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.07"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.06"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.05"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.04");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.9"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.7"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.3"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.2");
    expect (JSBD.round (JSBD.BigD ("0.1"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("8.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("6");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("4");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("2");
    expect (JSBD.round (JSBD.BigD ("1"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 5
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", roundingIncrement: 5}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0025"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0024"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0075"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0074"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0076"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");

    expect (JSBD.round (JSBD.BigD ("0.0869"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.075"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.0749"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.025"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.02501"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02499"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.75"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.7501"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7499"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25001"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.2499"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");

    expect (JSBD.round (JSBD.BigD ("9.6869"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.6969"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.5000"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("2.4999"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("7.5000"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("7.4999"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("6"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("4"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 10
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfFloor", roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfFloor", roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "halfFloor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.00651"), {roundingMode: "halfFloor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfFloor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0050"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0051"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0049"), {roundingMode: "halfFloor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0964"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0500"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0501"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0499"), {roundingMode: "halfFloor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6964"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5000"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "halfFloor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("9.6964"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.5000"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.4999"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfFloor", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
}


//#############################################################################
//#################### TRUNC ##################################################
//#############################################################################
{
    //Increment 1
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc"}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 4}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "trunc", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6955"), {roundingMode: "trunc", maximumFractionDigits: 3}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "trunc", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "trunc", maximumFractionDigits: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "trunc", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.685"), {roundingMode: "trunc", maximumFractionDigits: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "trunc", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "trunc", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "trunc", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.55"), {roundingMode: "trunc", maximumFractionDigits: 1}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.64"), {roundingMode: "trunc", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "trunc", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "trunc", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("68.5"), {roundingMode: "trunc", maximumFractionDigits: 0}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "trunc", maximumFractionDigits: 0}).toString ()).toEqual ("69");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 69}).toString ()).toEqual ("69.6969");

    expect (JSBD.round (JSBD.BigD ("69.000006969"), {roundingMode: "trunc", maximumFractionDigits: 4}).toString ()).toEqual ("69");

    //Increment 2
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", roundingIncrement: 2}).toString ()).toEqual ("69.6968");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("69.6968");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.699"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.698");
    expect (JSBD.round (JSBD.BigD ("69.697"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.694");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.692");
    expect (JSBD.round (JSBD.BigD ("69.691"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.69");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.68"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.67"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.66"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.64");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.9"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.7"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.3"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.2");
    expect (JSBD.round (JSBD.BigD ("69.1"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("68.6969"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("66");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("64");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("62");
    expect (JSBD.round (JSBD.BigD ("61"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("60");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("69.6969");

    //Increment 5
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", roundingIncrement: 5}).toString ()).toEqual ("69.6965");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("69.6965");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6925"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6924"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6975"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6974"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6976"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.675"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.6749"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.625"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.62501"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.62499"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.75"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.7501"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.7499"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25001"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.25"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.2499"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("65.6969"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.5000"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("62.4999"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("67.5000"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("67.4999"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("66"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("64"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("62"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("69.6969");


    //Increment 10
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "trunc", roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "trunc", roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "trunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.69651"), {roundingMode: "trunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "trunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6950"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6951"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6500"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6501"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6499"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5000"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("65.5000"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("65.4999"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("64.9999"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "trunc", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("69.6969");


    //################## ZEROS ######################
    //Zeros - Increment 1
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc"}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 4}).toString ()).toEqual ("0.0069");

    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "trunc", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0055"), {roundingMode: "trunc", maximumFractionDigits: 3}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "trunc", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0951"), {roundingMode: "trunc", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");
    expect (JSBD.round (JSBD.BigD ("0.095"), {roundingMode: "trunc", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");
    expect (JSBD.round (JSBD.BigD ("0.0949"), {roundingMode: "trunc", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");

    expect (JSBD.round (JSBD.BigD ("0.65"), {roundingMode: "trunc", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.55"), {roundingMode: "trunc", maximumFractionDigits: 1}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.64"), {roundingMode: "trunc", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");

    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "trunc", maximumFractionDigits: 0}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "trunc", maximumFractionDigits: 0}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "trunc", maximumFractionDigits: 0}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 69}).toString ()).toEqual ("0.0069");



    //Zeros - Increment 2
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", roundingIncrement: 2}).toString ()).toEqual ("0.0068");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("0.0068");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.009"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.007"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.004");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.002");
    expect (JSBD.round (JSBD.BigD ("0.001"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0969"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.08"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.07"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.06"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.05"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.04");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.9"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.7"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.3"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.2");
    expect (JSBD.round (JSBD.BigD ("0.1"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("8.6969"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("6");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("4");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("2");
    expect (JSBD.round (JSBD.BigD ("1"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 5
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", roundingIncrement: 5}).toString ()).toEqual ("0.0065");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("0.0065");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0025"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0024"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0075"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0074"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0076"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");

    expect (JSBD.round (JSBD.BigD ("0.0869"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.075"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.0749"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.025"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.02501"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.02499"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.75"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.7501"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.7499"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25001"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.25"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.2499"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");

    expect (JSBD.round (JSBD.BigD ("9.6869"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("5.6969"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.5000"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("2.4999"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("7.5000"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("7.4999"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("6"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("4"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("2"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 10
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "trunc", roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "trunc", roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "trunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.00651"), {roundingMode: "trunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "trunc", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0050"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0051"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0049"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0964"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0500"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0501"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0499"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6964"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5000"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "trunc", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("9.6964"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("5.5000"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("5.4999"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "trunc", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
}


//#############################################################################
//#################### FLOOR ##################################################
//#############################################################################
{
    //Increment 1
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor"}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 4}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "floor", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6955"), {roundingMode: "floor", maximumFractionDigits: 3}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "floor", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "floor", maximumFractionDigits: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "floor", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.685"), {roundingMode: "floor", maximumFractionDigits: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "floor", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "floor", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "floor", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.55"), {roundingMode: "floor", maximumFractionDigits: 1}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.64"), {roundingMode: "floor", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "floor", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "floor", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("68.5"), {roundingMode: "floor", maximumFractionDigits: 0}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "floor", maximumFractionDigits: 0}).toString ()).toEqual ("69");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 69}).toString ()).toEqual ("69.6969");

    //Increment 2
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", roundingIncrement: 2}).toString ()).toEqual ("69.6968");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("69.6968");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.699"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.698");
    expect (JSBD.round (JSBD.BigD ("69.697"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.694");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.692");
    expect (JSBD.round (JSBD.BigD ("69.691"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.69");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.68"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.67"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.66"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.64");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.9"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.7"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.3"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.2");
    expect (JSBD.round (JSBD.BigD ("69.1"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("68.6969"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("66");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("64");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("62");
    expect (JSBD.round (JSBD.BigD ("61"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("60");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("69.6969");

    //Increment 5
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", roundingIncrement: 5}).toString ()).toEqual ("69.6965");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("69.6965");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6925"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6924"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6975"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6974"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6976"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.675"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.6749"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.625"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.62501"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.62499"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.75"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.7501"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.7499"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25001"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.25"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.2499"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("65.6969"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.5000"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("62.4999"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("67.5000"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("67.4999"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("66"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("64"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("62"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("69.6969");


    //Increment 10
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "floor", roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "floor", roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.69651"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6950"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6951"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6500"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6501"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6499"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5000"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("65.5000"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("65.4999"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("64.9999"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "floor", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("69.6969");


    //################## ZEROS ######################
    //Zeros - Increment 1
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor"}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 4}).toString ()).toEqual ("0.0069");

    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "floor", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0055"), {roundingMode: "floor", maximumFractionDigits: 3}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "floor", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0951"), {roundingMode: "floor", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");
    expect (JSBD.round (JSBD.BigD ("0.095"), {roundingMode: "floor", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");
    expect (JSBD.round (JSBD.BigD ("0.0949"), {roundingMode: "floor", maximumFractionDigits: 2}).toString ()).toEqual ("0.09");

    expect (JSBD.round (JSBD.BigD ("0.65"), {roundingMode: "floor", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.55"), {roundingMode: "floor", maximumFractionDigits: 1}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.64"), {roundingMode: "floor", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");

    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "floor", maximumFractionDigits: 0}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "floor", maximumFractionDigits: 0}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "floor", maximumFractionDigits: 0}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 69}).toString ()).toEqual ("0.0069");



    //Zeros - Increment 2
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", roundingIncrement: 2}).toString ()).toEqual ("0.0068");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("0.0068");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.009"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.007"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.004");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.002");
    expect (JSBD.round (JSBD.BigD ("0.001"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0969"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.08"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.07"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.06"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.05"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.04");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.9"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.7"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.3"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.2");
    expect (JSBD.round (JSBD.BigD ("0.1"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("8.6969"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("6");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("4");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("2");
    expect (JSBD.round (JSBD.BigD ("1"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 5
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", roundingIncrement: 5}).toString ()).toEqual ("0.0065");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("0.0065");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0025"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0024"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0075"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0074"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0076"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");

    expect (JSBD.round (JSBD.BigD ("0.0869"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.075"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.0749"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.025"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.02501"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.02499"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.75"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.7501"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.7499"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25001"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.25"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.2499"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");

    expect (JSBD.round (JSBD.BigD ("9.6869"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("5.6969"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.5000"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("2.4999"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("7.5000"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("7.4999"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("6"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("4"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("2"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 10
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "floor", roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "floor", roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.00651"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0050"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0051"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0049"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0964"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0500"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0501"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0499"), {roundingMode: "floor", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6964"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5000"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "floor", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("9.6964"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("5.5000"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("5.4999"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "floor", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
}


//#############################################################################
//#################### EXPAND #################################################
//#############################################################################
{
    //Increment 1
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand"}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 4}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "expand", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6955"), {roundingMode: "expand", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "expand", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "expand", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "expand", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.685"), {roundingMode: "expand", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "expand", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "expand", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "expand", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.55"), {roundingMode: "expand", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.64"), {roundingMode: "expand", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "expand", maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "expand", maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68.5"), {roundingMode: "expand", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "expand", maximumFractionDigits: 0}).toString ()).toEqual ("70");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 69}).toString ()).toEqual ("69.6969");

    //Increment 2
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", roundingIncrement: 2}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.698");
    expect (JSBD.round (JSBD.BigD ("69.699"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.697"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.698");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.694");
    expect (JSBD.round (JSBD.BigD ("69.691"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.692");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.68"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.67"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.66"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.9"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.3"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.1"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.2");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68.6969"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("66");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("64");
    expect (JSBD.round (JSBD.BigD ("61"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("62");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("69.6969");

    //Increment 5
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", roundingIncrement: 5}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6925"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6924"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6975"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6974"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6976"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.675"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6749"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.625"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.62501"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.62499"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.75"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7501"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7499"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.25001"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.2499"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.6969"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("62.5000"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.4999"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("67.5000"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("67.4999"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("66"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("64"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("69.6969");


    //Increment 10
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "expand", roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "expand", roundingIncrement: 10}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.69651"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6950"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6951"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6500"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6501"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6499"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5000"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.5000"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.4999"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("64.9999"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "expand", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("69.6969");


    //################## ZEROS ######################
    //Zeros - Increment 1
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand"}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 4}).toString ()).toEqual ("0.0069");

    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "expand", maximumFractionDigits: 3}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.006"), {roundingMode: "expand", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0055"), {roundingMode: "expand", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "expand", maximumFractionDigits: 3}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0951"), {roundingMode: "expand", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.095"), {roundingMode: "expand", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0949"), {roundingMode: "expand", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");

    expect (JSBD.round (JSBD.BigD ("0.65"), {roundingMode: "expand", maximumFractionDigits: 1}).toString ()).toEqual ("0.7");
    expect (JSBD.round (JSBD.BigD ("0.55"), {roundingMode: "expand", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.64"), {roundingMode: "expand", maximumFractionDigits: 1}).toString ()).toEqual ("0.7");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "expand", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");

    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "expand", maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "expand", maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "expand", maximumFractionDigits: 0}).toString ()).toEqual ("1");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 69}).toString ()).toEqual ("0.0069");



    //Zeros - Increment 2
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", roundingIncrement: 2}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.009"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.007"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.004");
    expect (JSBD.round (JSBD.BigD ("0.001"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.002");

    expect (JSBD.round (JSBD.BigD ("0.0969"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.08"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.07"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.06"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.05"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.9"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.3"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.1"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.2");

    expect (JSBD.round (JSBD.BigD ("8.6969"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("6");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("4");
    expect (JSBD.round (JSBD.BigD ("1"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("2");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 5
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", roundingIncrement: 5}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0025"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0024"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0075"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0074"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0076"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");

    expect (JSBD.round (JSBD.BigD ("0.0869"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.075"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0749"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.025"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02501"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02499"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.75"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7501"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7499"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.25001"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.2499"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");

    expect (JSBD.round (JSBD.BigD ("9.6869"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.6969"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("2.5000"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.4999"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("7.5000"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7.4999"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("6"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("4"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 10
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "expand", roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "expand", roundingIncrement: 10}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.00651"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0050"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0051"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0049"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");

    expect (JSBD.round (JSBD.BigD ("0.0964"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0500"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0501"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0499"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");

    expect (JSBD.round (JSBD.BigD ("0.6964"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5000"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("9.6964"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.5000"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.4999"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "expand", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
}


//#############################################################################
//#################### CEIL ###################################################
//#############################################################################
{
    //Increment 1
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil"}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 4}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "ceil", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6955"), {roundingMode: "ceil", maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "ceil", maximumFractionDigits: 3}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "ceil", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "ceil", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.685"), {roundingMode: "ceil", maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "ceil", maximumFractionDigits: 2}).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "ceil", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "ceil", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.55"), {roundingMode: "ceil", maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.64"), {roundingMode: "ceil", maximumFractionDigits: 1}).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "ceil", maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "ceil", maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68.5"), {roundingMode: "ceil", maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "ceil", maximumFractionDigits: 0}).toString ()).toEqual ("70");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 69}).toString ()).toEqual ("69.6969");

    //Increment 2
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", roundingIncrement: 2}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.698");
    expect (JSBD.round (JSBD.BigD ("69.699"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.697"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.698");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.694");
    expect (JSBD.round (JSBD.BigD ("69.691"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.692");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.68"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.67"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.66"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.65"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.9"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.6"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.4"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.3"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.1"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.2");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68.6969"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("66");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("64");
    expect (JSBD.round (JSBD.BigD ("61"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("62");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("69.6969");

    //Increment 5
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", roundingIncrement: 5}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.695"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.693"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6925"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6924"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6975"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6974"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6976"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.675"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6749"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.625"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.62501"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.62499"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.75"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7501"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7499"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.25001"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.2499"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.5"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.6969"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("62.5000"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.4999"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("67.5000"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("67.4999"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("67"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("66"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("64"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("63"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("69.6969");


    //Increment 10
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "ceil", roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "ceil", roundingIncrement: 10}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.69651"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6950"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6951"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6500"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6501"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6499"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5000"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.5000"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.4999"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("64.9999"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingMode: "ceil", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("69.6969");


    //################## ZEROS ######################
    //Zeros - Increment 1
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil"}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 4}).toString ()).toEqual ("0.0069");

    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "ceil", maximumFractionDigits: 3}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.006"), {roundingMode: "ceil", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0055"), {roundingMode: "ceil", maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "ceil", maximumFractionDigits: 3}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0951"), {roundingMode: "ceil", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.095"), {roundingMode: "ceil", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0949"), {roundingMode: "ceil", maximumFractionDigits: 2}).toString ()).toEqual ("0.1");

    expect (JSBD.round (JSBD.BigD ("0.65"), {roundingMode: "ceil", maximumFractionDigits: 1}).toString ()).toEqual ("0.7");
    expect (JSBD.round (JSBD.BigD ("0.55"), {roundingMode: "ceil", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.64"), {roundingMode: "ceil", maximumFractionDigits: 1}).toString ()).toEqual ("0.7");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "ceil", maximumFractionDigits: 1}).toString ()).toEqual ("0.6");

    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "ceil", maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "ceil", maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "ceil", maximumFractionDigits: 0}).toString ()).toEqual ("1");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 69}).toString ()).toEqual ("0.0069");



    //Zeros - Increment 2
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", roundingIncrement: 2}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.009"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.007"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.004");
    expect (JSBD.round (JSBD.BigD ("0.001"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.002");

    expect (JSBD.round (JSBD.BigD ("0.0969"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.08"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.07"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.06"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.05"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.9"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.6"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.4"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.3"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.1"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.2");

    expect (JSBD.round (JSBD.BigD ("8.6969"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("6");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("4");
    expect (JSBD.round (JSBD.BigD ("1"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("2");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 5
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", roundingIncrement: 5}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.005"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.003"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0025"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0024"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0075"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0074"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0076"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");

    expect (JSBD.round (JSBD.BigD ("0.0869"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.075"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0749"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.025"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02501"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02499"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.75"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7501"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7499"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.25001"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.2499"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.5"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");

    expect (JSBD.round (JSBD.BigD ("9.6869"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.6969"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("2.5000"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.4999"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("7.5000"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7.4999"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("9"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("6"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("4"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("3"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 10
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "ceil", roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "ceil", roundingIncrement: 10}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.00651"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0050"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0051"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0049"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");

    expect (JSBD.round (JSBD.BigD ("0.0964"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0500"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0501"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0499"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");

    expect (JSBD.round (JSBD.BigD ("0.6964"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5000"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {roundingMode: "ceil", maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("9.6964"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.5000"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.4999"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "ceil", maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
}


//#############################################################################
//#################### NONE (HALF EXPAND) #####################################
//#############################################################################
{
    //Increment 1
    expect (JSBD.round (JSBD.BigD ("69.6969")).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.69695")).toString ()).toEqual ("69.69695");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 4}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {maximumFractionDigits: 3}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {maximumFractionDigits: 3}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {maximumFractionDigits: 2}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.695"), {maximumFractionDigits: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.65"), {maximumFractionDigits: 1}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.64"), {maximumFractionDigits: 1}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5"), {maximumFractionDigits: 0}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.4"), {maximumFractionDigits: 0}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 69}).toString ()).toEqual ("69.6969");


    //Increment 2
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 2}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("69.697");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.699"), {maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.697"), {maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.698");
    expect (JSBD.round (JSBD.BigD ("69.695"), {maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.696");
    expect (JSBD.round (JSBD.BigD ("69.693"), {maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.694");
    expect (JSBD.round (JSBD.BigD ("69.691"), {maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("69.692");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.68"), {maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.67"), {maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.68");
    expect (JSBD.round (JSBD.BigD ("69.66"), {maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");
    expect (JSBD.round (JSBD.BigD ("69.65"), {maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("69.66");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.9"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.8");
    expect (JSBD.round (JSBD.BigD ("69.6"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.5"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.4"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.3"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.4");
    expect (JSBD.round (JSBD.BigD ("69.1"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("69.2");

    expect (JSBD.round (JSBD.BigD ("69.6869"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68.6969"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("69"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("68"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("67"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("68");
    expect (JSBD.round (JSBD.BigD ("65"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("66");
    expect (JSBD.round (JSBD.BigD ("63"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("64");
    expect (JSBD.round (JSBD.BigD ("61"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("62");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("69.6969");


    //Increment 5
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 5}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.695"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.693"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6925"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.695");
    expect (JSBD.round (JSBD.BigD ("69.6924"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("69.69");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6759"), {maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6749"), {maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.625"), {maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.65");
    expect (JSBD.round (JSBD.BigD ("69.62499"), {maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("69.6");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.7501"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.7499"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.25"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69.5");
    expect (JSBD.round (JSBD.BigD ("69.2499"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("69");
    expect (JSBD.round (JSBD.BigD ("69.6869"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.6969"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.5000"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("62.4999"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("67.5000"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("67.4999"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("65");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("69.6969");


    //Increment 10
    expect (JSBD.round (JSBD.BigD ("69.6969"), {roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6965"), {maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.69651"), {maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.697");
    expect (JSBD.round (JSBD.BigD ("69.6964"), {maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("69.696");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6950"), {maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6951"), {maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6949"), {maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("69.69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6500"), {maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6501"), {maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.7");
    expect (JSBD.round (JSBD.BigD ("69.6499"), {maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("69.6");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5000"), {maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.5001"), {maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("69.4999"), {maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("69");

    expect (JSBD.round (JSBD.BigD ("69.6964"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.5000"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("65.4999"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("70");
    expect (JSBD.round (JSBD.BigD ("64.9999"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("60");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("69.6969");
    expect (JSBD.round (JSBD.BigD ("69.6969"), {maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("69.6969");



    //################## ZEROS ######################
    //Zeros - Increment 1
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingMode: "halfExpand"}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 4}).toString ()).toEqual ("0.0069");

    expect (JSBD.round (JSBD.BigD ("0.0065"), {maximumFractionDigits: 3}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0055"), {maximumFractionDigits: 3}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {maximumFractionDigits: 3}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0951"), {maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.095"), {maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0949"), {maximumFractionDigits: 2}).toString ()).toEqual ("0.09");

    expect (JSBD.round (JSBD.BigD ("0.65"), {maximumFractionDigits: 1}).toString ()).toEqual ("0.7");
    expect (JSBD.round (JSBD.BigD ("0.55"), {maximumFractionDigits: 1}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.64"), {maximumFractionDigits: 1}).toString ()).toEqual ("0.6");

    expect (JSBD.round (JSBD.BigD ("0.5"), {maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.6"), {maximumFractionDigits: 0}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4"), {maximumFractionDigits: 0}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 69}).toString ()).toEqual ("0.0069");



    //Zeros - Increment 2
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingIncrement: 2}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 4, roundingIncrement: 2}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.009"), {maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.007"), {maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.008");
    expect (JSBD.round (JSBD.BigD ("0.005"), {maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.006");
    expect (JSBD.round (JSBD.BigD ("0.003"), {maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.004");
    expect (JSBD.round (JSBD.BigD ("0.001"), {maximumFractionDigits: 3, roundingIncrement: 2}).toString ()).toEqual ("0.002");

    expect (JSBD.round (JSBD.BigD ("0.0969"), {maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.08"), {maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.07"), {maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.08");
    expect (JSBD.round (JSBD.BigD ("0.06"), {maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");
    expect (JSBD.round (JSBD.BigD ("0.05"), {maximumFractionDigits: 2, roundingIncrement: 2}).toString ()).toEqual ("0.06");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.9"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.8");
    expect (JSBD.round (JSBD.BigD ("0.6"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.5"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.6");
    expect (JSBD.round (JSBD.BigD ("0.4"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.3"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.4");
    expect (JSBD.round (JSBD.BigD ("0.1"), {maximumFractionDigits: 1, roundingIncrement: 2}).toString ()).toEqual ("0.2");

    expect (JSBD.round (JSBD.BigD ("8.6969"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("9"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("7"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("8");
    expect (JSBD.round (JSBD.BigD ("5"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("6");
    expect (JSBD.round (JSBD.BigD ("3"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("4");
    expect (JSBD.round (JSBD.BigD ("1"), {maximumFractionDigits: 0, roundingIncrement: 2}).toString ()).toEqual ("2");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 5, roundingIncrement: 2}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 69, roundingIncrement: 2}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 5
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingIncrement: 5}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 4, roundingIncrement: 5}).toString ()).toEqual ("0.007");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.005"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.003"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0025"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0024"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.0075"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0074"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.005");
    expect (JSBD.round (JSBD.BigD ("0.0076"), {maximumFractionDigits: 3, roundingIncrement: 5}).toString ()).toEqual ("0.01");

    expect (JSBD.round (JSBD.BigD ("0.0869"), {maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.075"), {maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0749"), {maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.025"), {maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02501"), {maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0.05");
    expect (JSBD.round (JSBD.BigD ("0.02499"), {maximumFractionDigits: 2, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6969"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.75"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7501"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.7499"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25001"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.25"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.2499"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.5"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {maximumFractionDigits: 1, roundingIncrement: 5}).toString ()).toEqual ("0.5");

    expect (JSBD.round (JSBD.BigD ("9.6869"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.6969"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.5000"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2.4999"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("7.5000"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7.4999"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("9"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("8"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("7"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("6"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("5"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("4"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("3"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("5");
    expect (JSBD.round (JSBD.BigD ("2"), {maximumFractionDigits: 0, roundingIncrement: 5}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 5, roundingIncrement: 5}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 69, roundingIncrement: 5}).toString ()).toEqual ("0.0069");


    //Zeros - Increment 10
    expect (JSBD.round (JSBD.BigD ("0.0069"), {roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0065"), {maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.00651"), {maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.007");
    expect (JSBD.round (JSBD.BigD ("0.0064"), {maximumFractionDigits: 4, roundingIncrement: 10}).toString ()).toEqual ("0.006");

    expect (JSBD.round (JSBD.BigD ("0.0064"), {maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0050"), {maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0051"), {maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0.01");
    expect (JSBD.round (JSBD.BigD ("0.0049"), {maximumFractionDigits: 3, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.0964"), {maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0500"), {maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0501"), {maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0.1");
    expect (JSBD.round (JSBD.BigD ("0.0499"), {maximumFractionDigits: 2, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("0.6964"), {maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5000"), {maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.5001"), {maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("1");
    expect (JSBD.round (JSBD.BigD ("0.4999"), {maximumFractionDigits: 1, roundingIncrement: 10}).toString ()).toEqual ("0");

    expect (JSBD.round (JSBD.BigD ("9.6964"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.5000"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.4999"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("4.9999"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("6.9696"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");
    expect (JSBD.round (JSBD.BigD ("5.9696"), {maximumFractionDigits: 0, roundingIncrement: 10}).toString ()).toEqual ("10");

    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 5, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
    expect (JSBD.round (JSBD.BigD ("0.0069"), {maximumFractionDigits: 69, roundingIncrement: 10}).toString ()).toEqual ("0.0069");
}

//#######################################################
//################## INCREMENT 20 & 25 ##################
//#######################################################
{
    expect (JSBD.round (JSBD.BigD ("54.73673"), {roundingMode: "trunc", maximumFractionDigits: 5, roundingIncrement: 20}).toString ()).toEqual ("54.7366");
    expect (JSBD.round (JSBD.BigD ("54.73673"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 20}).toString ()).toEqual ("54.738");
    expect (JSBD.round (JSBD.BigD ("54.73673"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 20}).toString ()).toEqual ("54.72");
    expect (JSBD.round (JSBD.BigD ("54.73673"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 20}).toString ()).toEqual ("54.8");
    expect (JSBD.round (JSBD.BigD ("54.73673"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 20}).toString ()).toEqual ("54");
    expect (JSBD.round (JSBD.BigD ("54.73673"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 20}).toString ()).toEqual ("60");

    expect (JSBD.round (JSBD.BigD ("0.020507"), {roundingMode: "halfFloor", maximumFractionDigits: 6, roundingIncrement: 20}).toString ()).toEqual ("0.0205");
    expect (JSBD.round (JSBD.BigD ("0.020507"), {roundingMode: "halfCeil", maximumFractionDigits: 5, roundingIncrement: 20}).toString ()).toEqual ("0.0206");
    expect (JSBD.round (JSBD.BigD ("0.020507"), {roundingMode: "halfEven", maximumFractionDigits: 4, roundingIncrement: 20}).toString ()).toEqual ("0.02");
    expect (JSBD.round (JSBD.BigD ("0.020507"), {roundingMode: "expand", maximumFractionDigits: 3, roundingIncrement: 20}).toString ()).toEqual ("0.04");
    expect (JSBD.round (JSBD.BigD ("0.020507"), {roundingMode: "trunc", maximumFractionDigits: 2, roundingIncrement: 20}).toString ()).toEqual ("0");
    expect (JSBD.round (JSBD.BigD ("0.020507"), {roundingMode: "expand", maximumFractionDigits: 1, roundingIncrement: 20}).toString ()).toEqual ("2");


    expect (JSBD.round (JSBD.BigD ("37.21258"), {roundingMode: "trunc", maximumFractionDigits: 5, roundingIncrement: 25}).toString ()).toEqual ("37.2125");
    expect (JSBD.round (JSBD.BigD ("37.21258"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 25}).toString ()).toEqual ("37.215");
    expect (JSBD.round (JSBD.BigD ("37.21258"), {roundingMode: "floor", maximumFractionDigits: 3, roundingIncrement: 25}).toString ()).toEqual ("37.2");
    expect (JSBD.round (JSBD.BigD ("37.21258"), {roundingMode: "ceil", maximumFractionDigits: 2, roundingIncrement: 25}).toString ()).toEqual ("37.25");
    expect (JSBD.round (JSBD.BigD ("37.21258"), {roundingMode: "halfTrunc", maximumFractionDigits: 1, roundingIncrement: 25}).toString ()).toEqual ("37.5");
    expect (JSBD.round (JSBD.BigD ("37.21258"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 25}).toString ()).toEqual ("25");

    expect (JSBD.round (JSBD.BigD ("37.1258395"), {roundingMode: "halfFloor", maximumFractionDigits: 7, roundingIncrement: 25}).toString ()).toEqual ("37.12584");
    expect (JSBD.round (JSBD.BigD ("37.1258395"), {roundingMode: "halfCeil", maximumFractionDigits: 6, roundingIncrement: 25}).toString ()).toEqual ("37.12585");
    expect (JSBD.round (JSBD.BigD ("37.1258395"), {roundingMode: "halfEven", maximumFractionDigits: 5, roundingIncrement: 25}).toString ()).toEqual ("37.12575");
    expect (JSBD.round (JSBD.BigD ("37.1258395"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 25}).toString ()).toEqual ("37.1275");
    expect (JSBD.round (JSBD.BigD ("37.1258395"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 25}).toString ()).toEqual ("37.125");
    expect (JSBD.round (JSBD.BigD ("37.1258395"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 25}).toString ()).toEqual ("37.25");

    expect (JSBD.round (JSBD.BigD ("29.2741258"), {roundingMode: "trunc", maximumFractionDigits: 7, roundingIncrement: 25}).toString ()).toEqual ("29.274125");
    expect (JSBD.round (JSBD.BigD ("29.2741258"), {roundingMode: "expand", maximumFractionDigits: 6, roundingIncrement: 25}).toString ()).toEqual ("29.27415");
    expect (JSBD.round (JSBD.BigD ("29.2741258"), {roundingMode: "floor", maximumFractionDigits: 5, roundingIncrement: 25}).toString ()).toEqual ("29.274");
    expect (JSBD.round (JSBD.BigD ("29.2741258"), {roundingMode: "ceil", maximumFractionDigits: 4, roundingIncrement: 25}).toString ()).toEqual ("29.275");
    expect (JSBD.round (JSBD.BigD ("29.2741258"), {roundingMode: "halfTrunc", maximumFractionDigits: 3, roundingIncrement: 25}).toString ()).toEqual ("29.275");
    expect (JSBD.round (JSBD.BigD ("29.2741258"), {roundingMode: "halfExpand", maximumFractionDigits: 2, roundingIncrement: 25}).toString ()).toEqual ("29.25");

    expect (JSBD.round (JSBD.BigD ("12.5741258"), {roundingMode: "halfFloor", maximumFractionDigits: 7, roundingIncrement: 25}).toString ()).toEqual ("12.574125");
    expect (JSBD.round (JSBD.BigD ("12.5741258"), {roundingMode: "halfCeil", maximumFractionDigits: 6, roundingIncrement: 25}).toString ()).toEqual ("12.574125");
    expect (JSBD.round (JSBD.BigD ("12.5741258"), {roundingMode: "halfEven", maximumFractionDigits: 5, roundingIncrement: 25}).toString ()).toEqual ("12.57425");
    expect (JSBD.round (JSBD.BigD ("12.5741258"), {roundingMode: "expand", maximumFractionDigits: 4, roundingIncrement: 25}).toString ()).toEqual ("12.575");
    expect (JSBD.round (JSBD.BigD ("12.5741258"), {roundingMode: "trunc", maximumFractionDigits: 3, roundingIncrement: 25}).toString ()).toEqual ("12.55");
    expect (JSBD.round (JSBD.BigD ("12.5741258"), {roundingMode: "expand", maximumFractionDigits: 2, roundingIncrement: 25}).toString ()).toEqual ("12.75");

    expect (JSBD.round (JSBD.BigD ("125.273852"), {roundingMode: "trunc", maximumFractionDigits: 6, roundingIncrement: 25}).toString ()).toEqual ("125.27385");
    expect (JSBD.round (JSBD.BigD ("125.273852"), {roundingMode: "expand", maximumFractionDigits: 5, roundingIncrement: 25}).toString ()).toEqual ("125.274");
    expect (JSBD.round (JSBD.BigD ("125.273852"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 25}).toString ()).toEqual ("125.2725");
    expect (JSBD.round (JSBD.BigD ("125.273852"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 25}).toString ()).toEqual ("125.275");
    expect (JSBD.round (JSBD.BigD ("125.273852"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 25}).toString ()).toEqual ("125.25");
    expect (JSBD.round (JSBD.BigD ("125.273852"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 25}).toString ()).toEqual ("125");

    expect (JSBD.round (JSBD.BigD ("1000000125.273852"), {roundingMode: "trunc", maximumFractionDigits: 6, roundingIncrement: 25}).toString ()).toEqual ("1000000125.27385");
    expect (JSBD.round (JSBD.BigD ("1000000125.273852"), {roundingMode: "expand", maximumFractionDigits: 5, roundingIncrement: 25}).toString ()).toEqual ("1000000125.274");
    expect (JSBD.round (JSBD.BigD ("1000000125.273852"), {roundingMode: "floor", maximumFractionDigits: 4, roundingIncrement: 25}).toString ()).toEqual ("1000000125.2725");
    expect (JSBD.round (JSBD.BigD ("1000000125.273852"), {roundingMode: "ceil", maximumFractionDigits: 3, roundingIncrement: 25}).toString ()).toEqual ("1000000125.275");
    expect (JSBD.round (JSBD.BigD ("1000000125.273852"), {roundingMode: "halfTrunc", maximumFractionDigits: 2, roundingIncrement: 25}).toString ()).toEqual ("1000000125.25");
    expect (JSBD.round (JSBD.BigD ("1000000125.273852"), {roundingMode: "halfExpand", maximumFractionDigits: 1, roundingIncrement: 25}).toString ()).toEqual ("1000000125");

    expect (JSBD.round (JSBD.BigD ("100000012.5"), {roundingMode: "trunc", maximumFractionDigits: 0, roundingIncrement: 25}).toString ()).toEqual ("100000000");
    expect (JSBD.round (JSBD.BigD ("100000012.5"), {roundingMode: "expand", maximumFractionDigits: 0, roundingIncrement: 25}).toString ()).toEqual ("100000025");
    expect (JSBD.round (JSBD.BigD ("100000012.5"), {roundingMode: "floor", maximumFractionDigits: 0, roundingIncrement: 25}).toString ()).toEqual ("100000000");
    expect (JSBD.round (JSBD.BigD ("100000012.5"), {roundingMode: "ceil", maximumFractionDigits: 0, roundingIncrement: 25}).toString ()).toEqual ("100000025");
    expect (JSBD.round (JSBD.BigD ("100000012.5"), {roundingMode: "halfTrunc", maximumFractionDigits: 0, roundingIncrement: 25}).toString ()).toEqual ("100000000");
    expect (JSBD.round (JSBD.BigD ("100000012.5"), {roundingMode: "halfExpand", maximumFractionDigits: 0, roundingIncrement: 25}).toString ()).toEqual ("100000025");
    expect (JSBD.round (JSBD.BigD ("100000012.5"), {roundingMode: "halfFloor", maximumFractionDigits: 0, roundingIncrement: 25}).toString ()).toEqual ("100000000");
    expect (JSBD.round (JSBD.BigD ("100000012.5"), {roundingMode: "halfCeil", maximumFractionDigits: 0, roundingIncrement: 25}).toString ()).toEqual ("100000025");
    expect (JSBD.round (JSBD.BigD ("100000012.5"), {roundingMode: "halfEven", maximumFractionDigits: 0, roundingIncrement: 25}).toString ()).toEqual ("100000000");
}

console.log ("Test passed, winning");