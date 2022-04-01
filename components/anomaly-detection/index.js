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

function modelHistogram(histogram, percentileThreshold) {
    let normal = [];
    let abnormal = [];
    let counter = 0;

    let values = Histogram.sortedHistogramValues(histogram)
    for (let value of values) {
        if ((value + counter) < percentileThreshold) {
            counter = ++value;
        }
    }
    for (let k in histogram) {
        if (histogram[k] >= counter) {
            normal.push(k)
        } else {
            abnormal.push(k)
        }
    }
    // console.log(counter)
    // console.log(normal)
    // console.log(abnormal)
    return {
        normal: normal, 
        abnormal: abnormal
    };
}

function calculateAnomalies(histogram, convergenceControl=1 , convergenceThreshold=0.8, Threshold=0) {
    const sortedValues = Histogram.sortedHistogramValues(histogram)
    let threshold = 0
    if (Threshold===0) {
        threshold = calculateDynamicThreshold(Histogram.getSumOfValues(histogram), Histogram.getNumberOfBins(histogram));
    } else {
        threshold = Threshold;
    }
    let percentile = calculatePercentileThreshold(histogram, threshold);
    let convergence = calculateConvergence(histogram,convergenceControl);
    if (convergence >= convergenceThreshold) {
        let model = modelHistogram(histogram,percentile)
        return {
            normal: model.normal, 
            abnormal: model.abnormal
        };
    } else {
        return {normal: [], abnormal: []}
    }
}


module.exports = { calculateConvergence, calculateDynamicThreshold, calculatePercentileThreshold, modelHistogram, calculateAnomalies} ;