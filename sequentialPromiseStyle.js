/*
 * Execute an array of promises sequentially
 * Using promise based style
 */
process.on('unhandledRejection', () => {});
process.on('rejectionHandled', () => {});

const common = require('./common');
const axios = require('axios');
/*
 * Sequentially executing 2 promises
 * All promises resolved
 * Result is sum of 1 & 2
 */
const allPromisesResolved = () => {
    const promise1 = common.promiseFactory(1);
    const promise2 = common.promiseFactory(2);
    return new Promise((resolve, reject) => {
        let sum = 0;
        const rejectHandler = (data) => reject(data);
        promise1.then(n1 => {
            sum += n1;
            promise2.then(n2 => {
                sum += n2;
                resolve(sum);
            }, rejectHandler);
        }, rejectHandler);
    });
};

/*
 * Sequentially executing 2 promises
 * One promise resolved, one promise rejected
 * Result is the the error
 */
const onePromiseRejected = () => {
    const promise1 = common.promiseFactory(1);
    const promise2 = common.rejectedPromiseFactory(2);

    return new Promise((resolve, reject) => {
        let sum = 0;
        const rejectHandler = (data) => reject(data);
        promise1.then(n1 => {
            sum += n1;
            promise2.then(n2 => {
                sum += n2;
                resolve(sum);
            }, rejectHandler);
        }, rejectHandler);
    });
};

/*
 * Sequentially running an array of promises
 * All promises resolved
 */
const arrayOfPromiseAllResolved = () => {
  const promises = common.nPromiseFactory(3);
  const results = [];

  return new Promise((resolve, reject) => {
    const rejectHandler = (data) => reject(data);
    const resultHandler = (n) => {
      results.push(n);
      if(results.length != promises.length) {
        promises[results.length].then(resultHandler, rejectHandler);
      } else {
        resolve(results.reduce((acc, val) => acc + val, 0));
      }
    };
    promises[0].then(resultHandler, rejectHandler);
  });
}

/*
 * Sequentially running an array of promises
 * One promise rejected
 * The end promise will be rejected
 */
const arrayOfPromiseOneRejected = () => {
  const promises = [];
  promises.push(common.promiseFactory(1));
  promises.push(common.promiseFactory(2));
  promises.push(common.rejectedPromiseFactory(3));
  const results = [];

  return new Promise((resolve, reject) => {

    const rejectHandler = (data) => reject(data);
    const resultHandler = (n) => {
      results.push(n);
      if(results.length != promises.length) {
        promises[results.length].then(resultHandler, rejectHandler);
      } else {
        resolve(results.reduce((acc, val) => acc + val, 0));
      }
    };
    promises[0].then(resultHandler, rejectHandler);
  });
}

const fetchPublicApi = () => {
  const results = [];
  return new Promise((resolve, reject) => {
    const responseHandler = (response) => {
      results.push(response.data);
      if(results.length == common.publicAPIUrls.length) {
        resolve(results);
      } else {
        axios.get(common.publicAPIUrls[results.length]).then(responseHandler);
      }
    }
    axios.get(common.publicAPIUrls[results.length]).then(responseHandler);
  });
}
//arrayOfPromiseAllResolved().then(common.resolve, common.reject);
fetchPublicApi().then(common.resolve, common.reject);
