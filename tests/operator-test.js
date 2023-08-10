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

// ####### ####### ####### #######  ###### #######
// #          #    #     #    #    #          #   
// #######    #    #  ###     #    #          #   
//       #    #    #    #     #    #          #   
// #######    #    #     # #######  ######    #   


//#######################################################
//#################### + ADD + ##########################
//#######################################################
//############# let num = 1.23m + 1.23m #################
{
    expect (JSBD.add (JSBD.BigD ("0"), JSBD.BigD ("0")).toString ()).toEqual ("0");
    expect (JSBD.add (JSBD.BigD ("0.01"), JSBD.BigD ("0.01")).toString ()).toEqual ("0.02");
    expect (JSBD.add (JSBD.BigD ("0.1"), JSBD.BigD ("0.01")).toString ()).toEqual ("0.11");
    expect (JSBD.add (JSBD.BigD ("1"), JSBD.BigD ("0.01")).toString ()).toEqual ("1.01");
    expect (JSBD.add (JSBD.BigD ("10"), JSBD.BigD ("0.01")).toString ()).toEqual ("10.01");

    expect (JSBD.add (JSBD.BigD ("0.01"), JSBD.BigD ("0.99")).toString ()).toEqual ("1");
    expect (JSBD.add (JSBD.BigD ("0.01"), JSBD.BigD ("0.1")).toString ()).toEqual ("0.11");
    expect (JSBD.add (JSBD.BigD ("0.01"), JSBD.BigD ("1")).toString ()).toEqual ("1.01");
    expect (JSBD.add (JSBD.BigD ("0.01"), JSBD.BigD ("10")).toString ()).toEqual ("10.01");

    expect (JSBD.add (JSBD.BigD ("3.4583"), JSBD.BigD ("19.432")).toString ()).toEqual ("22.8903");
    expect (JSBD.add (JSBD.BigD ("1.57642"), JSBD.BigD ("9.50956")).toString ()).toEqual ("11.08598");
    expect (JSBD.add (JSBD.BigD ("7.837343"), JSBD.BigD ("3.2874")).toString ()).toEqual ("11.124743");
    expect (JSBD.add (JSBD.BigD ("2.733832"), JSBD.BigD ("7.266168")).toString ()).toEqual ("10");

    expect (JSBD.add (JSBD.BigD ("1.00001"), JSBD.BigD ("-0.00001")).toString ()).toEqual ("1");
    expect (JSBD.add (JSBD.BigD ("0.01001"), JSBD.BigD ("-0.00001")).toString ()).toEqual ("0.01");
    expect (JSBD.add (JSBD.BigD ("0.01001"), JSBD.BigD ("-0.01001")).toString ()).toEqual ("0");
    expect (JSBD.add (JSBD.BigD ("1.00001"), JSBD.BigD ("-0.00001")).toString ()).toEqual ("1");
    expect (JSBD.add (JSBD.BigD ("1000.00001"), JSBD.BigD ("-1.00001")).toString ()).toEqual ("999");

    expect (JSBD.add (JSBD.BigD ("1000.00001"), JSBD.BigD ("-1000.00002")).toString ()).toEqual ("-0.00001");
    expect (JSBD.add (JSBD.BigD ("1000.01001"), JSBD.BigD ("-1000.00002")).toString ()).toEqual ("0.00999");
    expect (JSBD.add (JSBD.BigD ("1000.01001"), JSBD.BigD ("-1000.01002")).toString ()).toEqual ("-0.00001");
    expect (JSBD.add (JSBD.BigD ("1000.01001"), JSBD.BigD ("-1000.02000")).toString ()).toEqual ("-0.00999");
    expect (JSBD.add (JSBD.BigD ("1000.01001"), JSBD.BigD ("-1000.01001")).toString ()).toEqual ("0");
    expect (JSBD.add (JSBD.BigD ("1000.00001"), JSBD.BigD ("-2000.00002")).toString ()).toEqual ("-1000.00001");

    expect (JSBD.add (JSBD.BigD ("-1000.00001"), JSBD.BigD ("1000.00002")).toString ()).toEqual ("0.00001");
    expect (JSBD.add (JSBD.BigD ("-1000.01001"), JSBD.BigD ("1000.00002")).toString ()).toEqual ("-0.00999");
    expect (JSBD.add (JSBD.BigD ("-1000.01001"), JSBD.BigD ("1000.01002")).toString ()).toEqual ("0.00001");
    expect (JSBD.add (JSBD.BigD ("-1000.01001"), JSBD.BigD ("1000.02000")).toString ()).toEqual ("0.00999");
    expect (JSBD.add (JSBD.BigD ("-1000.01001"), JSBD.BigD ("1000.01001")).toString ()).toEqual ("0");
    expect (JSBD.add (JSBD.BigD ("-1000.00001"), JSBD.BigD ("2000.00002")).toString ()).toEqual ("1000.00001");

    expect (JSBD.add (JSBD.BigD ("-1000.00001"), JSBD.BigD ("-1000.00002")).toString ()).toEqual ("-2000.00003");
    expect (JSBD.add (JSBD.BigD ("-1000.01001"), JSBD.BigD ("-1000.00002")).toString ()).toEqual ("-2000.01003");
    expect (JSBD.add (JSBD.BigD ("-1000.01001"), JSBD.BigD ("-1000.01002")).toString ()).toEqual ("-2000.02003");
    expect (JSBD.add (JSBD.BigD ("-1000.01001"), JSBD.BigD ("-1000.02000")).toString ()).toEqual ("-2000.03001");
    expect (JSBD.add (JSBD.BigD ("-1000.01001"), JSBD.BigD ("-1000.01001")).toString ()).toEqual ("-2000.02002");
    expect (JSBD.add (JSBD.BigD ("-1000.00001"), JSBD.BigD ("-2000.00002")).toString ()).toEqual ("-3000.00003");

    expect (JSBD.add (JSBD.BigD ("0.1"), JSBD.BigD ("0.01"), {roundingIncrement: 2, maximumFractionDigits: 2}).toString ()).toEqual ("0.12");
    expect (JSBD.add (JSBD.BigD ("1.57642"), JSBD.BigD ("9.50956"), {roundingIncrement: 2, maximumFractionDigits: 3}).toString ()).toEqual ("11.086");
    expect (JSBD.add (JSBD.BigD ("0.01001"), JSBD.BigD ("-0.01001"), {roundingIncrement: 2, maximumFractionDigits: 3}).toString ()).toEqual ("0");
    expect (JSBD.add (JSBD.BigD ("1000.00001"), JSBD.BigD ("-2000.00002"), {roundingIncrement: 2, maximumFractionDigits: 3}).toString ()).toEqual ("-1000");
    expect (JSBD.add (JSBD.BigD ("-1000.01001"), JSBD.BigD ("1000.00002"), {roundingIncrement: 2, maximumFractionDigits: 3}).toString ()).toEqual ("-0.01");
    expect (JSBD.add (JSBD.BigD ("-1000.01001"), JSBD.BigD ("-1000.02000"), {roundingIncrement: 2, maximumFractionDigits: 3}).toString ()).toEqual ("-2000.03");
    
    expect (JSBD.add (JSBD.BigD ("0.999999999999999999999999999999999999999999999"), JSBD.BigD ("0.000000000000000000000000000000000000000000001")).toString ()).toEqual ("1");
}


//#######################################################
//#################### - SUBTRACT - #####################
//#######################################################
//############# let num = 1.23m - 1.23m #################
{
    expect (JSBD.subtract (JSBD.BigD ("0"), JSBD.BigD ("0")).toString ()).toEqual ("0");
    expect (JSBD.subtract (JSBD.BigD ("0.01"), JSBD.BigD ("0.01")).toString ()).toEqual ("0");
    expect (JSBD.subtract (JSBD.BigD ("0.1"), JSBD.BigD ("0.01")).toString ()).toEqual ("0.09");
    expect (JSBD.subtract (JSBD.BigD ("1"), JSBD.BigD ("0.01")).toString ()).toEqual ("0.99");
    expect (JSBD.subtract (JSBD.BigD ("10"), JSBD.BigD ("0.01")).toString ()).toEqual ("9.99");

    expect (JSBD.subtract (JSBD.BigD ("0.01"), JSBD.BigD ("0.99")).toString ()).toEqual ("-0.98");
    expect (JSBD.subtract (JSBD.BigD ("0.01"), JSBD.BigD ("0.1")).toString ()).toEqual ("-0.09");
    expect (JSBD.subtract (JSBD.BigD ("0.01"), JSBD.BigD ("1")).toString ()).toEqual ("-0.99");
    expect (JSBD.subtract (JSBD.BigD ("0.01"), JSBD.BigD ("10")).toString ()).toEqual ("-9.99");

    expect (JSBD.subtract (JSBD.BigD ("3.4583"), JSBD.BigD ("19.432")).toString ()).toEqual ("-15.9737");
    expect (JSBD.subtract (JSBD.BigD ("1.57642"), JSBD.BigD ("9.50956")).toString ()).toEqual ("-7.93314");
    expect (JSBD.subtract (JSBD.BigD ("7.837343"), JSBD.BigD ("3.2874")).toString ()).toEqual ("4.549943");
    expect (JSBD.subtract (JSBD.BigD ("2.733832"), JSBD.BigD ("7.266168")).toString ()).toEqual ("-4.532336");

    expect (JSBD.subtract (JSBD.BigD ("1.00001"), JSBD.BigD ("-0.00001")).toString ()).toEqual ("1.00002");
    expect (JSBD.subtract (JSBD.BigD ("0.01001"), JSBD.BigD ("-0.00001")).toString ()).toEqual ("0.01002");
    expect (JSBD.subtract (JSBD.BigD ("0.01001"), JSBD.BigD ("-0.01001")).toString ()).toEqual ("0.02002");
    expect (JSBD.subtract (JSBD.BigD ("1.00001"), JSBD.BigD ("-0.00001")).toString ()).toEqual ("1.00002");
    expect (JSBD.subtract (JSBD.BigD ("1000.00001"), JSBD.BigD ("-1.00001")).toString ()).toEqual ("1001.00002");

    expect (JSBD.subtract (JSBD.BigD ("1000.00001"), JSBD.BigD ("-1000.00002")).toString ()).toEqual ("2000.00003");
    expect (JSBD.subtract (JSBD.BigD ("1000.01001"), JSBD.BigD ("-1000.00002")).toString ()).toEqual ("2000.01003");
    expect (JSBD.subtract (JSBD.BigD ("1000.01001"), JSBD.BigD ("-1000.01002")).toString ()).toEqual ("2000.02003");
    expect (JSBD.subtract (JSBD.BigD ("1000.01001"), JSBD.BigD ("-1000.02000")).toString ()).toEqual ("2000.03001");
    expect (JSBD.subtract (JSBD.BigD ("1000.01001"), JSBD.BigD ("-1000.01001")).toString ()).toEqual ("2000.02002");
    expect (JSBD.subtract (JSBD.BigD ("1000.00001"), JSBD.BigD ("-2000.00002")).toString ()).toEqual ("3000.00003");

    expect (JSBD.subtract (JSBD.BigD ("-1000.00001"), JSBD.BigD ("1000.00002")).toString ()).toEqual ("-2000.00003");
    expect (JSBD.subtract (JSBD.BigD ("-1000.01001"), JSBD.BigD ("1000.00002")).toString ()).toEqual ("-2000.01003");
    expect (JSBD.subtract (JSBD.BigD ("-1000.01001"), JSBD.BigD ("1000.01002")).toString ()).toEqual ("-2000.02003");
    expect (JSBD.subtract (JSBD.BigD ("-1000.01001"), JSBD.BigD ("1000.02000")).toString ()).toEqual ("-2000.03001");
    expect (JSBD.subtract (JSBD.BigD ("-1000.01001"), JSBD.BigD ("1000.01001")).toString ()).toEqual ("-2000.02002");
    expect (JSBD.subtract (JSBD.BigD ("-1000.00001"), JSBD.BigD ("2000.00002")).toString ()).toEqual ("-3000.00003");

    expect (JSBD.subtract (JSBD.BigD ("-1000.00001"), JSBD.BigD ("-1000.00002")).toString ()).toEqual ("0.00001");
    expect (JSBD.subtract (JSBD.BigD ("-1000.01001"), JSBD.BigD ("-1000.00002")).toString ()).toEqual ("-0.00999");
    expect (JSBD.subtract (JSBD.BigD ("-1000.01001"), JSBD.BigD ("-1000.01002")).toString ()).toEqual ("0.00001");
    expect (JSBD.subtract (JSBD.BigD ("-1000.01001"), JSBD.BigD ("-1000.02000")).toString ()).toEqual ("0.00999");
    expect (JSBD.subtract (JSBD.BigD ("-1000.01001"), JSBD.BigD ("-1000.01001")).toString ()).toEqual ("0");
    expect (JSBD.subtract (JSBD.BigD ("-1000.00001"), JSBD.BigD ("-2000.00002")).toString ()).toEqual ("1000.00001");

    expect (JSBD.subtract (JSBD.BigD ("0.1"), JSBD.BigD ("0.01"), {roundingIncrement: 2, maximumFractionDigits: 2}).toString ()).toEqual ("0.1");
    expect (JSBD.subtract (JSBD.BigD ("1.57642"), JSBD.BigD ("9.50956"), {roundingIncrement: 2, maximumFractionDigits: 3}).toString ()).toEqual ("-7.934");
    expect (JSBD.subtract (JSBD.BigD ("0.01001"), JSBD.BigD ("-0.01001"), {roundingIncrement: 2, maximumFractionDigits: 3}).toString ()).toEqual ("0.02");
    expect (JSBD.subtract (JSBD.BigD ("1000.00001"), JSBD.BigD ("-2000.00002"), {roundingIncrement: 2, maximumFractionDigits: 3}).toString ()).toEqual ("3000");
    expect (JSBD.subtract (JSBD.BigD ("-1000.01001"), JSBD.BigD ("1000.00002"), {roundingIncrement: 2, maximumFractionDigits: 2}).toString ()).toEqual ("-2000.02");
    expect (JSBD.subtract (JSBD.BigD ("-1000.01001"), JSBD.BigD ("-1000.02000"), {roundingIncrement: 2, maximumFractionDigits: 3}).toString ()).toEqual ("0.01");

    expect (JSBD.subtract (JSBD.BigD ("1"), JSBD.BigD ("0.000000000000000000000000000000000000000000001")).toString ()).toEqual ("0.999999999999999999999999999999999999999999999");
}


