const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = (Math.random() * (upper - lower) + lower).toFixed(digits);
  return result;
};

const getRandomElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getNewList = (elements) => {
  const maxLength = elements.length;
  const newListLength = getRandomPositiveInteger(1, maxLength);
  const newList = [];

  while (newList.length < newListLength) {
    const indexOfElement = getRandomPositiveInteger(0, maxLength - 1);
    const element = elements[indexOfElement];
    if (!newList.includes(element)) {
      newList.push(element);
    }
  }
  return newList;
};

export { getRandomPositiveInteger, getRandomPositiveFloat, getRandomElement, getNewList };
