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
  currentQuestion: 1,
  currentQuestionTime: GAME.MAX_TIME,
  time: GAME.MAX_TIME,
  lives: GAME.MAX_LIVES,
  questions: [],
  userAnswers: []
});

export const gameStatistics = [];
