    // getHistogram(activities,minimumDays) {
    //     let histogram = {}
    //     for (let k in activities) {
    //         if (!k in histogram) {
    //             console.log(k + ' not in histogram')
    //         }
    //     }
    // }

function getSumOfValues(histogram) {
    let valuesSum = 0;
    for (let k in histogram) {
        valuesSum += histogram[k]
    }
    return valuesSum;
}

function getNumberOfBins(histogram) {
    return Object.keys(histogram).length;
}

function sortedHistogramValues(histogram) {
    let values = []
    for (let k in histogram) {
        values.push(histogram[k])
    }
    values.sort(function(a, b){return a-b});
    console.log(values)
    return values
}



module.exports = { getSumOfValues, getNumberOfBins, sortedHistogramValues } ;