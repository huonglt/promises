/*
 * Using async & await to execute many promises sequentially
 */

process.on('unhandledRejection', () => {});
process.on('rejectionHandled', () => {});

const common = require('./common');
const axios = require('axios');

const sequentiallyTwoPromises = async () => {
    let n1 = await common.promiseFactory(1);
    let n2 = await common.promiseFactory(2);
    return n1 + n2;
}

const sequentiallyPromiseArray = async () => {
  let sum = 0;
  for(let i = 1; i <= 3; i++) {
    let n = await common.promiseFactory(i);
    sum += n;
  }
  return sum;
}

const sequentiallyPromiseArrayOneRejected = async () => {
  let sum = 0;
  let n = 0;
  try {
    for(let i = 1; i <= 3; i++) {
      if(i == 3) {
        n = await common.rejectedPromiseFactory(i);
      } else {
        n = await common.promiseFactory(i);
      }
      sum += n;
    }
  } catch(err) {
    return Promise.reject(err);
  }
  return sum;
}

const fetchPublicApi = async () => {

  const results = [];
  for(let i = 0; i < common.publicAPIUrls.length; i++) {
    let response = await axios.get(common.publicAPIUrls[i]);
    results.push(response.data);
  }

  return results;
}

//sequentiallyTwoPromises().then(resolve, reject);
//sequentiallyPromiseArray().then(resolve, reject);
//sequentiallyPromiseArrayOneRejected().then(common.resolve, common.reject);
//fetchPublicApi().then(common.resolve, common.reject);
fetchPublicApi().then(common.resolve, common.reject);
