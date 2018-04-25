export const INITIAL_GAME = Object.freeze({
  question: `artist`,
  time: 300,
  lives: 3,
  questionsShown: 0,
  maxQuestions: 10,
  statistics: []
});

export const PointsRule = {
  TIME_LIMIT: 30,
  FAIL: 2,
  SUCCESS: 1,
  FAST_SUCCESS: 2
};

export const Question = {
  'artist': {
    text: `Кто исполняет эту песню?`,
    nextQuestion: `genre`
  },
  'genre': {
    text: `Выберите инди-рок треки`,
    nextQuestion: `artist`
  }
};

export const UserAnswers = [];
