import {GAME} from './data/game-data';
import genreLevel from './level-genre';
import artistLevel from './level-artist';
import winResult from './win-result.js';
import failResult from './fail-result';

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

export const getMinuteAndSeconds = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = `${Math.floor(time % 60) < 10 ? `0` : ``}${Math.floor(time % 60)}`;

  return {minutes, seconds};
};

export const getQuestion = (state) => state.questions[state.currentQuestion];

export const getQuestionView = (state) => {
  const question = getQuestion(state);
  let questionView;
  if (question.type === `artist`) {
    questionView = artistLevel(state);
  } else if (question.type === `genre`) {
    questionView = genreLevel(state);
  }
  return questionView;
};

const canContinue = (state) => state.lives > 0;

const win = (state) => canContinue(state) && state.currentQuestion === GAME.MAX_QUESTIONS;

export const showNextScreen = (state) => {
  let nextScreen;
  if (!canContinue(state)) {
    nextScreen = failResult(state);
  } else if (win(state)) {
    nextScreen = winResult(state);
  }
  if (nextScreen) {
    showView(nextScreen);
  } else {
    showView(getQuestionView(state));
  }
};