//#######################################################
//#################### * MULTIPLY * #####################
//#######################################################
//############# let num = 1.23m * 1.23m #################
{
    expect (JSBD.multiply (JSBD.BigD ("0"), JSBD.BigD ("0")).toString ()).toEqual ("0");
    expect (JSBD.multiply (JSBD.BigD ("0.01"), JSBD.BigD ("0.01")).toString ()).toEqual ("0.0001");
    expect (JSBD.multiply (JSBD.BigD ("0.1"), JSBD.BigD ("0.01")).toString ()).toEqual ("0.001");
    expect (JSBD.multiply (JSBD.BigD ("1"), JSBD.BigD ("0.01")).toString ()).toEqual ("0.01");
    expect (JSBD.multiply (JSBD.BigD ("10"), JSBD.BigD ("0.01")).toString ()).toEqual ("0.1");

    expect (JSBD.multiply (JSBD.BigD ("0.01"), JSBD.BigD ("0.99")).toString ()).toEqual ("0.0099");
    expect (JSBD.multiply (JSBD.BigD ("0.01"), JSBD.BigD ("0.1")).toString ()).toEqual ("0.001");
    expect (JSBD.multiply (JSBD.BigD ("0.01"), JSBD.BigD ("1")).toString ()).toEqual ("0.01");
    expect (JSBD.multiply (JSBD.BigD ("0.01"), JSBD.BigD ("10")).toString ()).toEqual ("0.1");

    expect (JSBD.multiply (JSBD.BigD ("3.4583"), JSBD.BigD ("19.432")).toString ()).toEqual ("67.2016856");
    expect (JSBD.multiply (JSBD.BigD ("1.57642"), JSBD.BigD ("9.50956")).toString ()).toEqual ("14.9910605752");
    expect (JSBD.multiply (JSBD.BigD ("7.837343"), JSBD.BigD ("3.2874")).toString ()).toEqual ("25.7644813782");
    expect (JSBD.multiply (JSBD.BigD ("2.733832"), JSBD.BigD ("7.266168")).toString ()).toEqual ("19.864482595776");

    expect (JSBD.multiply (JSBD.BigD ("1000.00001"), JSBD.BigD ("-1000.00002")).toString ()).toEqual ("-1000000.0300000002");
    expect (JSBD.multiply (JSBD.BigD ("1000.00001"), JSBD.BigD ("-2000.00002")).toString ()).toEqual ("-2000000.0400000002");

    expect (JSBD.multiply (JSBD.BigD ("-1000.00001"), JSBD.BigD ("1000.00002")).toString ()).toEqual ("-1000000.0300000002");
    expect (JSBD.multiply (JSBD.BigD ("-1000.00001"), JSBD.BigD ("2000.00002")).toString ()).toEqual ("-2000000.0400000002");

    expect (JSBD.multiply (JSBD.BigD ("-1000.00001"), JSBD.BigD ("-1000.00002")).toString ()).toEqual ("1000000.0300000002");
    expect (JSBD.multiply (JSBD.BigD ("-1000.00001"), JSBD.BigD ("-2000.00002")).toString ()).toEqual ("2000000.0400000002");

    expect (JSBD.multiply (JSBD.BigD ("0.25"), JSBD.BigD ("4")).toString ()).toEqual ("1");
    expect (JSBD.multiply (JSBD.BigD ("0.125"), JSBD.BigD ("8")).toString ()).toEqual ("1");
    expect (JSBD.multiply (JSBD.BigD ("0.000001"), JSBD.BigD ("1000000")).toString ()).toEqual ("1");

    expect (JSBD.multiply (JSBD.BigD ("4"), JSBD.BigD ("0.25")).toString ()).toEqual ("1");
    expect (JSBD.multiply (JSBD.BigD ("8"), JSBD.BigD ("0.125")).toString ()).toEqual ("1");
    expect (JSBD.multiply (JSBD.BigD ("1000000"), JSBD.BigD ("0.000001")).toString ()).toEqual ("1");


    expect (JSBD.multiply (JSBD.BigD ("0.01"), JSBD.BigD ("0.01"), {roundingIncrement: 2, maximumFractionDigits: 2}).toString ()).toEqual ("0");
    expect (JSBD.multiply (JSBD.BigD ("1.57642"), JSBD.BigD ("9.50956"), {roundingIncrement: 2, maximumFractionDigits: 7}).toString ()).toEqual ("14.9910606");
    expect (JSBD.multiply (JSBD.BigD ("1000.00001"), JSBD.BigD ("-1000.00002"), {roundingIncrement: 2, maximumFractionDigits: 2}).toString ()).toEqual ("-1000000.04");
    expect (JSBD.multiply (JSBD.BigD ("8"), JSBD.BigD ("0.125"), {roundingIncrement: 2, maximumFractionDigits: 0}).toString ()).toEqual ("2");
    expect (JSBD.multiply (JSBD.BigD ("-1000.00001"), JSBD.BigD ("-2000.00002"), {roundingIncrement: 2, maximumFractionDigits: 2}).toString ()).toEqual ("2000000.04");

    expect (JSBD.multiply (JSBD.BigD ("1"), JSBD.BigD ("1.0000000000000000000000000000000000000000000000001")).toString ()).toEqual ("1.0000000000000000000000000000000000000000000000001");
}


//#######################################################
//#################### / DIVIDE / #######################
//#######################################################
//############# let num = 1.23m / 1.23m #################
{
    //divide defaults to maxFractionDigits = 34, for output
    expect (JSBD.divide (JSBD.BigD ("1"), JSBD.BigD ("0.01")).toString ()).toEqual ("100");
    expect (JSBD.divide (JSBD.BigD ("0.01"), JSBD.BigD ("0.01")).toString ()).toEqual ("1");
    expect (JSBD.divide (JSBD.BigD ("0"), JSBD.BigD ("0.00001")).toString ()).toEqual ("0");
    expect (JSBD.divide (JSBD.BigD ("0"), JSBD.BigD ("-0.00001")).toString ()).toEqual ("0");

    expect (JSBD.divide (JSBD.BigD ("1"), JSBD.BigD ("2")).toString ()).toEqual ("0.5");
    expect (JSBD.divide (JSBD.BigD ("1"), JSBD.BigD ("69")).toString ()).toEqual ("0.0144927536231884057971014492753623");

    expect (JSBD.divide (JSBD.BigD ("1"), JSBD.BigD ("10000000000000000000000000000000000")).toString ()).toEqual ("0.0000000000000000000000000000000001");

    //
    //Issues?
    //

    //Inputs in divide aren't truncated, only output, so 0.(39[0])1 / 0.(39[0])1 works just fine even tho its above the 34 default maxFractionDigits
    expect (JSBD.divide (JSBD.BigD ("0.0000000000000000000000000000000000000001"), JSBD.BigD ("0.0000000000000000000000000000000000000001")).toString ()).toEqual ("1");

    //Is returning 0 acceptable?                            1 with 35 zeros
    expect (JSBD.divide (JSBD.BigD ("1"), JSBD.BigD ("100000000000000000000000000000000000")).toString ()).toEqual ("0");

    expect (JSBD.divide (JSBD.BigD ("1"), JSBD.BigD ("696969696969696969696969696969696969"), {
        maximumFractionDigits: 40
    }).toString ()).toEqual ("0.0000000000000000000000000000000000014348");

    expect (JSBD.divide (JSBD.BigD ("1"), JSBD.BigD ("696969696969696969696969696969696969"), {
        maximumFractionDigits: 41
    }).toString ()).toEqual ("0.00000000000000000000000000000000000143478");

    //Note how above with 40 digits its ....14348
    //whereas with 41 digits it's ..........143478
    //This is due to how I implemented rounding in division.
    //Within the divide function, it will perform the division with `maximumFractionDigits` + 1 as precision
    //and then pass `maximumFractionDigits` into the rounding function
    //So using 40 fraction digits, the divide function will pass 41 digits of precision (...143478) into round
    //with 40 specified as the output, which produces (...14348), rounding the 7 up to 8
    //This is also how it works when no rounding options are provided. It divides with precision 35 and then rounds
    //to precision 34

    expect (JSBD.divide (JSBD.BigD ("1"), JSBD.BigD ("3")).toString ()).toEqual ("0.3333333333333333333333333333333333");
    expect (JSBD.divide (JSBD.BigD ("1"), JSBD.BigD ("6")).toString ()).toEqual ("0.1666666666666666666666666666666667");

    //With default roundingMode and increment, halfExpand and 1
    //This is why 1 / 3 round to ...333
    //And 1 / 6 rounds up to .......667
    //This is because with 1/3, the last digits in the divide are 3333, last digit is below 5 so it rounds down to 333
    //And with 1/6, the last digits in the divide are 6666, and the last digit is 6, which is >= 5, so it rounds up to 667

    //Obviously this changes depending on the roundingOptions, but the maximumFractionDigits is always +1 in the division

    expect (JSBD.divide (JSBD.BigD ("69"), JSBD.BigD ("0.5")).toString ()).toEqual ("138");
    expect (JSBD.divide (JSBD.BigD ("69"), JSBD.BigD ("1")).toString ()).toEqual ("69");
    expect (JSBD.divide (JSBD.BigD ("69"), JSBD.BigD ("2")).toString ()).toEqual ("34.5");
    expect (JSBD.divide (JSBD.BigD ("840"), JSBD.BigD ("2")).toString ()).toEqual ("420");
    expect (JSBD.divide (JSBD.BigD ("210"), JSBD.BigD ("0.5")).toString ()).toEqual ("420");

    expect (JSBD.divide (JSBD.BigD ("3.4583"), JSBD.BigD ("19.432")).toString ()).toEqual ("0.177969328941951420337587484561548");
    expect (JSBD.divide (JSBD.BigD ("1.57642"), JSBD.BigD ("9.50956")).toString ()).toEqual ("0.1657721282583000685625833371891023");
    expect (JSBD.divide (JSBD.BigD ("7.837343"), JSBD.BigD ("3.2874")).toString ()).toEqual ("2.3840551803857151548336071059195717");

    expect (() => JSBD.divide (JSBD.BigD ("0"), JSBD.BigD ("0")).toString ()).toThrow ("Division by zero");
}


