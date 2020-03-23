export const pad = (num, size) => {
  let s = num + '';
  while(s.length < size) s = '0' + s;
  return s;
}

const __bigIntegerDisplayFormater = new Intl.NumberFormat('en-US');

export const bigIntegerDisplay = (number) => (
  __bigIntegerDisplayFormater.format(number)
);

const __percentageDisplayFormater = new Intl.NumberFormat(
  'en-IN', { maximumSignificantDigits: 3 }
);

export const percentageDisplay = (number) => (
  __percentageDisplayFormater.format(number)
);

export const dateString = (date) => (
  `${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}-${date.getFullYear()}`
);

export const dateDisplay = (date) => (
  `${pad(date.getDate(), 2)}.${pad(date.getMonth() + 1, 2)}.${date.getFullYear()}`
);
