const finances = [
['Jan-2010', 867884],
['Feb-2010', 984655],
['Mar-2010', 322013],
['Apr-2010', -69417],
['May-2010', 310503],
['Jun-2010', 522857],
['Jul-2010', 1033096],
['Aug-2010', 604885],
['Sep-2010', -216386],
['Oct-2010', 477532],
['Nov-2010', 893810],
['Dec-2010', -80353],
['Jan-2011', 779806],
['Feb-2011', -335203],
['Mar-2011', 697845],
['Apr-2011', 793163],
['May-2011', 485070],
['Jun-2011', 584122],
['Jul-2011', 62729],
['Aug-2011', 668179],
['Sep-2011', 899906],
['Oct-2011', 834719],
['Nov-2011', 132003],
['Dec-2011', 309978],
['Jan-2012', -755566],
['Feb-2012', 1170593],
['Mar-2012', 252788],
['Apr-2012', 1151518],
['May-2012', 817256],
['Jun-2012', 570757],
['Jul-2012', 506702],
['Aug-2012', -1022534],
['Sep-2012', 475062],
['Oct-2012', 779976],
['Nov-2012', 144175],
['Dec-2012', 542494],
['Jan-2013', 359333],
['Feb-2013', 321469],
['Mar-2013', 67780],
['Apr-2013', 471435],
['May-2013', 565603],
['Jun-2013', 872480],
['Jul-2013', 789480],
['Aug-2013', 999942],
['Sep-2013', -1196225],
['Oct-2013', 268997],
['Nov-2013', -687986],
['Dec-2013', 1150461],
['Jan-2014', 682458],
['Feb-2014', 617856],
['Mar-2014', 824098],
['Apr-2014', 581943],
['May-2014', 132864],
['Jun-2014', 448062],
['Jul-2014', 689161],
['Aug-2014', 800701],
['Sep-2014', 1166643],
['Oct-2014', 947333],
['Nov-2014', 578668],
['Dec-2014', 988505],
['Jan-2015', 1139715],
['Feb-2015', 1029471],
['Mar-2015', 687533],
['Apr-2015', -524626],
['May-2015', 158620],
['Jun-2015', 87795],
['Jul-2015', 423389],
['Aug-2015', 840723],
['Sep-2015', 568529],
['Oct-2015', 332067],
['Nov-2015', 989499],
['Dec-2015', 778237],
['Jan-2016', 650000],
['Feb-2016', -1100387],
['Mar-2016', -174946],
['Apr-2016', 757143],
['May-2016', 445709],
['Jun-2016', 712961],
['Jul-2016', -1163797],
['Aug-2016', 569899],
['Sep-2016', 768450],
['Oct-2016', 102685],
['Nov-2016', 795914],
['Dec-2016', 60988],
['Jan-2017', 138230],
['Feb-2017', 671099]
];
// names to describe finances sub-array indexes.
const money = 1
const month = 0

// determine the number of months in the dataset.
let numberOfMonths = finances.length;

// define profit sum varaible.
let totalProfit = 0;

// define variables to hold the max/min monthly profit changes..
// and associated months.
let greatestProfitIncrease = 0;
let greatestProfitIncreaseMonth = undefined;
let greatestProfitDecrease = 0;                    
let greatestProfitDecreaseMonth = undefined;

// three variables are required to determine the change in monthly profit.
// each iteration will calculate; monthDifference = thisMonthProfit - lastMonthProfit.
// the edge-case is the first iteration since there is no monthly change.
// to set the previousMonth to zero is to risk failure because should the first month income..
// be greater (or less) than any difference, this would be the figure assigned to the maximum (or minimum).
// so initially set lastMonthProfit to firstMonthProfit, which will give a difference of..
// zero, which cannot be wrong.
let lastMonthProfit = finances[0][money];
let monthDifference = undefined;

// the cumulative monthly change variable - as the explanation above,..
// setting the initial lastMonthValue will ensure the result is correct.
let cumulativeChange = 0;

// iterate through finances data
for (dataPoint of finances) {
    const thisMonthProfit = dataPoint[money];
    const thisMonth = dataPoint[month];

    totalProfit += thisMonthProfit;     // sum the ongoing total

    monthDifference = thisMonthProfit - lastMonthProfit;    // difference from last month

    cumulativeChange += monthDifference; // sum of changes

    if (monthDifference >= greatestProfitIncrease) {        // In the event of two or more monthwise differences being both equal and greatest..
        greatestProfitIncrease = monthDifference;           // then the most recent example month is recorded.
        greatestProfitIncreaseMonth = thisMonth;
    } else if (monthDifference <= greatestProfitDecrease) { // likewise for equal greatest loss - last recorded.
        greatestProfitDecrease = monthDifference;
        greatestProfitDecreaseMonth = thisMonth;
    }

    lastMonthProfit = thisMonthProfit;  // last action of each iteration
}

