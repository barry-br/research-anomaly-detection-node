const AnomalyDetection = require("./components/anomaly-detection");
const Histogram = require("./components/histogram");
const Binary = require("./utils/binary")



const histogram = {
    "e": 15,
    "d": 4082,
    "c": 25,
    "b": 900,
    "a": 1200,
        
}

console.log(Binary.getBinaryMap())
console.log('summary ' + Histogram.getSumOfValues(histogram));
console.log('convergence ' + AnomalyDetection.calculateConvergence(histogram, 3));
let DynamicThreshold = AnomalyDetection.calculateDynamicThreshold(Histogram.getSumOfValues(histogram),Object.keys(histogram).length)
console.log('dynamic threshold ' + DynamicThreshold);
let PercentileThreshold = AnomalyDetection.calculatePercentileThreshold(histogram,DynamicThreshold)
console.log('percentile threshold ' + PercentileThreshold);
let ad = AnomalyDetection.modelHistogram(histogram,PercentileThreshold)
console.log('model histogram\t normal:' + ad.normal + '\tabnormal:' + ad.abnormal)



console.log('\n\n\n-----')
console.log(AnomalyDetection.calculateAnomalies(histogram))



