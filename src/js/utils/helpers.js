export const getUniqueCountries = function (arr) {
  const unique = arr.reduce((acc, cur) => {
    const country = cur.address.split(",").at(-1).toLowerCase();
    if (!acc.includes(country)) {
      return [...acc, country];
    }

    return acc;
  }, []);

  return unique;
};

export const getUniqueNumbers = function (arr, field) {
  const unique = arr.reduce((acc, cur) => {
    const number = Number(cur[field]);
    if (!acc.includes(number)) {
      return [...acc, number];
    }

    return acc;
  }, []);

  return unique;
};

export const getMinValue = function (arr, field) {
  const minValue = arr.reduce((acc, cur) => {
    if (cur[field] < acc) {
      return cur[field];
    }

    return acc;
  }, arr[0][field]);

  return minValue;
};

export const getMaxValue = function (arr, field) {
  const maxValue = arr.reduce((acc, cur) => {
    if (cur[field] > acc) {
      return cur[field];
    }

    return acc;
  }, arr[0][field]);

  return maxValue;

  return value;
};

export const sortByNumber = function (numbers, asc = "true") {
  const modifier = asc ? 1 : -1;
  const sort = numbers.slice().sort((a, b) => (a - b) * modifier);
  return sort;
};
