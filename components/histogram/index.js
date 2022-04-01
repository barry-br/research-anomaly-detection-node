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


module.exports = { getSumOfValues } ;