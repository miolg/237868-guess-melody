import {INITIAL_GAME, Question} from './data/game-data';

export const getElementFromTemplate = (template) => {
  const outerElement = document.createElement(`div`);
  outerElement.innerHTML = template;
  return outerElement.children[0];
};

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

export const getQuestion = (question) => {
  return Question[question];
};

export const getRandomAnswers = (allAnswers, expectedNumberOfAnswers) => {
  const shuffledAnswers = allAnswers.sort(() => 0.5 - Math.random());
  return shuffledAnswers.slice(0, expectedNumberOfAnswers);
};

export const canContinue = (state) => state.lives - 1 > 0;

export const win = (state) => canContinue(state) && state.questionsShown === INITIAL_GAME.maxQuestions;

export const nextQuestion = (state) => {
  return Object.assign({}, state, {questionsShown: state.questionsShown + 1});
};
