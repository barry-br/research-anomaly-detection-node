const Histogram = require("../histogram");


function calculateConvergence(histogram, convergenceControl=1) {
    
    let valuesSum = Histogram.getSumOfValues(histogram);
    let numberOfBins = Object.keys(histogram).length;
    return Math.pow((valuesSum-numberOfBins)/valuesSum, convergenceControl);

}

function calculateDynamicThreshold(sumOfValues, numberOfBins) {
    const series = [0.1, 0.05, 0.005, 0.0001];
    let position = 0;
    let dynamicThreshold = series[position];
    while ((sumOfValues * dynamicThreshold) > (sumOfValues/numberOfBins)) {
        position++;
        dynamicThreshold = series[position];
    }
    return dynamicThreshold
}

function calculatePercentileThreshold(histogram, anomalyThreshold) {
    let valuesSum = Histogram.getSumOfValues(histogram);
    return anomalyThreshold*valuesSum;
}

module.exports = { calculateConvergence, calculateDynamicThreshold, calculatePercentileThreshold} ;