import gameAnswers from './game-answers';

const getRandomGenreAnswers = (allAnswers) => {
  const shuffledAnswers = allAnswers.sort(() => 0.5 - Math.random());
  return shuffledAnswers.slice(0, ANSWERS_COUNT.GENRE);
};

const getRandomArtistAnswers = (allAnswers) => {
  let shuffledAnswers = allAnswers.sort(() => 0.5 - Math.random());
  const artists = [...new Set(shuffledAnswers.map((item) => item.artist))];
  let resultAnswers = [];
  artists.forEach((artist) => {
    resultAnswers.push(shuffledAnswers.find((answer) => artist === answer.artist));
  });
  return resultAnswers.slice(0, ANSWERS_COUNT.ARTIST);
};

const makeQuestionsList = (expectedNumberOfQuestions) => {
  const questions = [];
  for (let i = 0; i < expectedNumberOfQuestions; i++) {
    const type = Math.round(Math.random()) ? `artist` : `genre`;
    const answers = type === `artist` ? getRandomArtistAnswers(gameAnswers) : getRandomGenreAnswers(gameAnswers);
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
  MAX_LIVES: 3
};

export const ANSWERS_COUNT = {
  ARTIST: 3,
  GENRE: 4
};

export const initialState = Object.freeze({
  currentQuestion: 0,
  currentQuestionTime: 0,
  time: GAME.MAX_TIME,
  lives: GAME.MAX_LIVES,
  questions: makeQuestionsList(GAME.MAX_QUESTIONS),
  userAnswers: []
});

export const gameStatistics = [];
