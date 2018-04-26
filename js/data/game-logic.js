import {GAME} from './game-data';
import genreLevel from '../level-genre';
import artistLevel from '../level-artist';
import winResult from '../win-result';
import failResult from '../fail-result';
import {showView} from '../utils';

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
