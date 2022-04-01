const AnomalyDetection = require("./components/anomaly-detection");
const Histogram = require("./components/histogram");
const Binary = require("./utils/binary")

console.log(Binary.getBinaryMap())

const histogram = {
    "a": 80,
    "b": 45,
    "c": 15,
    "d": 3
}


console.log('summary ' + Histogram.getSumOfValues(histogram));
console.log('convergence ' + AnomalyDetection.calculateConvergence(histogram, 1));
console.log('dynamic threshold ' + AnomalyDetection.calculateDynamicThreshold(100,5));
console.log('percentile threshold ' + AnomalyDetection.calculatePercentileThreshold(histogram,0.1));









