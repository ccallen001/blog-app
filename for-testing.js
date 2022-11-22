function reverse(str) {
  return str.split('').reverse().join('');
}

function average(numberArr) {
  return numberArr.reduce((a, b) => a + b, 0) / numberArr.length;
}

module.exports = {
  reverse,
  average
};