//#######################################################
//################# ** EXPONENTIATE ** ##################
//#######################################################
//############## let num = 1.23m ** 2m ##################
//############## let num = 10m ** -2m ###################
//############ let num = (-10m) ** -2m ##################
{
    expect (JSBD.exponentiate (JSBD.BigD ("0"), JSBD.BigD ("0")).toString ()).toEqual ("1");
    expect (JSBD.exponentiate (JSBD.BigD ("0"), JSBD.BigD ("1")).toString ()).toEqual ("0");
    expect (JSBD.exponentiate (JSBD.BigD ("1"), JSBD.BigD ("0")).toString ()).toEqual ("1");
    expect (JSBD.exponentiate (JSBD.BigD ("1"), JSBD.BigD ("69")).toString ()).toEqual ("1");
    expect (JSBD.exponentiate (JSBD.BigD ("2"), JSBD.BigD ("0")).toString ()).toEqual ("1");
    expect (JSBD.exponentiate (JSBD.BigD ("2"), JSBD.BigD ("1")).toString ()).toEqual ("2");
    expect (JSBD.exponentiate (JSBD.BigD ("2"), JSBD.BigD ("2")).toString ()).toEqual ("4");
    expect (JSBD.exponentiate (JSBD.BigD ("2"), JSBD.BigD ("3")).toString ()).toEqual ("8");
    expect (JSBD.exponentiate (JSBD.BigD ("2"), JSBD.BigD ("32")).toString ()).toEqual ("4294967296");
    expect (JSBD.exponentiate (JSBD.BigD ("10"), JSBD.BigD ("1")).toString ()).toEqual ("10");
    expect (JSBD.exponentiate (JSBD.BigD ("10"), JSBD.BigD ("2")).toString ()).toEqual ("100");
    expect (JSBD.exponentiate (JSBD.BigD ("10"), JSBD.BigD ("3")).toString ()).toEqual ("1000");
    expect (JSBD.exponentiate (JSBD.BigD ("10"), JSBD.BigD ("4")).toString ()).toEqual ("10000");

    expect (JSBD.exponentiate (JSBD.BigD ("-1"), JSBD.BigD ("0")).toString ()).toEqual ("1");
    expect (JSBD.exponentiate (JSBD.BigD ("-1"), JSBD.BigD ("69")).toString ()).toEqual ("-1");
    expect (JSBD.exponentiate (JSBD.BigD ("-2"), JSBD.BigD ("0")).toString ()).toEqual ("1");
    expect (JSBD.exponentiate (JSBD.BigD ("-2"), JSBD.BigD ("2")).toString ()).toEqual ("4");
    expect (JSBD.exponentiate (JSBD.BigD ("-2"), JSBD.BigD ("3")).toString ()).toEqual ("-8");
    expect (JSBD.exponentiate (JSBD.BigD ("-2"), JSBD.BigD ("4")).toString ()).toEqual ("16");
    expect (JSBD.exponentiate (JSBD.BigD ("-2"), JSBD.BigD ("32")).toString ()).toEqual ("4294967296");
    expect (JSBD.exponentiate (JSBD.BigD ("-10"), JSBD.BigD ("1")).toString ()).toEqual ("-10");
    expect (JSBD.exponentiate (JSBD.BigD ("-10"), JSBD.BigD ("2")).toString ()).toEqual ("100");
    expect (JSBD.exponentiate (JSBD.BigD ("-10"), JSBD.BigD ("3")).toString ()).toEqual ("-1000");
    expect (JSBD.exponentiate (JSBD.BigD ("-10"), JSBD.BigD ("4")).toString ()).toEqual ("10000");

    expect (JSBD.exponentiate (JSBD.BigD ("-2.267"), JSBD.BigD ("0")).toString ()).toEqual ("1");
    expect (JSBD.exponentiate (JSBD.BigD ("2.267"), JSBD.BigD ("0")).toString ()).toEqual ("1");
    expect (JSBD.exponentiate (JSBD.BigD ("2.267"), JSBD.BigD ("1")).toString ()).toEqual ("2.267");
    expect (JSBD.exponentiate (JSBD.BigD ("2.267"), JSBD.BigD ("2")).toString ()).toEqual ("5.139289");

    expect (JSBD.exponentiate (JSBD.BigD ("-0.0267"), JSBD.BigD ("0")).toString ()).toEqual ("1");
    expect (JSBD.exponentiate (JSBD.BigD ("0.0267"), JSBD.BigD ("0")).toString ()).toEqual ("1");
    expect (JSBD.exponentiate (JSBD.BigD ("0.0267"), JSBD.BigD ("1")).toString ()).toEqual ("0.0267");
    expect (JSBD.exponentiate (JSBD.BigD ("0.0267"), JSBD.BigD ("2")).toString ()).toEqual ("0.00071289");

    expect (JSBD.exponentiate (JSBD.BigD ("-3.5619"), JSBD.BigD ("1")).toString ()).toEqual ("-3.5619");
    expect (JSBD.exponentiate (JSBD.BigD ("-3.5619"), JSBD.BigD ("10")).toString ()).toEqual ("328713.2613156133916422721655389707610235");
    expect (JSBD.exponentiate (JSBD.BigD ("-3.5619"), JSBD.BigD ("11")).toString ()).toEqual ("-1170843.7654800833396906092264332599536895");

    expect (JSBD.exponentiate (JSBD.BigD ("10"), JSBD.BigD ("4")).toString ()).toEqual ("10000");

    //oh dear oh dear. We seem to have struck an issue here (I'm writing this as I discovered)
    //As you can imagine, the following produces an ungodly amount of decimal places...
    //Looks like our trusty 34 default precision is coming back to play
    //I will write a follow up comment once I have fixed...
    expect (JSBD.exponentiate (JSBD.BigD ("1.0001"), JSBD.BigD ("10000")).toString ()).toEqual ("2.7181459268252248640376646749131451");


    //And now it is fixed. It is now an iterative process. see #DoExpIterations and #CalcExpIterationStep for
    //implementation
    //An overview, simplified with no decimal places
    //*NOTES*
    //lhs will be truncated to maxFractionDigits (default 34), regardless. Even if we're raising to power 1
    //both when rhs is positive and negative

    //Say we want 2 ^ 350
    //get floored log of 350 = 2
    //Get nearest power of 10 to 350 using log to raise 10 x times = 10^10 = 100
    //Get floored amount of times nearest power of 10 goes into 350 = floor (350 / 100) = 3
    //Get "remaining" power of = 350 % 100 = 50
    //
    //Now do 2 interations:
        //1: 2 ^ 10 = 1024   --  (then trunc decimal precision when we have decimals)
        //2: 1024 ^ 10 = 1,267,650,600,228,229,401,496,703,205,376   --   (then trunc decimal precision when we have decimals)
    //Now we take that result and raise to ^ 3 
        //1,267,650,600,228,229,401,496,703,205,376 ^ 3 = *big number*   --  (then trunc decimal precision when we have decimals)
    //
    //And now we store *big number*
    //
    //And repeat the whole process above for the 50 powers remaining
    //*Note that we repeat the process with our original base (2)*
    //And then multiply that result with *big number*
    //Rince and repeat until 0 powers remain
    //This process only happens when the base has decimal places, this example is using integers for simplicity
    //For integer bases, or calculations that wouldn't result in > 34 decimal places, this won't happen
    //Results match that of windows 10 calculator, apart from we have a few extra digits of precision

    expect (JSBD.exponentiate (JSBD.BigD ("1.001"), JSBD.BigD ("26785")).toString ()).toEqual ("423414068120.105408285032066621609826005065084");
    expect (JSBD.exponentiate (JSBD.BigD ("1.0001"), JSBD.BigD ("26785")).toString ()).toEqual ("14.5612819357075680305043305169941141");
    expect (JSBD.exponentiate (JSBD.BigD ("1.0001"), JSBD.BigD ("123673")).toString ()).toEqual ("234845.1585622225832617485291964320780273");

    expect (JSBD.exponentiate (JSBD.BigD ("1.00000000000000000001"), JSBD.BigD ("100")).toString ()).toEqual ("1.000000000000000001");

    expect (() => JSBD.exponentiate (JSBD.BigD ("0"), JSBD.BigD ("-1")).toString ()).toThrow ("Left hand side must be non zero when raising to a negative power");

    expect (JSBD.exponentiate (JSBD.BigD ("1"), JSBD.BigD ("-1")).toString ()).toEqual ("1");
    expect (JSBD.exponentiate (JSBD.BigD ("1"), JSBD.BigD ("-2")).toString ()).toEqual ("1");
    expect (JSBD.exponentiate (JSBD.BigD ("1"), JSBD.BigD ("-3")).toString ()).toEqual ("1");

    expect (JSBD.exponentiate (JSBD.BigD ("2"), JSBD.BigD ("-1")).toString ()).toEqual ("0.5");
    expect (JSBD.exponentiate (JSBD.BigD ("2"), JSBD.BigD ("-2")).toString ()).toEqual ("0.25");
    expect (JSBD.exponentiate (JSBD.BigD ("2"), JSBD.BigD ("-3")).toString ()).toEqual ("0.125");
    expect (JSBD.exponentiate (JSBD.BigD ("2"), JSBD.BigD ("-4")).toString ()).toEqual ("0.0625");
    expect (JSBD.exponentiate (JSBD.BigD ("2"), JSBD.BigD ("-32")).toString ()).toEqual ("0.00000000023283064365386962890625");
    expect (JSBD.exponentiate (JSBD.BigD ("2"), JSBD.BigD ("-64")).toString ()).toEqual ("0.0000000000000000000542101086242752");

    expect (JSBD.exponentiate (JSBD.BigD ("3"), JSBD.BigD ("-1")).toString ()).toEqual ("0.3333333333333333333333333333333333");
    expect (JSBD.exponentiate (JSBD.BigD ("3"), JSBD.BigD ("-2")).toString ()).toEqual ("0.1111111111111111111111111111111111");
    expect (JSBD.exponentiate (JSBD.BigD ("3"), JSBD.BigD ("-3")).toString ()).toEqual ("0.037037037037037037037037037037037");
    expect (JSBD.exponentiate (JSBD.BigD ("3"), JSBD.BigD ("-4")).toString ()).toEqual ("0.0123456790123456790123456790123457"); //oh numbers are cool sometimes

    expect (JSBD.exponentiate (JSBD.BigD ("10"), JSBD.BigD ("-1")).toString ()).toEqual ("0.1");
    expect (JSBD.exponentiate (JSBD.BigD ("10"), JSBD.BigD ("-2")).toString ()).toEqual ("0.01");
    expect (JSBD.exponentiate (JSBD.BigD ("10"), JSBD.BigD ("-3")).toString ()).toEqual ("0.001");
    expect (JSBD.exponentiate (JSBD.BigD ("10"), JSBD.BigD ("-4")).toString ()).toEqual ("0.0001");
    expect (JSBD.exponentiate (JSBD.BigD ("10"), JSBD.BigD ("-32")).toString ()).toEqual ("0.00000000000000000000000000000001");
    expect (JSBD.exponentiate (JSBD.BigD ("10"), JSBD.BigD ("-64")).toString ()).toEqual ("0");

    expect (JSBD.exponentiate (JSBD.BigD ("4.7396"), JSBD.BigD ("-1")).toString ()).toEqual ("0.2109882690522406954173347961853321");
    expect (JSBD.exponentiate (JSBD.BigD ("4.7396"), JSBD.BigD ("-2")).toString ()).toEqual ("0.0445160496776607087976484927389088");
    expect (JSBD.exponentiate (JSBD.BigD ("4.7396182641"), JSBD.BigD ("-2")).toString ()).toEqual ("0.044515706593483427190374187190008");
    expect (JSBD.exponentiate (JSBD.BigD ("4.7396"), JSBD.BigD ("-3")).toString ()).toEqual ("0.0093923642665331903109225446744259");
    expect (JSBD.exponentiate (JSBD.BigD ("4.7396"), JSBD.BigD ("-4")).toString ()).toEqual ("0.0019816786789039560956457390232142");

    expect (JSBD.exponentiate (JSBD.BigD ("4.7396"), JSBD.BigD ("-10")).toString ()).toEqual ("0.0000001748167700886619718175030903");
    expect (JSBD.exponentiate (JSBD.BigD ("4.7396"), JSBD.BigD ("-20")).toString ()).toEqual ("0.0000000000000305609031042320990778");
    expect (JSBD.exponentiate (JSBD.BigD ("4.7396"), JSBD.BigD ("-60")).toString ()).toEqual ("0");

    expect (JSBD.exponentiate (JSBD.BigD ("-4.7396"), JSBD.BigD ("-1")).toString ()).toEqual ("-0.2109882690522406954173347961853321");
    expect (JSBD.exponentiate (JSBD.BigD ("-4.7396"), JSBD.BigD ("-2")).toString ()).toEqual ("0.0445160496776607087976484927389088");
    expect (JSBD.exponentiate (JSBD.BigD ("-4.7396182641"), JSBD.BigD ("-2")).toString ()).toEqual ("0.044515706593483427190374187190008");
    expect (JSBD.exponentiate (JSBD.BigD ("-4.7396"), JSBD.BigD ("-3")).toString ()).toEqual ("-0.0093923642665331903109225446744259");
    expect (JSBD.exponentiate (JSBD.BigD ("-4.7396"), JSBD.BigD ("-4")).toString ()).toEqual ("0.0019816786789039560956457390232142");

    expect (JSBD.exponentiate (JSBD.BigD ("-4.7396"), JSBD.BigD ("-11")).toString ()).toEqual ("-0.0000000368842877223103155999457951");
    expect (JSBD.exponentiate (JSBD.BigD ("-4.7396"), JSBD.BigD ("-20")).toString ()).toEqual ("0.0000000000000305609031042320990778");
    expect (JSBD.exponentiate (JSBD.BigD ("-4.7396"), JSBD.BigD ("-61")).toString ()).toEqual ("0");
}


//#######################################################
//################# % REMAINDER % #######################
//#######################################################
//############# let num = 1.23m % 0.12m #################
{
    expect (JSBD.remainder (JSBD.BigD ("1"), JSBD.BigD ("1")).toString ()).toEqual ("0");
    expect (JSBD.remainder (JSBD.BigD ("1"), JSBD.BigD ("3")).toString ()).toEqual ("1");
    expect (JSBD.remainder (JSBD.BigD ("4"), JSBD.BigD ("2")).toString ()).toEqual ("0");
    expect (JSBD.remainder (JSBD.BigD ("27"), JSBD.BigD ("4")).toString ()).toEqual ("3");

    expect (JSBD.remainder (JSBD.BigD ("-1"), JSBD.BigD ("4")).toString ()).toEqual ("-1");
    expect (JSBD.remainder (JSBD.BigD ("-2"), JSBD.BigD ("4")).toString ()).toEqual ("-2");
    expect (JSBD.remainder (JSBD.BigD ("-27"), JSBD.BigD ("4")).toString ()).toEqual ("-3");
    expect (JSBD.remainder (JSBD.BigD ("-99"), JSBD.BigD ("2000")).toString ()).toEqual ("-99");

    expect (JSBD.remainder (JSBD.BigD ("1.2461"), JSBD.BigD ("1")).toString ()).toEqual ("0.2461");
    expect (JSBD.remainder (JSBD.BigD ("4.2674"), JSBD.BigD ("2.3745193")).toString ()).toEqual ("1.8928807");
    expect (JSBD.remainder (JSBD.BigD ("1.9832"), JSBD.BigD ("24.7214")).toString ()).toEqual ("1.9832");
    expect (JSBD.remainder (JSBD.BigD ("27.999"), JSBD.BigD ("4.001")).toString ()).toEqual ("3.993");

    expect (JSBD.remainder (JSBD.BigD ("-1.2461"), JSBD.BigD ("1")).toString ()).toEqual ("-0.2461");
    expect (JSBD.remainder (JSBD.BigD ("-4.2674"), JSBD.BigD ("2.3745193")).toString ()).toEqual ("-1.8928807");
    expect (JSBD.remainder (JSBD.BigD ("-1.9832"), JSBD.BigD ("24.7214")).toString ()).toEqual ("-1.9832");
    expect (JSBD.remainder (JSBD.BigD ("-27.999"), JSBD.BigD ("4.001")).toString ()).toEqual ("-3.993");

    expect (JSBD.remainder (JSBD.BigD ("1"), JSBD.BigD ("-1")).toString ()).toEqual ("0");
    expect (JSBD.remainder (JSBD.BigD ("1"), JSBD.BigD ("-3")).toString ()).toEqual ("1");
    expect (JSBD.remainder (JSBD.BigD ("4"), JSBD.BigD ("-2")).toString ()).toEqual ("0");
    expect (JSBD.remainder (JSBD.BigD ("27"), JSBD.BigD ("-4")).toString ()).toEqual ("3");

    expect (JSBD.remainder (JSBD.BigD ("-1"), JSBD.BigD ("-4")).toString ()).toEqual ("-1");
    expect (JSBD.remainder (JSBD.BigD ("-2"), JSBD.BigD ("-4")).toString ()).toEqual ("-2");
    expect (JSBD.remainder (JSBD.BigD ("-27"), JSBD.BigD ("-4")).toString ()).toEqual ("-3");
    expect (JSBD.remainder (JSBD.BigD ("-99"), JSBD.BigD ("-2000")).toString ()).toEqual ("-99");

    expect (JSBD.remainder (JSBD.BigD ("1.2461"), JSBD.BigD ("-1")).toString ()).toEqual ("0.2461");
    expect (JSBD.remainder (JSBD.BigD ("4.2674"), JSBD.BigD ("-2.3745193")).toString ()).toEqual ("1.8928807");
    expect (JSBD.remainder (JSBD.BigD ("1.9832"), JSBD.BigD ("-24.7214")).toString ()).toEqual ("1.9832");
    expect (JSBD.remainder (JSBD.BigD ("27.999"), JSBD.BigD ("-4.001")).toString ()).toEqual ("3.993");

    expect (JSBD.remainder (JSBD.BigD ("-1.2461"), JSBD.BigD ("-1")).toString ()).toEqual ("-0.2461");
    expect (JSBD.remainder (JSBD.BigD ("-4.2674"), JSBD.BigD ("-2.3745193")).toString ()).toEqual ("-1.8928807");
    expect (JSBD.remainder (JSBD.BigD ("-1.9832"), JSBD.BigD ("-24.7214")).toString ()).toEqual ("-1.9832");
    expect (JSBD.remainder (JSBD.BigD ("-27.999"), JSBD.BigD ("-4.001")).toString ()).toEqual ("-3.993");
}


//#######################################################
//################# - UNARY MINUS #######################
//#######################################################
//################ let num = -1.23m #####################
{
    expect (JSBD.unaryMinus (JSBD.BigD ("0")).toString ()).toEqual ("0");
    expect (JSBD.unaryMinus (JSBD.BigD ("-1")).toString ()).toEqual ("1");
    expect (JSBD.unaryMinus (JSBD.BigD ("-1.2461")).toString ()).toEqual ("1.2461");
    expect (JSBD.unaryMinus (JSBD.BigD ("-0.2461")).toString ()).toEqual ("0.2461");
    expect (JSBD.unaryMinus (JSBD.BigD ("-0.00000000000000000000000000000000000000001")).toString ()).toEqual ("0.00000000000000000000000000000000000000001");

    expect (JSBD.unaryMinus (JSBD.BigD ("1")).toString ()).toEqual ("-1");
    expect (JSBD.unaryMinus (JSBD.BigD ("1.2461")).toString ()).toEqual ("-1.2461");
    expect (JSBD.unaryMinus (JSBD.BigD ("0.2461")).toString ()).toEqual ("-0.2461");
    expect (JSBD.unaryMinus (JSBD.BigD ("0.00000000000000000000000000000000000000001")).toString ()).toEqual ("-0.00000000000000000000000000000000000000001");
}


//#######################################################
//################# ! LOGICAL NOT #######################
//#######################################################
//################ let num = !1.23m #####################
{
    expect (JSBD.logicalNot (JSBD.BigD ("1.23"))).toEqual (false);
    expect (JSBD.logicalNot (JSBD.BigD ("-1.23"))).toEqual (false);
    expect (JSBD.logicalNot (JSBD.BigD ("0"))).toEqual (true);
}

//#######################################################
//################ !! LOGICAL NOT 2 #####################
//#######################################################
//################ let num = !!1.23m ####################
{
    expect (JSBD.logicalNot2 (JSBD.BigD ("1.23"))).toEqual (true);
    expect (JSBD.logicalNot2 (JSBD.BigD ("-1.23"))).toEqual (true);
    expect (JSBD.logicalNot2 (JSBD.BigD ("0"))).toEqual (false);
}


