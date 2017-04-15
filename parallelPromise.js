const common = require('./common');
const axios = require('axios');

const asyncAwaitexecute = async (n) => {
  const promises = common.nPromiseFactory(n);
  let results = await Promise.all(promises);
  return results.reduce((acc, val) => acc + val, 0);
}

/*
 * Using chaining of promises
 */
const execute = (n) => {
  const promises = common.nPromiseFactory(n);
  return Promise.all(promises).then(results => results.reduce((acc, val) => acc + val, 0));
}

const fetchPublicApi = () => {
  const promises = [];
  for(let i = 0; i < common.publicAPIUrls.length; i++) {
    promises.push(axios.get(common.publicAPIUrls[i]));
  }
  return Promise.all(promises).then(results => results.map(result => result.data));
}
//execute(4).then(common.resolve, common.reject);
//asyncAwaitexecute(4).then(resolve, reject);
fetchPublicApi().then(common.resolve, common.reject);
console.log('waiting now');
