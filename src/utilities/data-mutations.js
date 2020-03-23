const __sum = (x, y) => x + y;
const __or = (x, y) => x || y;
const __ensureArray = (x) => {
  if(typeof x !== 'object') {
    x = [x];
  }
  return x;
}
const __includesArray = (array, possiblities) => (
  !!array ? possiblities.map(p => array.includes(p)).reduce(__or, false) : true
)

// B.F. TODO: Add tests!

const __condenseDataset = (prop, dataset) => (
  !!prop ? dataset.map(p => p[prop]).reduce(__sum, 0) : 0
);

export const condenseDataset = (props, dataset) => {
  if(typeof props === 'object') {
    return props.map(p => __condenseDataset(p, dataset)).reduce(__sum, 0);
  } else {
    return __condenseDataset(props, dataset);
  }
}

export const condenseData = (props, data) => {
  const r = {}
  Object.keys(data).forEach(t => {
    r[t] = condenseDataset(props, data[t])
  });
  return r;
}

const __filterProps = (props, dataset) => {
  props = __ensureArray(props);
  return dataset.map(p => Object.keys(p)
    .filter(key => props.includes(key))
    .reduce((obj, key) => {
      obj[key] = p[key];
      return obj;
    }, {}));
}

export const filterProps = (props, data) => {
  const r = {}
  Object.keys(data).forEach(t => {
    r[t] = __filterProps(props, data[t])
  });
  return r;
}

const __filterPropValuePair = (props, values, dataset) => (
  dataset.filter(
    p => __includesArray(values, __ensureArray(props).map(x => p[x]))
  )
);

export const filterPropValuePair = (props, values, data) => {
  const r = {}
  Object.keys(data).forEach(t => {
    r[t] = __filterPropValuePair(props, values, data[t])
  });
  return r;
}
