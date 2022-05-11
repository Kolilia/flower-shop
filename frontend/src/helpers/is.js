export const is = (type, val) =>
  // eslint-disable-next-line no-sparse-arrays
  ![, null].includes(val) && val.constructor === type;