//#######################################################
//################# < LESS THAN < #######################
//#######################################################
//############# let isLT = 0.23m < 1.23m ################
{
    expect (JSBD.lessThan (JSBD.BigD ("0"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.lessThan (JSBD.BigD ("1"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.lessThan (JSBD.BigD ("1"), JSBD.BigD ("2"))).toEqual (true);
    expect (JSBD.lessThan (JSBD.BigD ("2"), JSBD.BigD ("1"))).toEqual (false);

    expect (JSBD.lessThan (JSBD.BigD ("0"), JSBD.BigD ("-1"))).toEqual (false);
    expect (JSBD.lessThan (JSBD.BigD ("1"), JSBD.BigD ("-1"))).toEqual (false);
    expect (JSBD.lessThan (JSBD.BigD ("2"), JSBD.BigD ("-1"))).toEqual (false);

    expect (JSBD.lessThan (JSBD.BigD ("0"), JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.lessThan (JSBD.BigD ("-1"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.lessThan (JSBD.BigD ("-2"), JSBD.BigD ("1"))).toEqual (true);

    expect (JSBD.lessThan (JSBD.BigD ("-1"), JSBD.BigD ("-1"))).toEqual (false);
    expect (JSBD.lessThan (JSBD.BigD ("-2"), JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.lessThan (JSBD.BigD ("-3"), JSBD.BigD ("-4"))).toEqual (false);

    expect (JSBD.lessThan (JSBD.BigD ("0.0001"), JSBD.BigD ("0.1"))).toEqual (true);
    expect (JSBD.lessThan (JSBD.BigD ("0.0001"), JSBD.BigD ("0.0000001"))).toEqual (false);
    expect (JSBD.lessThan (JSBD.BigD ("1.5638"), JSBD.BigD ("1.5638"))).toEqual (false);
    expect (JSBD.lessThan (JSBD.BigD ("1.915"), JSBD.BigD ("2.62739"))).toEqual (true);
    expect (JSBD.lessThan (JSBD.BigD ("2.6969"), JSBD.BigD ("1.1526"))).toEqual (false);

    expect (JSBD.lessThan (JSBD.BigD ("0.999"), JSBD.BigD ("-1.61528"))).toEqual (false);
    expect (JSBD.lessThan (JSBD.BigD ("1.1367376"), JSBD.BigD ("-1.00000001"))).toEqual (false);
    expect (JSBD.lessThan (JSBD.BigD ("2.9"), JSBD.BigD ("-1.999999991"))).toEqual (false);

    expect (JSBD.lessThan (JSBD.BigD ("0.000001"), JSBD.BigD ("0.000001"))).toEqual (false);
    expect (JSBD.lessThan (JSBD.BigD ("-1.23456"), JSBD.BigD ("1.91929394"))).toEqual (true);
    expect (JSBD.lessThan (JSBD.BigD ("-2.002"), JSBD.BigD ("1.1943"))).toEqual (true);

    expect (JSBD.lessThan (JSBD.BigD ("-1.1110001"), JSBD.BigD ("-1.1110001"))).toEqual (false);
    expect (JSBD.lessThan (JSBD.BigD ("-2.22"), JSBD.BigD ("-1.11111111111111"))).toEqual (true);
    expect (JSBD.lessThan (JSBD.BigD ("-3.49012"), JSBD.BigD ("-4.202"))).toEqual (false);
}

//#######################################################
//############## <= LESS THAN EQUAL <= ##################
//#######################################################
//############ let isLTE = 0.23m <= 1.23m ###############
{
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("0"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("1"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("1"), JSBD.BigD ("2"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("2"), JSBD.BigD ("1"))).toEqual (false);

    expect (JSBD.lessThanOrEqual (JSBD.BigD ("0"), JSBD.BigD ("-1"))).toEqual (false);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("1"), JSBD.BigD ("-1"))).toEqual (false);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("2"), JSBD.BigD ("-1"))).toEqual (false);

    expect (JSBD.lessThanOrEqual (JSBD.BigD ("0"), JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("-1"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("-2"), JSBD.BigD ("1"))).toEqual (true);

    expect (JSBD.lessThanOrEqual (JSBD.BigD ("-1"), JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("-2"), JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("-3"), JSBD.BigD ("-4"))).toEqual (false);

    expect (JSBD.lessThanOrEqual (JSBD.BigD ("0.0001"), JSBD.BigD ("0.1"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("0.0001"), JSBD.BigD ("0.0000001"))).toEqual (false);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("1.5638"), JSBD.BigD ("1.5638"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("1.915"), JSBD.BigD ("2.62739"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("2.6969"), JSBD.BigD ("1.1526"))).toEqual (false);

    expect (JSBD.lessThanOrEqual (JSBD.BigD ("0.999"), JSBD.BigD ("-1.61528"))).toEqual (false);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("1.1367376"), JSBD.BigD ("-1.00000001"))).toEqual (false);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("2.9"), JSBD.BigD ("-1.999999991"))).toEqual (false);

    expect (JSBD.lessThanOrEqual (JSBD.BigD ("0.000001"), JSBD.BigD ("0.000001"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("-1.23456"), JSBD.BigD ("1.91929394"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("-2.002"), JSBD.BigD ("1.1943"))).toEqual (true);

    expect (JSBD.lessThanOrEqual (JSBD.BigD ("-1.1110001"), JSBD.BigD ("-1.1110001"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("-2.22"), JSBD.BigD ("-1.11111111111111"))).toEqual (true);
    expect (JSBD.lessThanOrEqual (JSBD.BigD ("-3.49012"), JSBD.BigD ("-4.202"))).toEqual (false);
}

//#######################################################
//################ > GREATER THAN > #####################
//#######################################################
//############# let isGT = 1.23m > 0.23m ################
{
    expect (JSBD.greaterThan (JSBD.BigD ("0"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("1"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("1"), JSBD.BigD ("2"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("2"), JSBD.BigD ("1"))).toEqual (true);

    expect (JSBD.greaterThan (JSBD.BigD ("0"), JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.greaterThan (JSBD.BigD ("1"), JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.greaterThan (JSBD.BigD ("2"), JSBD.BigD ("-1"))).toEqual (true);

    expect (JSBD.greaterThan (JSBD.BigD ("0"), JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("-1"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("-2"), JSBD.BigD ("1"))).toEqual (false);

    expect (JSBD.greaterThan (JSBD.BigD ("-1"), JSBD.BigD ("-1"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("-2"), JSBD.BigD ("-1"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("-3"), JSBD.BigD ("-4"))).toEqual (true);

    expect (JSBD.greaterThan (JSBD.BigD ("0.0001"), JSBD.BigD ("0.1"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("0.0001"), JSBD.BigD ("0.0000001"))).toEqual (true);
    expect (JSBD.greaterThan (JSBD.BigD ("1.5638"), JSBD.BigD ("1.5638"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("1.915"), JSBD.BigD ("2.62739"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("2.6969"), JSBD.BigD ("1.1526"))).toEqual (true);

    expect (JSBD.greaterThan (JSBD.BigD ("0.999"), JSBD.BigD ("-1.61528"))).toEqual (true);
    expect (JSBD.greaterThan (JSBD.BigD ("1.1367376"), JSBD.BigD ("-1.00000001"))).toEqual (true);
    expect (JSBD.greaterThan (JSBD.BigD ("2.9"), JSBD.BigD ("-1.999999991"))).toEqual (true);

    expect (JSBD.greaterThan (JSBD.BigD ("0.000001"), JSBD.BigD ("0.000001"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("-1.23456"), JSBD.BigD ("1.91929394"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("-2.002"), JSBD.BigD ("1.1943"))).toEqual (false);

    expect (JSBD.greaterThan (JSBD.BigD ("-1.1110001"), JSBD.BigD ("-1.1110001"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("-2.22"), JSBD.BigD ("-1.11111111111111"))).toEqual (false);
    expect (JSBD.greaterThan (JSBD.BigD ("-3.49012"), JSBD.BigD ("-4.202"))).toEqual (true);
}

//#######################################################
//############# >= GREATER THAN EQUAL >= ################
//#######################################################
//############ let isGTE = 1.23m >= 0.23m ###############
{
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("0"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("1"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("1"), JSBD.BigD ("2"))).toEqual (false);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("2"), JSBD.BigD ("1"))).toEqual (true);

    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("0"), JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("1"), JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("2"), JSBD.BigD ("-1"))).toEqual (true);

    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("0"), JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("-1"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("-2"), JSBD.BigD ("1"))).toEqual (false);

    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("-1"), JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("-2"), JSBD.BigD ("-1"))).toEqual (false);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("-3"), JSBD.BigD ("-4"))).toEqual (true);

    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("0.0001"), JSBD.BigD ("0.1"))).toEqual (false);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("0.0001"), JSBD.BigD ("0.0000001"))).toEqual (true);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("1.5638"), JSBD.BigD ("1.5638"))).toEqual (true);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("1.915"), JSBD.BigD ("2.62739"))).toEqual (false);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("2.6969"), JSBD.BigD ("1.1526"))).toEqual (true);

    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("0.999"), JSBD.BigD ("-1.61528"))).toEqual (true);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("1.1367376"), JSBD.BigD ("-1.00000001"))).toEqual (true);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("2.9"), JSBD.BigD ("-1.999999991"))).toEqual (true);

    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("0.000001"), JSBD.BigD ("0.000001"))).toEqual (true);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("-1.23456"), JSBD.BigD ("1.91929394"))).toEqual (false);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("-2.002"), JSBD.BigD ("1.1943"))).toEqual (false);

    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("-1.1110001"), JSBD.BigD ("-1.1110001"))).toEqual (true);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("-2.22"), JSBD.BigD ("-1.11111111111111"))).toEqual (false);
    expect (JSBD.greaterThanOrEqual (JSBD.BigD ("-3.49012"), JSBD.BigD ("-4.202"))).toEqual (true);
}

