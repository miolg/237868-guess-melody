import gameAnswers from './game-answers';

const getRandomAnswers = (allAnswers, expectedNumberOfAnswers) => {
  const shuffledAnswers = allAnswers.sort(() => 0.5 - Math.random());
  return shuffledAnswers.slice(0, expectedNumberOfAnswers);
};

const makeQuestionsList = (expectedNumberOfQuestions) => {
  const questions = [];
  for (let i = 0; i < expectedNumberOfQuestions; i++) {
    const type = Math.round(Math.random()) ? `artist` : `genre`;
    const answers = getRandomAnswers(gameAnswers, type === `artist` ? GAME.ANSWERS_COUNT.ARTIST : GAME.ANSWERS_COUNT.GENRE);
    const rightAnswer = answers[Math.floor(Math.random() * answers.length)];
    questions.push({
      type,
      answers,
      rightAnswer
    });
  }
  return questions;
};

export const GAME = {
  MAX_QUESTIONS: 10,
  MAX_TIME: 300,
  MAX_LIVES: 3,
  ANSWERS_COUNT: {
    ARTIST: 3,
    GENRE: 4
  }
};

export const initialState = Object.freeze({
  currentQuestion: 0,
  time: GAME.MAX_TIME,
  lives: GAME.MAX_LIVES,
  questions: makeQuestionsList(GAME.MAX_QUESTIONS),
  userAnswers: []
});

export const gameStatistics = [];

export const PointsRule = {
  TIME_LIMIT: 30,
  FAIL: 2,
  SUCCESS: 1,
  FAST_SUCCESS: 2
};
