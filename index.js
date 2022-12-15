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
// determine the number of months in the dataset
let numberOfMonths = finances.length;

// determine the sum of the total profit/loss
// determine the greatest profit and associated month
// determine the greatest loss and associated month in the dataset
let totalProfit = 0;
let maxProfit = 0;
let maxProfitMonth = undefined;
let maxLoss = 0;                    // by inspection the greatest loss in the dataset is a -ve figure..
                                    // the algoritm below relies on this - had a least profit been required,..
                                    // i.e. a +ve figure, an alternative algorithm would be needed.
let maxLossMonth = undefined;
const money = 1
const month = 0

for (dataPoint of finances) {       // iterator dataPoint traverses finances data
    const monthProfit = dataPoint[money];
    const dataMonth = dataPoint[month];
    totalProfit += monthProfit;     // sum the ongoing total
    if (maxProfit < monthProfit) {  // test current maximum
        maxProfit = monthProfit;    // set maximum to new high value 
        maxProfitMonth = dataMonth; // set associated month of current maximum
    }
    if (maxLoss > monthProfit) {    // logically this could be else if to save a comparsion
        maxLoss = monthProfit;      // set minimum to new larger loss
        maxLossMonth = dataMonth;   // set associated month of current largest loss
    }
}

// determine the rounded average profit/loss per month
let averageProfit = Math.round(totalProfit*100/numberOfMonths)/100;

// output financial statemnt to browser
console.log("Total Months: " + numberOfMonths);
console.log("Total: $" + totalProfit);
console.log("Average Change $:" + averageProfit);
console.log("Greatest Increase in Profits:");
console.log(maxProfitMonth + " ($" + maxProfit + ")");
console.log("Greatest Loss in Profits:");
console.log(maxLossMonth + " ($" + maxLoss + ")");

// output financial statement to web page
document.getElementById("months").innerHTML = "Total Months: " + numberOfMonths + "\n";
document.getElementById("total").innerHTML = "Total: $" + totalProfit + "\n";
document.getElementById("average").innerHTML = "Average Change $:" + averageProfit;
document.getElementById("max").innerHTML = "Greatest Increase in Profits:";
document.getElementById("max-month").innerHTML = maxProfitMonth + " ($" + maxProfit + ")";
document.getElementById("min").innerHTML = "Greatest Loss in Profits:";
document.getElementById("min-month").innerHTML = maxLossMonth + " ($" + maxLoss + ")";