//#######################################################
//################# === EQUAL === #######################
//#######################################################
//########### let isEQ = 1.23m === 1.23m ################
{
    expect (JSBD.equal (JSBD.BigD ("0"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("1"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.equal (JSBD.BigD ("1"), JSBD.BigD ("2"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("2"), JSBD.BigD ("1"))).toEqual (false);

    expect (JSBD.equal (JSBD.BigD ("0"), JSBD.BigD ("-1"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("1"), JSBD.BigD ("-1"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("2"), JSBD.BigD ("-1"))).toEqual (false);

    expect (JSBD.equal (JSBD.BigD ("0"), JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.equal (JSBD.BigD ("-1"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("-2"), JSBD.BigD ("1"))).toEqual (false);

    expect (JSBD.equal (JSBD.BigD ("-1"), JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.equal (JSBD.BigD ("-2"), JSBD.BigD ("-1"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("-3"), JSBD.BigD ("-4"))).toEqual (false);

    expect (JSBD.equal (JSBD.BigD ("0.0001"), JSBD.BigD ("0.1"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("0.0001"), JSBD.BigD ("0.0000001"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("1.5638"), JSBD.BigD ("1.5638"))).toEqual (true);
    expect (JSBD.equal (JSBD.BigD ("1.915"), JSBD.BigD ("2.62739"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("2.6969"), JSBD.BigD ("1.1526"))).toEqual (false);

    expect (JSBD.equal (JSBD.BigD ("0.999"), JSBD.BigD ("-1.61528"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("1.1367376"), JSBD.BigD ("-1.00000001"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("2.9"), JSBD.BigD ("-1.999999991"))).toEqual (false);

    expect (JSBD.equal (JSBD.BigD ("0.000001"), JSBD.BigD ("0.000001"))).toEqual (true);
    expect (JSBD.equal (JSBD.BigD ("-1.23456"), JSBD.BigD ("1.91929394"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("-2.002"), JSBD.BigD ("1.1943"))).toEqual (false);

    expect (JSBD.equal (JSBD.BigD ("-1.1110001"), JSBD.BigD ("-1.1110001"))).toEqual (true);
    expect (JSBD.equal (JSBD.BigD ("-2.22"), JSBD.BigD ("-1.11111111111111"))).toEqual (false);
    expect (JSBD.equal (JSBD.BigD ("-3.49012"), JSBD.BigD ("-4.202"))).toEqual (false);
}

//#######################################################
//############### !== NOT EQUAL !== #####################
//#######################################################
//########### let isNE = 0.23m !== 1.23m ################
{
    expect (JSBD.notEqual (JSBD.BigD ("0"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("1"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.notEqual (JSBD.BigD ("1"), JSBD.BigD ("2"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("2"), JSBD.BigD ("1"))).toEqual (true);

    expect (JSBD.notEqual (JSBD.BigD ("0"), JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("1"), JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("2"), JSBD.BigD ("-1"))).toEqual (true);

    expect (JSBD.notEqual (JSBD.BigD ("0"), JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.notEqual (JSBD.BigD ("-1"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("-2"), JSBD.BigD ("1"))).toEqual (true);

    expect (JSBD.notEqual (JSBD.BigD ("-1"), JSBD.BigD ("-1"))).toEqual (false);
    expect (JSBD.notEqual (JSBD.BigD ("-2"), JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("-3"), JSBD.BigD ("-4"))).toEqual (true);

    expect (JSBD.notEqual (JSBD.BigD ("0.0001"), JSBD.BigD ("0.1"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("0.0001"), JSBD.BigD ("0.0000001"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("1.5638"), JSBD.BigD ("1.5638"))).toEqual (false);
    expect (JSBD.notEqual (JSBD.BigD ("1.915"), JSBD.BigD ("2.62739"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("2.6969"), JSBD.BigD ("1.1526"))).toEqual (true);

    expect (JSBD.notEqual (JSBD.BigD ("0.999"), JSBD.BigD ("-1.61528"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("1.1367376"), JSBD.BigD ("-1.00000001"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("2.9"), JSBD.BigD ("-1.999999991"))).toEqual (true);

    expect (JSBD.notEqual (JSBD.BigD ("0.000001"), JSBD.BigD ("0.000001"))).toEqual (false);
    expect (JSBD.notEqual (JSBD.BigD ("-1.23456"), JSBD.BigD ("1.91929394"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("-2.002"), JSBD.BigD ("1.1943"))).toEqual (true);

    expect (JSBD.notEqual (JSBD.BigD ("-1.1110001"), JSBD.BigD ("-1.1110001"))).toEqual (false);
    expect (JSBD.notEqual (JSBD.BigD ("-2.22"), JSBD.BigD ("-1.11111111111111"))).toEqual (true);
    expect (JSBD.notEqual (JSBD.BigD ("-3.49012"), JSBD.BigD ("-4.202"))).toEqual (true);
}


// ######  ####### ####### #     # ####### ####### #######
// #     #    #       #    #     #    #    #       #
// ######     #       #    #  #  #    #    ####### ######
// #     #    #       #    # # # #    #          # #
// ######  #######    #     #   #  ####### ####### #######


//#######################################################
//################# | BITWISE OR | ######################
//#######################################################
//################ let num = 1m | 1m ####################
{
    expect (JSBD.bitwiseOr (JSBD.BigD ("1"), JSBD.BigD ("1")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("1"), JSBD.BigD ("2")).toString ()).toEqual ("3");
    expect (JSBD.bitwiseOr (JSBD.BigD ("1"), JSBD.BigD ("3")).toString ()).toEqual ("3");
    expect (JSBD.bitwiseOr (JSBD.BigD ("1024"), JSBD.BigD ("1")).toString ()).toEqual ("1025");

    expect (JSBD.bitwiseOr (JSBD.BigD ("1.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("1.999"), JSBD.BigD ("2.999")).toString ()).toEqual ("3");
    expect (JSBD.bitwiseOr (JSBD.BigD ("1.999"), JSBD.BigD ("3.999")).toString ()).toEqual ("3");
    expect (JSBD.bitwiseOr (JSBD.BigD ("1024.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("1025");

    expect (JSBD.bitwiseOr (JSBD.BigD ("1"), JSBD.BigD ("-1")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("1"), JSBD.BigD ("-2")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("1"), JSBD.BigD ("-3")).toString ()).toEqual ("-3");
    expect (JSBD.bitwiseOr (JSBD.BigD ("1024"), JSBD.BigD ("-1")).toString ()).toEqual ("-1");

    expect (JSBD.bitwiseOr (JSBD.BigD ("1.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("1.999"), JSBD.BigD ("-2.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("1.999"), JSBD.BigD ("-3.999")).toString ()).toEqual ("-3");
    expect (JSBD.bitwiseOr (JSBD.BigD ("1024.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("-1");

    expect (JSBD.bitwiseOr (JSBD.BigD ("-1"), JSBD.BigD ("1")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("-1"), JSBD.BigD ("2")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("-1"), JSBD.BigD ("3")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("-1024"), JSBD.BigD ("1")).toString ()).toEqual ("-1023");

    expect (JSBD.bitwiseOr (JSBD.BigD ("-1.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("-1.999"), JSBD.BigD ("2.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("-1.999"), JSBD.BigD ("3.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("-1024.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("-1023");

    expect (JSBD.bitwiseOr (JSBD.BigD ("-1"), JSBD.BigD ("-1")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("-1"), JSBD.BigD ("-2")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("-1"), JSBD.BigD ("-3")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("-1024"), JSBD.BigD ("-1")).toString ()).toEqual ("-1");

    expect (JSBD.bitwiseOr (JSBD.BigD ("-1.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("-1.999"), JSBD.BigD ("-2.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("-1.999"), JSBD.BigD ("-3.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseOr (JSBD.BigD ("-1024.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("-1");
}

//#######################################################
//################# | BITWISE XOR | #####################
//#######################################################
//################ let num = 1m ^ 1m ####################
{
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1"), JSBD.BigD ("1")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1"), JSBD.BigD ("2")).toString ()).toEqual ("3");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1"), JSBD.BigD ("3")).toString ()).toEqual ("2");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1024"), JSBD.BigD ("1")).toString ()).toEqual ("1025");

    expect (JSBD.bitwiseXOr (JSBD.BigD ("1.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1.999"), JSBD.BigD ("2.999")).toString ()).toEqual ("3");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1.999"), JSBD.BigD ("3.999")).toString ()).toEqual ("2");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1024.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("1025");

    expect (JSBD.bitwiseXOr (JSBD.BigD ("1"), JSBD.BigD ("-1")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1"), JSBD.BigD ("-2")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1"), JSBD.BigD ("-3")).toString ()).toEqual ("-4");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1024"), JSBD.BigD ("-1")).toString ()).toEqual ("-1025");

    expect (JSBD.bitwiseXOr (JSBD.BigD ("1.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1.999"), JSBD.BigD ("-2.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1.999"), JSBD.BigD ("-3.999")).toString ()).toEqual ("-4");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("1024.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("-1025");

    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1"), JSBD.BigD ("1")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1"), JSBD.BigD ("2")).toString ()).toEqual ("-3");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1"), JSBD.BigD ("3")).toString ()).toEqual ("-4");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1024"), JSBD.BigD ("1")).toString ()).toEqual ("-1023");

    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1.999"), JSBD.BigD ("2.999")).toString ()).toEqual ("-3");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1.999"), JSBD.BigD ("3.999")).toString ()).toEqual ("-4");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1024.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("-1023");

    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1"), JSBD.BigD ("-1")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1"), JSBD.BigD ("-2")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1"), JSBD.BigD ("-3")).toString ()).toEqual ("2");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1024"), JSBD.BigD ("-1")).toString ()).toEqual ("1023");

    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1.999"), JSBD.BigD ("-2.999")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1.999"), JSBD.BigD ("-3.999")).toString ()).toEqual ("2");
    expect (JSBD.bitwiseXOr (JSBD.BigD ("-1024.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("1023");
}

//#######################################################
//################# & BITWISE AND & #####################
//#######################################################
//################ let num = 1m & 1m ####################
{
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1"), JSBD.BigD ("1")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1"), JSBD.BigD ("2")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1023"), JSBD.BigD ("420")).toString ()).toEqual ("420");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1024"), JSBD.BigD ("3072")).toString ()).toEqual ("1024");

    expect (JSBD.bitwiseAnd (JSBD.BigD ("1.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1.999"), JSBD.BigD ("2.999")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1023.999"), JSBD.BigD ("420.696")).toString ()).toEqual ("420");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1024.999"), JSBD.BigD ("3072.999")).toString ()).toEqual ("1024");

    expect (JSBD.bitwiseAnd (JSBD.BigD ("1"), JSBD.BigD ("-1")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1"), JSBD.BigD ("-2")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1023"), JSBD.BigD ("-420")).toString ()).toEqual ("604");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1024"), JSBD.BigD ("-3072")).toString ()).toEqual ("1024");

    expect (JSBD.bitwiseAnd (JSBD.BigD ("1.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1.999"), JSBD.BigD ("-2.999")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1023.999"), JSBD.BigD ("-420.696")).toString ()).toEqual ("604");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("1024.999"), JSBD.BigD ("-3072.999")).toString ()).toEqual ("1024");

    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1"), JSBD.BigD ("1")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1"), JSBD.BigD ("2")).toString ()).toEqual ("2");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1023"), JSBD.BigD ("420")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1024"), JSBD.BigD ("3072")).toString ()).toEqual ("3072");

    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1.999"), JSBD.BigD ("2.999")).toString ()).toEqual ("2");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1023.999"), JSBD.BigD ("420.696")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1024.999"), JSBD.BigD ("3072.999")).toString ()).toEqual ("3072");

    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1"), JSBD.BigD ("-1")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1"), JSBD.BigD ("-2")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1023"), JSBD.BigD ("-420")).toString ()).toEqual ("-1024");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1024"), JSBD.BigD ("-3072")).toString ()).toEqual ("-3072");

    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1.999"), JSBD.BigD ("-2.999")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1023.999"), JSBD.BigD ("-420.696")).toString ()).toEqual ("-1024");
    expect (JSBD.bitwiseAnd (JSBD.BigD ("-1024.999"), JSBD.BigD ("-3072.999")).toString ()).toEqual ("-3072");
}

//#######################################################
//############ << BITWISE LEFT SHIFT << #################
//#######################################################
//############### let num = 1m << 1m ####################
{
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("1"), JSBD.BigD ("1")).toString ()).toEqual ("2");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("1"), JSBD.BigD ("2")).toString ()).toEqual ("4");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("1"), JSBD.BigD ("3")).toString ()).toEqual ("8");

    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("1.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("2");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("1.999"), JSBD.BigD ("2.999")).toString ()).toEqual ("4");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("1.999"), JSBD.BigD ("3.999")).toString ()).toEqual ("8");

    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("-1"), JSBD.BigD ("1")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("-1"), JSBD.BigD ("2")).toString ()).toEqual ("-4");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("-1"), JSBD.BigD ("3")).toString ()).toEqual ("-8");

    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("-1.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("-1.999"), JSBD.BigD ("2.999")).toString ()).toEqual ("-4");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("-1.999"), JSBD.BigD ("3.999")).toString ()).toEqual ("-8");

    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("1"), JSBD.BigD ("-1")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("2"), JSBD.BigD ("-1")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("1024"), JSBD.BigD ("-3")).toString ()).toEqual ("128");

    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("1.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("2.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("1024.999"), JSBD.BigD ("-3.999")).toString ()).toEqual ("128");

    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("-1"), JSBD.BigD ("-1")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("-2"), JSBD.BigD ("-1")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("-1024"), JSBD.BigD ("-3")).toString ()).toEqual ("-128");

    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("-1.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("-2.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseLeftShift (JSBD.BigD ("-1024.999"), JSBD.BigD ("-3.999")).toString ()).toEqual ("-128");
}

//#######################################################
//############ >> BITWISE RIGHT SHIFT >> ################
//#######################################################
//############### let num = 1m >> 1m ####################
{
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("1"), JSBD.BigD ("1")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("1024"), JSBD.BigD ("2")).toString ()).toEqual ("256");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("69420"), JSBD.BigD ("5")).toString ()).toEqual ("2169");

    expect (JSBD.bitwiseRightShift (JSBD.BigD ("1.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("1024.999"), JSBD.BigD ("2.999")).toString ()).toEqual ("256");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("69420.999"), JSBD.BigD ("5.999")).toString ()).toEqual ("2169");

    expect (JSBD.bitwiseRightShift (JSBD.BigD ("-1"), JSBD.BigD ("1")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("-1024"), JSBD.BigD ("2")).toString ()).toEqual ("-256");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("-69420"), JSBD.BigD ("5")).toString ()).toEqual ("-2170");

    expect (JSBD.bitwiseRightShift (JSBD.BigD ("-1.999"), JSBD.BigD ("1.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("-1024.999"), JSBD.BigD ("2.999")).toString ()).toEqual ("-256");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("-69420.999"), JSBD.BigD ("5.999")).toString ()).toEqual ("-2170");

    expect (JSBD.bitwiseRightShift (JSBD.BigD ("1"), JSBD.BigD ("-1")).toString ()).toEqual ("2");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("1024"), JSBD.BigD ("-2")).toString ()).toEqual ("4096");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("69420"), JSBD.BigD ("-5")).toString ()).toEqual ("2221440");

    expect (JSBD.bitwiseRightShift (JSBD.BigD ("1.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("2");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("1024.999"), JSBD.BigD ("-2.999")).toString ()).toEqual ("4096");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("69420.999"), JSBD.BigD ("-5.999")).toString ()).toEqual ("2221440");

    expect (JSBD.bitwiseRightShift (JSBD.BigD ("-1"), JSBD.BigD ("-1")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("-1024"), JSBD.BigD ("-2")).toString ()).toEqual ("-4096");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("-69420"), JSBD.BigD ("-5")).toString ()).toEqual ("-2221440");

    expect (JSBD.bitwiseRightShift (JSBD.BigD ("-1.999"), JSBD.BigD ("-1.999")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("-1024.999"), JSBD.BigD ("-2.999")).toString ()).toEqual ("-4096");
    expect (JSBD.bitwiseRightShift (JSBD.BigD ("-69420.999"), JSBD.BigD ("-5.999")).toString ()).toEqual ("-2221440");
}


//#######################################################
//################# ~ BITWISE NOT ~ #####################
//#######################################################
//################ let num = ~1.23m #####################
{
    expect (JSBD.bitwiseNot (JSBD.BigD ("0")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseNot (JSBD.BigD ("1")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseNot (JSBD.BigD ("62537274")).toString ()).toEqual ("-62537275");
    expect (JSBD.bitwiseNot (JSBD.BigD ("1000000000000000")).toString ()).toEqual ("-1000000000000001");

    expect (JSBD.bitwiseNot (JSBD.BigD ("-1")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseNot (JSBD.BigD ("-2")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseNot (JSBD.BigD ("-62537275")).toString ()).toEqual ("62537274");
    expect (JSBD.bitwiseNot (JSBD.BigD ("-1000000000000001")).toString ()).toEqual ("1000000000000000");

    expect (JSBD.bitwiseNot (JSBD.BigD ("0.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseNot (JSBD.BigD ("1.999")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseNot (JSBD.BigD ("62537274.999")).toString ()).toEqual ("-62537275");
    expect (JSBD.bitwiseNot (JSBD.BigD ("1000000000000000.999")).toString ()).toEqual ("-1000000000000001");

    expect (JSBD.bitwiseNot (JSBD.BigD ("-1.999")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseNot (JSBD.BigD ("-2.999")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseNot (JSBD.BigD ("-62537275.999")).toString ()).toEqual ("62537274");
    expect (JSBD.bitwiseNot (JSBD.BigD ("-1000000000000001.999")).toString ()).toEqual ("1000000000000000");
}


//#######################################################
//############### ~~ BITWISE NOT 2 ~~ ###################
//#######################################################
//################ let num = ~~1.23m ####################
{
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("0")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("1")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("62537274")).toString ()).toEqual ("62537274");
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("1000000000000000")).toString ()).toEqual ("1000000000000000");

    expect (JSBD.bitwiseNot2 (JSBD.BigD ("-1")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("-2")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("-62537275")).toString ()).toEqual ("-62537275");
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("-1000000000000001")).toString ()).toEqual ("-1000000000000001");

    expect (JSBD.bitwiseNot2 (JSBD.BigD ("0.999")).toString ()).toEqual ("0");
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("1.999")).toString ()).toEqual ("1");
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("62537274.999")).toString ()).toEqual ("62537274");
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("1000000000000000.999")).toString ()).toEqual ("1000000000000000");

    expect (JSBD.bitwiseNot2 (JSBD.BigD ("-1.999")).toString ()).toEqual ("-1");
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("-2.999")).toString ()).toEqual ("-2");
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("-62537275.999")).toString ()).toEqual ("-62537275");
    expect (JSBD.bitwiseNot2 (JSBD.BigD ("-1000000000000001.999")).toString ()).toEqual ("-1000000000000001");
}


// #       ####### ####### ####### #######
// #       #     # #     # #       #
// #       #     # #     # ####### ######
// #       #     # #     #       # #
// ####### ####### ####### ####### #######

//#######################################################
//#################### + ADD + ##########################
//#######################################################
//############ let str = 1.23m + "string" ###############
{
    expect (JSBD.ADD (JSBD.BigD ("42"), JSBD.BigD ("378.69")).toString ()).toEqual ("420.69");

    expect (JSBD.ADD (JSBD.BigD ("42"), "0")).toEqual ("420");
    expect (JSBD.ADD ("42", JSBD.BigD ("0"))).toEqual ("420");

    //acts as a wrapper for + if BOTH arguments are NOT JSBD
    expect (JSBD.ADD (1, "0")).toEqual ("10");
    expect (JSBD.ADD (1, 1)).toEqual (2);
    expect (JSBD.ADD (true, 1)).toEqual (2);

    expect (() => JSBD.ADD (JSBD.BigD ("1"), 1)).toThrow ("Cannot mix BigD and other types, use explicit conversions");
    expect (() => JSBD.ADD (1, JSBD.BigD ("1"))).toThrow ("Cannot mix BigD and other types, use explicit conversions");
    expect (() => JSBD.ADD (JSBD.BigD ("1"), true)).toThrow ("Cannot mix BigD and other types, use explicit conversions");
    expect (() => JSBD.ADD (false, JSBD.BigD ("1"))).toThrow ("Cannot mix BigD and other types, use explicit conversions");
}


