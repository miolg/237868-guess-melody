export const showView = (element) => {
  const appElement = document.querySelector(`.app`);
  const mainElement = document.querySelector(`.app > .main`);
  appElement.replaceChild(element, mainElement);
};

export const getDeclinedNoun = (nounForms, num) => { // [`секунда`, `секунды`, `секунд`]
  const numberRemainder10 = num % 10;
  const numberRemainder100 = num % 100;
  let result = nounForms[2];

  if (numberRemainder100 < 10 || numberRemainder100 > 19) {
    if (numberRemainder10 === 1) {
      result = nounForms[0];
    } else if ([2, 3, 4].indexOf(numberRemainder10) !== -1) {
      result = nounForms[1];
    }
  }

  return result;
};

export const getMinuteAndSeconds = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = `${Math.floor(time % 60) < 10 ? `0` : ``}${Math.floor(time % 60)}`;

  return {minutes, seconds};
};
