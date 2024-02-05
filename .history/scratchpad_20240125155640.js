console.log('Script start');

setTimeout(() => {
  console.log('setTimeout 1');
}, 0);

setTimeout(() => {
  console.log('setTimeout 2');
}, 0);

new Promise((resolve, reject) => {
    resolve('Promise 1 resolved');
  }).then(res => console.log(res))
    .catch(err => console.log(err));
    
new Promise((resolve, reject) => {
    resolve('Promise 2 resolved');
  }).then(res => console.log(res))
    .catch(err => console.log(err));
    
console.log('Script End');

// Outputs:

// Script start
// Script End
// Promise 1 resolved
// Promise 2 resolved
// setTimeout 1
// setTimeout 2