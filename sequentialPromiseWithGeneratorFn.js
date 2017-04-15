process.on('unhandledRejection', () => {});
process.on('rejectionHandled', () => {});

const common = require('./common');

function* generator() {
  let n1 = yield common.promiseFactory(1);
  let n2 = yield common.promiseFactory(2);

  return (n1 + n2);
}

function* nPromiseGenerator(n) {
  let results = [];
  for(let i = 1; i <= n; i++) {
    let x = yield common.promiseFactory(i);
    results.push(x);
  }
  return results.reduce((acc, val) => acc + val, 0);
}

const executor = (generatorFn, ...args) => {
  let it = generatorFn(...args);
  return new Promise((resolve, reject) => {
    const resultHandler = (lastPromiseResult) => {
      let next = it.next(lastPromiseResult);
      if(!next.done) {
        next.value.then(resultHandler);
      } else {
        resolve(next.value);
      }
    };
    it.next().value.then(resultHandler);
  });
}

//executor(nPromiseGenerator, 5).then(common.resolve, common.reject);
executor(nPromiseGenerator, 5).then(common.resolve, common.reject);
