const DELAY_TIME = 500; // half a second

exports.publicAPIUrls = ['https://api.ipify.org?format=json', 'http://randomword.setgetgo.com/get.php'];

exports.promiseFactory = (n) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(n), DELAY_TIME);
    });
};

exports.rejectedPromiseFactory = (n) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('Error occured'), DELAY_TIME);
    });
}

exports.nPromiseFactory = (noOfPromises) => {
    const arr = [];
    for (let i = 0; i < noOfPromises; i++) {
        arr.push(this.promiseFactory(i));
    }
    return arr;
};

exports.resolve = (sum) => console.log(sum);

exports.reject = (err) => console.log("promise rejected: " + err);
