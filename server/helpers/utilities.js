const parseDate = (str) => {
  var mdy = str.split('/');
  return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

const dateDiff = (first, second) => {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

const cleanData = (data) => {
  let key, keys = Object.keys(data);
  let n = keys.length;
  let newObj = {}
  while (n--) {
    key = keys[n];
    newObj[key.replace(/['"]+/g, '').toLowerCase()] = data[key];
  }

  return newObj;
};

module.exports = {
  parseDate,
  dateDiff,
  cleanData
}