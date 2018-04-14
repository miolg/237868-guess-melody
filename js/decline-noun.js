export const getDeclinedNoun = (noun, num) => {
  const nounBase = noun.slice(0, -1);
  const numberRemainder10 = num % 10;
  const numberRemainder100 = num % 100;
  let result = nounBase;

  if (numberRemainder100 < 10 || numberRemainder100 > 19) {
    if (numberRemainder10 === 1) {
      result = noun;
    } else if ([2, 3, 4].indexOf(numberRemainder10) !== -1) {
      result = `${nounBase}ы`;
    }
  }

  return result;
};