// determine the rounded average profit/loss per month
const twoDecimalPlaces = 100;                   // multiply and divide by 100 for two d.p.
const numberOfDifferences = numberOfMonths-1;   // 86 months less one gives 85 differences
let averageCumulativeChange = Math.round(cumulativeChange*(twoDecimalPlaces)/(numberOfDifferences))/(twoDecimalPlaces);

// assemble financials text output
financialStatement = [];
financialStatement.push("Total Months: " + numberOfMonths + "\n");
financialStatement.push("Total: $" + totalProfit + "\n");
financialStatement.push("Average Change $:" + averageCumulativeChange + "\n");
financialStatement.push("Greatest Increase in Profits: " + greatestProfitIncreaseMonth + " ($" + greatestProfitIncrease + ")\n");
financialStatement.push("Greatest Loss in Profits: " + greatestProfitDecreaseMonth + " ($" + greatestProfitDecrease + ")\n");

prettyFinancialStatement = prettyColonAlign(financialStatement);    //align output by whitespace padding (monospace font only)
document.getElementById("financial-statement").innerHTML = ( prettyFinancialStatement[0]+'\n'
                                                            +prettyFinancialStatement[1]+'\n'
                                                            +prettyFinancialStatement[2]+'\n'
                                                            +prettyFinancialStatement[3]+'\n'
                                                            +prettyFinancialStatement[4]+'\n');

// The remainder of the code is a calculation double check and an output prettifier

// double check - calculation of average cvumaulative change
// by another way as original does not match
// Finances contains 86 profits, giving 85 changes
onlyMoney = finances.map(x => x[1]);
diff=[];
for(i=1;i<=86;i++) { diff.push(onlyMoney[i]-onlyMoney[i-1]);}
// superfluous NaN value at the end results
diff.pop();
total=diff.reduce((x,y) => x+y,0);
average=total/85;
console.log(average);

// function to multiply a string
function strMultiply(str, multiple) {
    let outStr = '';                                        // output set empty
    if (typeof(multiple) === 'number') {                    // rudimentary checking
        for (let index = 0; index < multiple; index++) {    // works for any integer >=0
            outStr += str;                                  // concatenate
        }
    }
    return outStr;
}

// recursive string multiplication
function recurStringMultiply(str, multiple) {
    if (multiple === 1) {
        return str;
    }
    else {
        return str + recurStringMultiply(str, multiple-1);
    }
}

// a function to change a string into an array of characters
function stringToArray(str) {           
    arr = [];
    if (typeof(str)==='string') {
        for(i=0;i<str.length;i++) {
            arr[i]=str[i];
        }
    }
    return arr;
}

// Given an array of strings each with a colon embedded
// return an array padded with whitespace to the lhs s.t.
// the strings are justified about a central column of colons, e.g.,
// ['Mary had : a little lamb,', 'its : fleece was white as snow,']
// returns
// ['Mary had : a little lamb,', '     its : fleece was white as snow,']

// considers the strings as a l.h.s and r.h.s about a colon (the r.h.s. has no relevance to the algorithm)
// calculates the number of characters from left to the colon for each string
// calculates the longest l.h.s., 
// calculates the number of spaces needed to make up the the l.h.s.'s to make them all equal
// inserts those spaces to give the desired result

function prettyColonAlign(strArray) {
    let charArrays = strArray.map(str => stringToArray(str));                               // create equivalent character string arrays
    let lengthsMap = charArrays.map(chrArr => chrArr.findIndex(char => char === ':'));          // map lenth to initial colon of each string
    let longestLHS = lengthsMap.reduce((x,y) => (x>y) ? x : y);                                 // determine the longest lhs length to colon    
    let whitespaceLengthsMap = lengthsMap.map(length => longestLHS - length);                   // calculate the number of spaces required to pad the shorter lhs's          
    let whiteSpaceMap = whitespaceLengthsMap.map(x => strMultiply(' ',x));                      // map the lengths to equivalent number of spaces           
    let paddedStringArray = [];                                                              // create an array to hold whitespace padded strings
    for (i=0;i<whiteSpaceMap.length;i++) {
        paddedStringArray[i] = whiteSpaceMap[i] + strArray[i];                               // concatenate the whitespace and original strings
    }
    return paddedStringArray;
}
//END