//#######################################################
//################# < LESS THAN < #######################
//#######################################################
//############# let isLT = 0.23m < 1.23 #################
//############## let isLT = 0.23m < 1n ##################
//############## let isLT = 0.23m < "1" #################
{
    expect (JSBD.LT (JSBD.BigD ("-1"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.LT (JSBD.BigD ("0"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.LT (JSBD.BigD ("1"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.LT (JSBD.BigD ("2"), JSBD.BigD ("1"))).toEqual (false);

    expect (JSBD.LT (JSBD.BigD ("0"), -1)).toEqual (false);
    expect (JSBD.LT (JSBD.BigD ("0"), -1n)).toEqual (false);
    expect (JSBD.LT (JSBD.BigD ("0"), 1)).toEqual (true);
    expect (JSBD.LT (JSBD.BigD ("0"), 1n)).toEqual (true);
    expect (JSBD.LT (JSBD.BigD ("0"), true)).toEqual (true);
    expect (JSBD.LT (JSBD.BigD ("0"), false)).toEqual (false);
    expect (JSBD.LT (JSBD.BigD ("0"), "1")).toEqual (true);
    expect (JSBD.LT (JSBD.BigD ("0"), null)).toEqual (false);

    expect (JSBD.LT (JSBD.BigD ("0"), "1a")).toEqual (false);
    expect (JSBD.LT (JSBD.BigD ("0"), undefined)).toEqual (false);
    expect (JSBD.LT (JSBD.BigD ("0"), Symbol.toPrimitive)).toEqual (false);
    expect (JSBD.LT (JSBD.BigD ("0"), function (){})).toEqual (false);
    expect (JSBD.LT (JSBD.BigD ("0"), () => {})).toEqual (false);
    expect (JSBD.LT (JSBD.BigD ("0"), {})).toEqual (false);


    expect (JSBD.LT (-1, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.LT (-1n, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.LT (1, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LT (1n, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LT (true, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LT (false, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LT (false, JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.LT ("1", JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LT (null, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LT (null, JSBD.BigD ("1"))).toEqual (true);

    expect (JSBD.LT ("1a", JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LT (undefined, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LT (Symbol.toPrimitive, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LT (function (){}, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LT (() => {}, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LT ({}, JSBD.BigD ("0"))).toEqual (false);

    expect (JSBD.LT (JSBD.BigD ("0.00126"), -1.12374)).toEqual (false);
    expect (JSBD.LT (JSBD.BigD ("0.00126"), 1.12374)).toEqual (true);
    expect (JSBD.LT (JSBD.BigD ("1.475884"), -1n)).toEqual (false);
    expect (JSBD.LT (JSBD.BigD ("0.222"), 1.999)).toEqual (true);
    expect (JSBD.LT (JSBD.BigD ("0.999"), 1n)).toEqual (true);
    expect (JSBD.LT (JSBD.BigD ("0.222"), 0.222)).toEqual (false);
    expect (JSBD.LT (JSBD.BigD ("0.3"), 0.1 + 0.2)).toEqual (true);

    expect (JSBD.LT (-1.12374, JSBD.BigD ("0.00126"))).toEqual (true);
    expect (JSBD.LT (1.12374, JSBD.BigD ("0.00126"))).toEqual (false);
    expect (JSBD.LT (-1n, JSBD.BigD ("1.475884"))).toEqual (true);
    expect (JSBD.LT (1.999, JSBD.BigD ("0.222"))).toEqual (false);
    expect (JSBD.LT (1n, JSBD.BigD ("0.999"))).toEqual (false);
    expect (JSBD.LT (0.222, JSBD.BigD ("0.222"))).toEqual (false);
    expect (JSBD.LT (0.1 + 0.2, JSBD.BigD ("0.3"))).toEqual (false);
}


//#######################################################
//############# <= LESS THAN EQUAL <= ###################
//#######################################################
//############ let isLT = 0.23m <= 1.23 #################
//############# let isLT = 0.23m <= 1n ##################
//############# let isLT = 0.23m <= "1" #################
{
    expect (JSBD.LE (JSBD.BigD ("-1"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.LE (JSBD.BigD ("0"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.LE (JSBD.BigD ("1"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.LE (JSBD.BigD ("2"), JSBD.BigD ("1"))).toEqual (false);

    expect (JSBD.LE (JSBD.BigD ("0"), -1)).toEqual (false);
    expect (JSBD.LE (JSBD.BigD ("0"), -1n)).toEqual (false);
    expect (JSBD.LE (JSBD.BigD ("0"), 1)).toEqual (true);
    expect (JSBD.LE (JSBD.BigD ("0"), 1n)).toEqual (true);
    expect (JSBD.LE (JSBD.BigD ("0"), true)).toEqual (true);
    expect (JSBD.LE (JSBD.BigD ("0"), false)).toEqual (true);
    expect (JSBD.LE (JSBD.BigD ("0"), "1")).toEqual (true);
    expect (JSBD.LE (JSBD.BigD ("0"), null)).toEqual (true);

    expect (JSBD.LE (JSBD.BigD ("0"), "1a")).toEqual (false);
    expect (JSBD.LE (JSBD.BigD ("0"), undefined)).toEqual (false);
    expect (JSBD.LE (JSBD.BigD ("0"), Symbol.toPrimitive)).toEqual (false);
    expect (JSBD.LE (JSBD.BigD ("0"), function (){})).toEqual (false);
    expect (JSBD.LE (JSBD.BigD ("0"), () => {})).toEqual (false);
    expect (JSBD.LE (JSBD.BigD ("0"), {})).toEqual (false);


    expect (JSBD.LE (-1, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.LE (-1n, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.LE (1, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LE (1n, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LE (true, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LE (false, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.LE (false, JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.LE ("1", JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LE (null, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.LE (null, JSBD.BigD ("1"))).toEqual (true);

    expect (JSBD.LE ("1a", JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LE (undefined, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LE (Symbol.toPrimitive, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LE (function (){}, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LE (() => {}, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.LE ({}, JSBD.BigD ("0"))).toEqual (false);

    expect (JSBD.LE (JSBD.BigD ("0.00126"), -1.12374)).toEqual (false);
    expect (JSBD.LE (JSBD.BigD ("0.00126"), 1.12374)).toEqual (true);
    expect (JSBD.LE (JSBD.BigD ("1.475884"), -1n)).toEqual (false);
    expect (JSBD.LE (JSBD.BigD ("0.222"), 1.999)).toEqual (true);
    expect (JSBD.LE (JSBD.BigD ("0.999"), 1n)).toEqual (true);
    expect (JSBD.LE (JSBD.BigD ("0.222"), 0.222)).toEqual (true);
    expect (JSBD.LE (JSBD.BigD ("0.3"), 0.1 + 0.2)).toEqual (true);

    expect (JSBD.LE (-1.12374, JSBD.BigD ("0.00126"))).toEqual (true);
    expect (JSBD.LE (1.12374, JSBD.BigD ("0.00126"))).toEqual (false);
    expect (JSBD.LE (-1n, JSBD.BigD ("1.475884"))).toEqual (true);
    expect (JSBD.LE (1.999, JSBD.BigD ("0.222"))).toEqual (false);
    expect (JSBD.LE (1n, JSBD.BigD ("0.999"))).toEqual (false);
    expect (JSBD.LE (0.222, JSBD.BigD ("0.222"))).toEqual (true);
    expect (JSBD.LE (0.1 + 0.2, JSBD.BigD ("0.3"))).toEqual (false);
}


//#######################################################
//############### > GREATER THAN > ######################
//#######################################################
//############# let isGT = 1.23m > 0.23 #################
//############## let isGT = 1.23m > 1n ##################
//############## let isGT = 1.23m > "1" #################
{
    expect (JSBD.GT (JSBD.BigD ("-1"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("1"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("2"), JSBD.BigD ("1"))).toEqual (true);

    expect (JSBD.GT (JSBD.BigD ("0"), -1)).toEqual (true);
    expect (JSBD.GT (JSBD.BigD ("0"), -1n)).toEqual (true);
    expect (JSBD.GT (JSBD.BigD ("0"), 1)).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0"), 1n)).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0"), true)).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0"), false)).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0"), "1")).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0"), null)).toEqual (false);

    expect (JSBD.GT (JSBD.BigD ("0"), "1a")).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0"), undefined)).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0"), Symbol.toPrimitive)).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0"), function (){})).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0"), () => {})).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0"), {})).toEqual (false);


    expect (JSBD.GT (-1, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GT (-1n, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GT (1, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.GT (1n, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.GT (true, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.GT (false, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GT (false, JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.GT ("1", JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.GT (null, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GT (null, JSBD.BigD ("1"))).toEqual (false);

    expect (JSBD.GT ("1a", JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GT (undefined, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GT (Symbol.toPrimitive, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GT (function (){}, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GT (() => {}, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GT ({}, JSBD.BigD ("0"))).toEqual (false);

    expect (JSBD.GT (JSBD.BigD ("0.00126"), -1.12374)).toEqual (true);
    expect (JSBD.GT (JSBD.BigD ("0.00126"), 1.12374)).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("1.475884"), -1n)).toEqual (true);
    expect (JSBD.GT (JSBD.BigD ("0.222"), 1.999)).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0.999"), 1n)).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0.222"), 0.222)).toEqual (false);
    expect (JSBD.GT (JSBD.BigD ("0.3"), 0.1 + 0.2)).toEqual (false);

    expect (JSBD.GT (-1.12374, JSBD.BigD ("0.00126"))).toEqual (false);
    expect (JSBD.GT (1.12374, JSBD.BigD ("0.00126"))).toEqual (true);
    expect (JSBD.GT (-1n, JSBD.BigD ("1.475884"))).toEqual (false);
    expect (JSBD.GT (1.999, JSBD.BigD ("0.222"))).toEqual (true);
    expect (JSBD.GT (1n, JSBD.BigD ("0.999"))).toEqual (true);
    expect (JSBD.GT (0.222, JSBD.BigD ("0.222"))).toEqual (false);
    expect (JSBD.GT (0.1 + 0.2, JSBD.BigD ("0.3"))).toEqual (true);
}


//#######################################################
//############# >= GREATER THAN EQUAL >= ################
//#######################################################
//############ let isGTE = 1.23m >= 0.23 ################
//############# let isGTE = 1.23m >= 1n #################
//############# let isGTE = 1.23m >= "1" ################
{
    expect (JSBD.GE (JSBD.BigD ("-1"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("0"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("1"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.GE (JSBD.BigD ("2"), JSBD.BigD ("1"))).toEqual (true);

    expect (JSBD.GE (JSBD.BigD ("0"), -1)).toEqual (true);
    expect (JSBD.GE (JSBD.BigD ("0"), -1n)).toEqual (true);
    expect (JSBD.GE (JSBD.BigD ("0"), 1)).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("0"), 1n)).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("0"), true)).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("0"), false)).toEqual (true);
    expect (JSBD.GE (JSBD.BigD ("0"), "1")).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("0"), null)).toEqual (true);

    expect (JSBD.GE (JSBD.BigD ("0"), "1a")).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("0"), undefined)).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("0"), Symbol.toPrimitive)).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("0"), function (){})).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("0"), () => {})).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("0"), {})).toEqual (false);


    expect (JSBD.GE (-1, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GE (-1n, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GE (1, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.GE (1n, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.GE (true, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.GE (false, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.GE (false, JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.GE ("1", JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.GE (null, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.GE (null, JSBD.BigD ("1"))).toEqual (false);

    expect (JSBD.GE ("1a", JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GE (undefined, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GE (Symbol.toPrimitive, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GE (function (){}, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GE (() => {}, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.GE ({}, JSBD.BigD ("0"))).toEqual (false);

    expect (JSBD.GE (JSBD.BigD ("0.00126"), -1.12374)).toEqual (true);
    expect (JSBD.GE (JSBD.BigD ("0.00126"), 1.12374)).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("1.475884"), -1n)).toEqual (true);
    expect (JSBD.GE (JSBD.BigD ("0.222"), 1.999)).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("0.999"), 1n)).toEqual (false);
    expect (JSBD.GE (JSBD.BigD ("0.222"), 0.222)).toEqual (true);
    expect (JSBD.GE (JSBD.BigD ("0.3"), 0.1 + 0.2)).toEqual (false);

    expect (JSBD.GE (-1.12374, JSBD.BigD ("0.00126"))).toEqual (false);
    expect (JSBD.GE (1.12374, JSBD.BigD ("0.00126"))).toEqual (true);
    expect (JSBD.GE (-1n, JSBD.BigD ("1.475884"))).toEqual (false);
    expect (JSBD.GE (1.999, JSBD.BigD ("0.222"))).toEqual (true);
    expect (JSBD.GE (1n, JSBD.BigD ("0.999"))).toEqual (true);
    expect (JSBD.GE (0.222, JSBD.BigD ("0.222"))).toEqual (true);
    expect (JSBD.GE (0.1 + 0.2, JSBD.BigD ("0.3"))).toEqual (true);
}


//#######################################################
//################### == EQUAL == #######################
//#######################################################
//############ let isEQ = 1.23m == 1.23 #################
//############## let isEQ = 1m == 1n ####################
//########### let isEQ = 1.23m == "1.23" ################
{
    expect (JSBD.EQ (JSBD.BigD ("-1"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("1"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.EQ (JSBD.BigD ("2"), JSBD.BigD ("1"))).toEqual (false);

    expect (JSBD.EQ (JSBD.BigD ("0"), -1)).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0"), -1n)).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0"), 1)).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0"), 1n)).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0"), true)).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0"), false)).toEqual (true);
    expect (JSBD.EQ (JSBD.BigD ("0"), "1")).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0"), null)).toEqual (true);

    expect (JSBD.EQ (JSBD.BigD ("0"), "1a")).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0"), undefined)).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0"), Symbol.toPrimitive)).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0"), function (){})).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0"), () => {})).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0"), {})).toEqual (false);


    expect (JSBD.EQ (-1, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.EQ (-1n, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.EQ (1, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.EQ (1n, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.EQ (true, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.EQ (false, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.EQ (false, JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.EQ ("1", JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.EQ (null, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.EQ (null, JSBD.BigD ("1"))).toEqual (false);

    expect (JSBD.EQ ("1a", JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.EQ (undefined, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.EQ (Symbol.toPrimitive, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.EQ (function (){}, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.EQ (() => {}, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.EQ ({}, JSBD.BigD ("0"))).toEqual (false);

    expect (JSBD.EQ (JSBD.BigD ("0.00126"), -1.12374)).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0.00126"), 1.12374)).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("1.475884"), -1n)).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0.222"), 1.999)).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0.999"), 1n)).toEqual (false);
    expect (JSBD.EQ (JSBD.BigD ("0.222"), 0.222)).toEqual (true);
    expect (JSBD.EQ (JSBD.BigD ("0.3"), 0.1 + 0.2)).toEqual (false);

    expect (JSBD.EQ (-1.12374, JSBD.BigD ("0.00126"))).toEqual (false);
    expect (JSBD.EQ (1.12374, JSBD.BigD ("0.00126"))).toEqual (false);
    expect (JSBD.EQ (-1n, JSBD.BigD ("1.475884"))).toEqual (false);
    expect (JSBD.EQ (1.999, JSBD.BigD ("0.222"))).toEqual (false);
    expect (JSBD.EQ (1n, JSBD.BigD ("0.999"))).toEqual (false);
    expect (JSBD.EQ (0.222, JSBD.BigD ("0.222"))).toEqual (true);
    expect (JSBD.EQ (0.1 + 0.2, JSBD.BigD ("0.3"))).toEqual (false);
}


//#######################################################
//################# != NOT EQUAL != #####################
//#######################################################
//############ let isNE = 1.23m != 0.23 #################
//############# let isNE = 1.23m != 1n ##################
//############# let isNE = 1.23m != "1" #################
{
    expect (JSBD.NE (JSBD.BigD ("-1"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0"), JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("1"), JSBD.BigD ("1"))).toEqual (false);
    expect (JSBD.NE (JSBD.BigD ("2"), JSBD.BigD ("1"))).toEqual (true);

    expect (JSBD.NE (JSBD.BigD ("0"), -1)).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0"), -1n)).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0"), 1)).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0"), 1n)).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0"), true)).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0"), false)).toEqual (false);
    expect (JSBD.NE (JSBD.BigD ("0"), "1")).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0"), null)).toEqual (false);

    expect (JSBD.NE (JSBD.BigD ("0"), "1a")).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0"), undefined)).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0"), Symbol.toPrimitive)).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0"), function (){})).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0"), () => {})).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0"), {})).toEqual (true);


    expect (JSBD.NE (-1, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.NE (-1n, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.NE (1, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.NE (1n, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.NE (true, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.NE (false, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.NE (false, JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.NE ("1", JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.NE (null, JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.NE (null, JSBD.BigD ("1"))).toEqual (true);

    expect (JSBD.NE ("1a", JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.NE (undefined, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.NE (Symbol.toPrimitive, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.NE (function (){}, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.NE (() => {}, JSBD.BigD ("0"))).toEqual (true);
    expect (JSBD.NE ({}, JSBD.BigD ("0"))).toEqual (true);

    expect (JSBD.NE (JSBD.BigD ("0.00126"), -1.12374)).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0.00126"), 1.12374)).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("1.475884"), -1n)).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0.222"), 1.999)).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0.999"), 1n)).toEqual (true);
    expect (JSBD.NE (JSBD.BigD ("0.222"), 0.222)).toEqual (false);
    expect (JSBD.NE (JSBD.BigD ("0.3"), 0.1 + 0.2)).toEqual (true);

    expect (JSBD.NE (-1.12374, JSBD.BigD ("0.00126"))).toEqual (true);
    expect (JSBD.NE (1.12374, JSBD.BigD ("0.00126"))).toEqual (true);
    expect (JSBD.NE (-1n, JSBD.BigD ("1.475884"))).toEqual (true);
    expect (JSBD.NE (1.999, JSBD.BigD ("0.222"))).toEqual (true);
    expect (JSBD.NE (1n, JSBD.BigD ("0.999"))).toEqual (true);
    expect (JSBD.NE (0.222, JSBD.BigD ("0.222"))).toEqual (false);
    expect (JSBD.NE (0.1 + 0.2, JSBD.BigD ("0.3"))).toEqual (true);
}

//  ###### ####### ##    # #     # ####### ####### ####### ####### ####### ##    #
// #       #     # # #   # #     # #       #     # #          #    #     # # #   #
// #       #     # #  #  #  #   #  ######  #  ###  #######    #    #     # #  #  #
// #       #     # #   # #   # #   #       #    #        #    #    #     # #   # #
//  ###### ####### #    ##    #    ####### #     # ####### ####### ####### #    ##

//#######################################################
//################### TO NUMBER #########################
//#######################################################
//############ let num = Number (1.23m) #################
{
    expect (JSBD.toNumber (JSBD.BigD ("1"))).toEqual (1);
    expect (JSBD.toNumber (JSBD.BigD ("0"))).toEqual (0);
    expect (JSBD.toNumber (JSBD.BigD ("-1"))).toEqual (-1);
    expect (JSBD.toNumber (JSBD.BigD ("10"))).toEqual (10);
    expect (JSBD.toNumber (JSBD.BigD ("-10"))).toEqual (-10);
    expect (JSBD.toNumber (JSBD.BigD ("1010101010101010101010101010"))).toEqual (1010101010101010100000000000);
    expect (JSBD.toNumber (JSBD.BigD ("1010101010101010101010101010"))).toEqual (1.0101010101010101e+27);

    expect (JSBD.toNumber (JSBD.BigD ("10000000000000000905969664"))).toEqual (10000000000000000000000000);
    expect (JSBD.toNumber (JSBD.BigD ("10000000000000000905969664"))).toEqual (1e+25);
    expect (JSBD.toNumber (JSBD.BigD ("10000000000000000000000000"))).toEqual (10000000000000000000000000);
    expect (JSBD.toNumber (JSBD.BigD ("10000000000000000000000000"))).toEqual (1e+25);

    expect (JSBD.toNumber (JSBD.BigD ("1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")))
    .toEqual (Infinity);

    expect (JSBD.toNumber (JSBD.BigD ("0.1"))).toEqual (0.1);
    expect (JSBD.toNumber (JSBD.BigD ("-0.1"))).toEqual (-0.1);
    expect (JSBD.toNumber (JSBD.BigD ("0.3"))).toEqual (0.3);

    expect (JSBD.toNumber (JSBD.BigD ("0.00000000001234"))).toEqual (0.00000000001234);
    expect (JSBD.toNumber (JSBD.BigD ("-0.00000000001234"))).toEqual (-0.00000000001234);

    expect (JSBD.toNumber (JSBD.BigD ("0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001")))
    .toEqual (0);
}


//#######################################################
//################### TO BIGINT #########################
//#######################################################
//############## let num = BigInt (1m) ##################
{
    expect (JSBD.toBigInt (JSBD.BigD ("1"))).toEqual (1n);
    expect (JSBD.toBigInt (JSBD.BigD ("0"))).toEqual (0n);
    expect (JSBD.toBigInt (JSBD.BigD ("-1"))).toEqual (-1n);
    expect (JSBD.toBigInt (JSBD.BigD ("10"))).toEqual (10n);
    expect (JSBD.toBigInt (JSBD.BigD ("-10"))).toEqual (-10n);
    expect (JSBD.toBigInt (JSBD.BigD ("1010101010101010101010101010"))).toEqual (1010101010101010101010101010n);

    expect (JSBD.toBigInt (JSBD.BigD ("10000000000000000905969664"))).toEqual (10000000000000000905969664n);
    expect (JSBD.toBigInt (JSBD.BigD ("10000000000000000000000000"))).toEqual (10000000000000000000000000n);

    expect (JSBD.toBigInt (JSBD.BigD ("1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")))
    .toEqual (1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n);

    expect (() => JSBD.toBigInt (JSBD.BigD ("0.1"))).toThrow ("0.1 can't be converted to BigInt because it isn't an integer");
    expect (() => JSBD.toBigInt (JSBD.BigD ("-0.1"))).toThrow ("-0.1 can't be converted to BigInt because it isn't an integer");
    expect (() => JSBD.toBigInt (JSBD.BigD ("0.3"))).toThrow ("0.3 can't be converted to BigInt because it isn't an integer");

    expect (() => JSBD.toBigInt (JSBD.BigD ("0.00000000001234"))).toThrow ("0.00000000001234 can't be converted to BigInt because it isn't an integer");
    expect (() => JSBD.toBigInt (JSBD.BigD ("-0.00000000001234"))).toThrow ("-0.00000000001234 can't be converted to BigInt because it isn't an integer");
}


//#######################################################
//################### TO STRING #########################
//#######################################################
//############ let str = String (1.23m) #################
{
    //Literally just an alias for .toString () but is included in the API
    //Just so "String (1.101m)" is covered
}


//#######################################################
//################### TO BOOLEAN ########################
//#######################################################
//############ let bool = String (1.23m) ################
{
    expect (JSBD.toBoolean (JSBD.BigD ("1"))).toEqual (true);
    expect (JSBD.toBoolean (JSBD.BigD ("0"))).toEqual (false);
    expect (JSBD.toBoolean (JSBD.BigD ("-1"))).toEqual (true);
    expect (JSBD.toBoolean (JSBD.BigD ("10"))).toEqual (true);
    expect (JSBD.toBoolean (JSBD.BigD ("-10"))).toEqual (true);
    expect (JSBD.toBoolean (JSBD.BigD ("1010101010101010101010101010"))).toEqual (true);

    expect (JSBD.toBoolean (JSBD.BigD ("0.00000000001234"))).toEqual (true);
    expect (JSBD.toBoolean (JSBD.BigD ("-0.00000000001234"))).toEqual (true);

    expect (JSBD.toBoolean (JSBD.BigD ("0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001")))
    .toEqual (true);

    expect (JSBD.toBoolean (JSBD.BigD ("-0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001")))
    .toEqual (true);
}
 

//#######################################################
//################### TO SYMBOL #########################
//#######################################################
//############ let symbol = Symbol (1.23m) ##############
{
    expect (JSBD.toSymbol (JSBD.BigD ("1")).description).toEqual ("1");
    expect (JSBD.toSymbol (JSBD.BigD ("0")).description).toEqual ("0");
    expect (JSBD.toSymbol (JSBD.BigD ("-1")).description).toEqual ("-1");
    expect (JSBD.toSymbol (JSBD.BigD ("1.101010101")).description).toEqual ("1.101010101");
}

// ####### ##    # ####### #######    #    ##    #  ###### #######
//    #    # #   # #          #      # #   # #   # #       #
//    #    #  #  # #######    #     #####  #  #  # #       ######
//    #    #   # #       #    #    #     # #   # # #       #
// ####### #    ## #######    #    #     # #    ##  ###### #######


//#######################################################
//################### .DECIMALS #########################
//#######################################################
//########### let decimals = (1.23m).decimals ###########
{
    expect (JSBD.BigD ("1").decimals).toEqual (0);
    expect (JSBD.BigD ("0").decimals).toEqual (0);
    expect (JSBD.BigD ("1.1").decimals).toEqual (1);
    expect (JSBD.BigD ("1.12").decimals).toEqual (2);
    expect (JSBD.BigD ("1.123").decimals).toEqual (3);
    expect (JSBD.BigD ("1.1234").decimals).toEqual (4);
    expect (JSBD.BigD ("1.12345").decimals).toEqual (5);
}


//#######################################################
//################### .TOFIXED ##########################
//#######################################################
//########### let str = (1.23m).toFixed (1) #############
{
    expect (JSBD.BigD ("0").toFixed (0)).toEqual ("0");
    expect (JSBD.BigD ("0").toFixed (1)).toEqual ("0.0");
    expect (JSBD.BigD ("0").toFixed (2)).toEqual ("0.00");
    expect (JSBD.BigD ("0").toFixed (3)).toEqual ("0.000");
    expect (JSBD.BigD ("0").toFixed (4)).toEqual ("0.0000");
    expect (JSBD.BigD ("0").toFixed (5)).toEqual ("0.00000");
    expect (JSBD.BigD ("0").toFixed (6)).toEqual ("0.000000");

    expect (JSBD.BigD ("1").toFixed (0)).toEqual ("1");
    expect (JSBD.BigD ("1").toFixed (1)).toEqual ("1.0");
    expect (JSBD.BigD ("1").toFixed (2)).toEqual ("1.00");
    expect (JSBD.BigD ("1").toFixed (3)).toEqual ("1.000");
    expect (JSBD.BigD ("1").toFixed (4)).toEqual ("1.0000");
    expect (JSBD.BigD ("1").toFixed (5)).toEqual ("1.00000");
    expect (JSBD.BigD ("1").toFixed (6)).toEqual ("1.000000");

    expect (JSBD.BigD ("1.12345").toFixed (0)).toEqual ("1");
    expect (JSBD.BigD ("1.12345").toFixed (1)).toEqual ("1.1");
    expect (JSBD.BigD ("1.12345").toFixed (2)).toEqual ("1.12");
    expect (JSBD.BigD ("1.12345").toFixed (3)).toEqual ("1.123");
    expect (JSBD.BigD ("1.12345").toFixed (4)).toEqual ("1.1235");
    expect (JSBD.BigD ("1.12345").toFixed (5)).toEqual ("1.12345");
    expect (JSBD.BigD ("1.12345").toFixed (6)).toEqual ("1.123450");

    expect (JSBD.BigD ("1.5").toFixed (0)).toEqual ("2");
    expect (JSBD.BigD ("1.5").toFixed (1)).toEqual ("1.5");
    expect (JSBD.BigD ("1.5").toFixed (2)).toEqual ("1.50");
    expect (JSBD.BigD ("1.5").toFixed (3)).toEqual ("1.500");
    expect (JSBD.BigD ("1.5").toFixed (4)).toEqual ("1.5000");

    expect (JSBD.BigD ("-1").toFixed (0)).toEqual ("-1");
    expect (JSBD.BigD ("-1").toFixed (1)).toEqual ("-1.0");
    expect (JSBD.BigD ("-1").toFixed (2)).toEqual ("-1.00");
    expect (JSBD.BigD ("-1").toFixed (3)).toEqual ("-1.000");
    expect (JSBD.BigD ("-1").toFixed (4)).toEqual ("-1.0000");
    expect (JSBD.BigD ("-1").toFixed (5)).toEqual ("-1.00000");
    expect (JSBD.BigD ("-1").toFixed (6)).toEqual ("-1.000000");

    expect (JSBD.BigD ("-1.12345").toFixed (0)).toEqual ("-1");
    expect (JSBD.BigD ("-1.12345").toFixed (1)).toEqual ("-1.1");
    expect (JSBD.BigD ("-1.12345").toFixed (2)).toEqual ("-1.12");
    expect (JSBD.BigD ("-1.12345").toFixed (3)).toEqual ("-1.123");
    expect (JSBD.BigD ("-1.12345").toFixed (4)).toEqual ("-1.1235");
    expect (JSBD.BigD ("-1.12345").toFixed (5)).toEqual ("-1.12345");
    expect (JSBD.BigD ("-1.12345").toFixed (6)).toEqual ("-1.123450");

    expect (JSBD.BigD ("-1.5").toFixed (0)).toEqual ("-2");
    expect (JSBD.BigD ("-1.5").toFixed (1)).toEqual ("-1.5");
    expect (JSBD.BigD ("-1.5").toFixed (2)).toEqual ("-1.50");
    expect (JSBD.BigD ("-1.5").toFixed (3)).toEqual ("-1.500");
    expect (JSBD.BigD ("-1.5").toFixed (4)).toEqual ("-1.5000");

    expect (() => JSBD.BigD ("1.12345").toFixed (-1)).toThrow ("toFixed() digits argument must be between 0 and 100");
    expect (() => JSBD.BigD ("1.12345").toFixed (101)).toThrow ("toFixed() digits argument must be between 0 and 100");
    expect (() => JSBD.BigD ("1.234").toFixed (1n)).toThrow ("Cannot convert a BigInt value to a number");
}


//#######################################################
//################ .TOEXPONENTIAL #######################
//#######################################################
//######## let str = (1.23m).toExponential (1) ##########
{
    expect (JSBD.BigD ("0").toExponential (0)).toEqual ("0e+0");
    expect (JSBD.BigD ("0").toExponential (1)).toEqual ("0.0e+0");
    expect (JSBD.BigD ("0").toExponential (2)).toEqual ("0.00e+0");
    expect (JSBD.BigD ("0").toExponential (3)).toEqual ("0.000e+0");
    expect (JSBD.BigD ("0").toExponential (4)).toEqual ("0.0000e+0");
    expect (JSBD.BigD ("0").toExponential (5)).toEqual ("0.00000e+0");
    expect (JSBD.BigD ("0").toExponential (6)).toEqual ("0.000000e+0");

    expect (JSBD.BigD ("1").toExponential (0)).toEqual ("1e+0");
    expect (JSBD.BigD ("1").toExponential (1)).toEqual ("1.0e+0");
    expect (JSBD.BigD ("1").toExponential (2)).toEqual ("1.00e+0");
    expect (JSBD.BigD ("1").toExponential (3)).toEqual ("1.000e+0");
    expect (JSBD.BigD ("1").toExponential (4)).toEqual ("1.0000e+0");
    expect (JSBD.BigD ("1").toExponential (5)).toEqual ("1.00000e+0");
    expect (JSBD.BigD ("1").toExponential (6)).toEqual ("1.000000e+0");

    expect (JSBD.BigD ("1.12345").toExponential (0)).toEqual ("1e+0");
    expect (JSBD.BigD ("1.12345").toExponential (1)).toEqual ("1.1e+0");
    expect (JSBD.BigD ("1.12345").toExponential (2)).toEqual ("1.12e+0");
    expect (JSBD.BigD ("1.12345").toExponential (3)).toEqual ("1.123e+0");
    expect (JSBD.BigD ("1.12345").toExponential (4)).toEqual ("1.1235e+0");
    expect (JSBD.BigD ("1.12345").toExponential (5)).toEqual ("1.12345e+0");
    expect (JSBD.BigD ("1.12345").toExponential (6)).toEqual ("1.123450e+0");

    expect (JSBD.BigD ("1.5").toExponential (0)).toEqual ("2e+0");
    expect (JSBD.BigD ("1.5").toExponential (1)).toEqual ("1.5e+0");
    expect (JSBD.BigD ("1.5").toExponential (2)).toEqual ("1.50e+0");
    expect (JSBD.BigD ("1.5").toExponential (3)).toEqual ("1.500e+0");
    expect (JSBD.BigD ("1.5").toExponential (4)).toEqual ("1.5000e+0");

    expect (JSBD.BigD ("-1").toExponential (0)).toEqual ("-1e+0");
    expect (JSBD.BigD ("-1").toExponential (1)).toEqual ("-1.0e+0");
    expect (JSBD.BigD ("-1").toExponential (2)).toEqual ("-1.00e+0");
    expect (JSBD.BigD ("-1").toExponential (3)).toEqual ("-1.000e+0");
    expect (JSBD.BigD ("-1").toExponential (4)).toEqual ("-1.0000e+0");
    expect (JSBD.BigD ("-1").toExponential (5)).toEqual ("-1.00000e+0");
    expect (JSBD.BigD ("-1").toExponential (6)).toEqual ("-1.000000e+0");

    expect (JSBD.BigD ("-1.12345").toExponential (0)).toEqual ("-1e+0");
    expect (JSBD.BigD ("-1.12345").toExponential (1)).toEqual ("-1.1e+0");
    expect (JSBD.BigD ("-1.12345").toExponential (2)).toEqual ("-1.12e+0");
    expect (JSBD.BigD ("-1.12345").toExponential (3)).toEqual ("-1.123e+0");
    expect (JSBD.BigD ("-1.12345").toExponential (4)).toEqual ("-1.1235e+0");
    expect (JSBD.BigD ("-1.12345").toExponential (5)).toEqual ("-1.12345e+0");
    expect (JSBD.BigD ("-1.12345").toExponential (6)).toEqual ("-1.123450e+0");

    expect (JSBD.BigD ("-1.5").toExponential (0)).toEqual ("-2e+0");
    expect (JSBD.BigD ("-1.5").toExponential (1)).toEqual ("-1.5e+0");
    expect (JSBD.BigD ("-1.5").toExponential (2)).toEqual ("-1.50e+0");
    expect (JSBD.BigD ("-1.5").toExponential (3)).toEqual ("-1.500e+0");
    expect (JSBD.BigD ("-1.5").toExponential (4)).toEqual ("-1.5000e+0");

    expect (JSBD.BigD ("101.5").toExponential (0)).toEqual ("1e+2");
    expect (JSBD.BigD ("101.5").toExponential (1)).toEqual ("1.0e+2");
    expect (JSBD.BigD ("101.5").toExponential (2)).toEqual ("1.02e+2");
    expect (JSBD.BigD ("101.5").toExponential (3)).toEqual ("1.015e+2");
    expect (JSBD.BigD ("101.5").toExponential (4)).toEqual ("1.0150e+2");
    expect (JSBD.BigD ("101.5").toExponential (5)).toEqual ("1.01500e+2");

    expect (JSBD.BigD ("-101.5").toExponential (0)).toEqual ("-1e+2");
    expect (JSBD.BigD ("-101.5").toExponential (1)).toEqual ("-1.0e+2");
    expect (JSBD.BigD ("-101.5").toExponential (2)).toEqual ("-1.02e+2");
    expect (JSBD.BigD ("-101.5").toExponential (3)).toEqual ("-1.015e+2");
    expect (JSBD.BigD ("-101.5").toExponential (4)).toEqual ("-1.0150e+2");
    expect (JSBD.BigD ("-101.5").toExponential (5)).toEqual ("-1.01500e+2");

    expect (JSBD.BigD ("172635.52936").toExponential (0)).toEqual ("2e+5");
    expect (JSBD.BigD ("172635.52936").toExponential (1)).toEqual ("1.7e+5");
    expect (JSBD.BigD ("172635.52936").toExponential (2)).toEqual ("1.73e+5");
    expect (JSBD.BigD ("172635.52936").toExponential (3)).toEqual ("1.726e+5");
    expect (JSBD.BigD ("172635.52936").toExponential (4)).toEqual ("1.7264e+5");
    expect (JSBD.BigD ("172635.52936").toExponential (5)).toEqual ("1.72636e+5");
    expect (JSBD.BigD ("172635.52936").toExponential (6)).toEqual ("1.726355e+5");
    expect (JSBD.BigD ("172635.52936").toExponential (7)).toEqual ("1.7263553e+5");
    expect (JSBD.BigD ("172635.52936").toExponential (8)).toEqual ("1.72635529e+5");
    expect (JSBD.BigD ("172635.52936").toExponential (9)).toEqual ("1.726355294e+5");
    expect (JSBD.BigD ("172635.52936").toExponential (10)).toEqual ("1.7263552936e+5");
    expect (JSBD.BigD ("172635.52936").toExponential (11)).toEqual ("1.72635529360e+5");

    expect (JSBD.BigD ("-172635.52936").toExponential (0)).toEqual ("-2e+5");
    expect (JSBD.BigD ("-172635.52936").toExponential (1)).toEqual ("-1.7e+5");
    expect (JSBD.BigD ("-172635.52936").toExponential (2)).toEqual ("-1.73e+5");
    expect (JSBD.BigD ("-172635.52936").toExponential (3)).toEqual ("-1.726e+5");
    expect (JSBD.BigD ("-172635.52936").toExponential (4)).toEqual ("-1.7264e+5");
    expect (JSBD.BigD ("-172635.52936").toExponential (5)).toEqual ("-1.72636e+5");
    expect (JSBD.BigD ("-172635.52936").toExponential (6)).toEqual ("-1.726355e+5");
    expect (JSBD.BigD ("-172635.52936").toExponential (7)).toEqual ("-1.7263553e+5");
    expect (JSBD.BigD ("-172635.52936").toExponential (8)).toEqual ("-1.72635529e+5");
    expect (JSBD.BigD ("-172635.52936").toExponential (9)).toEqual ("-1.726355294e+5");
    expect (JSBD.BigD ("-172635.52936").toExponential (10)).toEqual ("-1.7263552936e+5");
    expect (JSBD.BigD ("-172635.52936").toExponential (11)).toEqual ("-1.72635529360e+5");

    expect (() => JSBD.BigD ("1.12345").toExponential (-1)).toThrow ("toExponential() fractionDigits argument must be between 0 and 100");
    expect (() => JSBD.BigD ("1.12345").toExponential (101)).toThrow ("toExponential() fractionDigits argument must be between 0 and 100");
    expect (() => JSBD.BigD ("1.234").toExponential (1n)).toThrow ("Cannot convert a BigInt value to a number");
}


//#######################################################
//################# .TOPRECISION ########################
//#######################################################
//######### let str = (1.23m).toPrecision (1) ###########
{
    expect (JSBD.BigD ("0").toPrecision (1)).toEqual ("0");
    expect (JSBD.BigD ("0").toPrecision (2)).toEqual ("0.0");
    expect (JSBD.BigD ("0").toPrecision (3)).toEqual ("0.00");
    expect (JSBD.BigD ("0").toPrecision (4)).toEqual ("0.000");
    expect (JSBD.BigD ("0").toPrecision (5)).toEqual ("0.0000");
    expect (JSBD.BigD ("0").toPrecision (6)).toEqual ("0.00000");

    expect (JSBD.BigD ("1").toPrecision (1)).toEqual ("1");
    expect (JSBD.BigD ("1").toPrecision (2)).toEqual ("1.0");
    expect (JSBD.BigD ("1").toPrecision (3)).toEqual ("1.00");
    expect (JSBD.BigD ("1").toPrecision (4)).toEqual ("1.000");
    expect (JSBD.BigD ("1").toPrecision (5)).toEqual ("1.0000");
    expect (JSBD.BigD ("1").toPrecision (6)).toEqual ("1.00000");

    expect (JSBD.BigD ("1.12345").toPrecision (1)).toEqual ("1");
    expect (JSBD.BigD ("1.12345").toPrecision (2)).toEqual ("1.1");
    expect (JSBD.BigD ("1.12345").toPrecision (3)).toEqual ("1.12");
    expect (JSBD.BigD ("1.12345").toPrecision (4)).toEqual ("1.123");
    expect (JSBD.BigD ("1.12345").toPrecision (5)).toEqual ("1.1235");
    expect (JSBD.BigD ("1.12345").toPrecision (6)).toEqual ("1.12345");
    expect (JSBD.BigD ("1.12345").toPrecision (7)).toEqual ("1.123450");

    expect (JSBD.BigD ("1.5").toPrecision (1)).toEqual ("2");
    expect (JSBD.BigD ("1.5").toPrecision (2)).toEqual ("1.5");
    expect (JSBD.BigD ("1.5").toPrecision (3)).toEqual ("1.50");
    expect (JSBD.BigD ("1.5").toPrecision (4)).toEqual ("1.500");

    expect (JSBD.BigD ("-1").toPrecision (1)).toEqual ("-1");
    expect (JSBD.BigD ("-1").toPrecision (2)).toEqual ("-1.0");
    expect (JSBD.BigD ("-1").toPrecision (3)).toEqual ("-1.00");
    expect (JSBD.BigD ("-1").toPrecision (4)).toEqual ("-1.000");
    expect (JSBD.BigD ("-1").toPrecision (5)).toEqual ("-1.0000");
    expect (JSBD.BigD ("-1").toPrecision (6)).toEqual ("-1.00000");

    expect (JSBD.BigD ("-1.12345").toPrecision (1)).toEqual ("-1");
    expect (JSBD.BigD ("-1.12345").toPrecision (2)).toEqual ("-1.1");
    expect (JSBD.BigD ("-1.12345").toPrecision (3)).toEqual ("-1.12");
    expect (JSBD.BigD ("-1.12345").toPrecision (4)).toEqual ("-1.123");
    expect (JSBD.BigD ("-1.12345").toPrecision (5)).toEqual ("-1.1235");
    expect (JSBD.BigD ("-1.12345").toPrecision (6)).toEqual ("-1.12345");
    expect (JSBD.BigD ("-1.12345").toPrecision (7)).toEqual ("-1.123450");

    expect (JSBD.BigD ("-1.5").toPrecision (1)).toEqual ("-2");
    expect (JSBD.BigD ("-1.5").toPrecision (2)).toEqual ("-1.5");
    expect (JSBD.BigD ("-1.5").toPrecision (3)).toEqual ("-1.50");
    expect (JSBD.BigD ("-1.5").toPrecision (4)).toEqual ("-1.500");

    expect (JSBD.BigD ("0.0012345").toPrecision (1)).toEqual ("0.001");
    expect (JSBD.BigD ("0.0012345").toPrecision (2)).toEqual ("0.0012");
    expect (JSBD.BigD ("0.0012345").toPrecision (3)).toEqual ("0.00123");
    expect (JSBD.BigD ("0.0012345").toPrecision (4)).toEqual ("0.001235");
    expect (JSBD.BigD ("0.0012345").toPrecision (5)).toEqual ("0.0012345");
    expect (JSBD.BigD ("0.0012345").toPrecision (6)).toEqual ("0.00123450");

    expect (JSBD.BigD ("101.5").toPrecision (1)).toEqual ("1e+2");
    expect (JSBD.BigD ("101.5").toPrecision (2)).toEqual ("1.0e+2");
    expect (JSBD.BigD ("101.5").toPrecision (3)).toEqual ("102");
    expect (JSBD.BigD ("101.5").toPrecision (4)).toEqual ("101.5");
    expect (JSBD.BigD ("101.5").toPrecision (5)).toEqual ("101.50");

    expect (JSBD.BigD ("-101.5").toPrecision (1)).toEqual ("-1e+2");
    expect (JSBD.BigD ("-101.5").toPrecision (2)).toEqual ("-1.0e+2");
    expect (JSBD.BigD ("-101.5").toPrecision (3)).toEqual ("-102");
    expect (JSBD.BigD ("-101.5").toPrecision (4)).toEqual ("-101.5");
    expect (JSBD.BigD ("-101.5").toPrecision (5)).toEqual ("-101.50");

    expect (JSBD.BigD ("172635.52936").toPrecision (1)).toEqual ("2e+5");
    expect (JSBD.BigD ("172635.52936").toPrecision (2)).toEqual ("1.7e+5");
    expect (JSBD.BigD ("172635.52936").toPrecision (3)).toEqual ("1.73e+5");
    expect (JSBD.BigD ("172635.52936").toPrecision (4)).toEqual ("1.726e+5");
    expect (JSBD.BigD ("172635.52936").toPrecision (5)).toEqual ("1.7264e+5");
    expect (JSBD.BigD ("172635.52936").toPrecision (6)).toEqual ("172636");
    expect (JSBD.BigD ("172635.52936").toPrecision (7)).toEqual ("172635.5");
    expect (JSBD.BigD ("172635.52936").toPrecision (8)).toEqual ("172635.53");
    expect (JSBD.BigD ("172635.52936").toPrecision (9)).toEqual ("172635.529");
    expect (JSBD.BigD ("172635.52936").toPrecision (10)).toEqual ("172635.5294");
    expect (JSBD.BigD ("172635.52936").toPrecision (11)).toEqual ("172635.52936");
    expect (JSBD.BigD ("172635.52936").toPrecision (12)).toEqual ("172635.529360");

    expect (JSBD.BigD ("-172635.52936").toPrecision (1)).toEqual ("-2e+5");
    expect (JSBD.BigD ("-172635.52936").toPrecision (2)).toEqual ("-1.7e+5");
    expect (JSBD.BigD ("-172635.52936").toPrecision (3)).toEqual ("-1.73e+5");
    expect (JSBD.BigD ("-172635.52936").toPrecision (4)).toEqual ("-1.726e+5");
    expect (JSBD.BigD ("-172635.52936").toPrecision (5)).toEqual ("-1.7264e+5");
    expect (JSBD.BigD ("-172635.52936").toPrecision (6)).toEqual ("-172636");
    expect (JSBD.BigD ("-172635.52936").toPrecision (7)).toEqual ("-172635.5");
    expect (JSBD.BigD ("-172635.52936").toPrecision (8)).toEqual ("-172635.53");
    expect (JSBD.BigD ("-172635.52936").toPrecision (9)).toEqual ("-172635.529");
    expect (JSBD.BigD ("-172635.52936").toPrecision (10)).toEqual ("-172635.5294");
    expect (JSBD.BigD ("-172635.52936").toPrecision (11)).toEqual ("-172635.52936");
    expect (JSBD.BigD ("-172635.52936").toPrecision (12)).toEqual ("-172635.529360");

    expect (() => JSBD.BigD ("1.12345").toPrecision (0)).toThrow ("toPrecision() precision argument must be between 1 and 100");
    expect (() => JSBD.BigD ("1.12345").toPrecision (-1)).toThrow ("toPrecision() precision argument must be between 1 and 100");
    expect (() => JSBD.BigD ("1.12345").toPrecision (101)).toThrow ("toPrecision() precision argument must be between 1 and 100");
    expect (() => JSBD.BigD ("1.234").toPrecision (1n)).toThrow ("Cannot convert a BigInt value to a number");
}

console.log ("Test passed, winning");