import {showNextScreen} from './data/game-logic';
import GenreView from './views/genre-view';

// Игра на выбор жанра
export default (data) => {
  const view = new GenreView(data);

  view.onButtonClick = (checkedGenres) => {
    const isRightAnswer = checkedGenres.every((item) => item === data.question.rightAnswer.genre);
    const userAnswers = data.state.userAnswers.slice();
    userAnswers.push({passed: isRightAnswer, time: 15});
    const lives = isRightAnswer ? data.state.lives : data.state.lives - 1;
    const newState = Object.assign({}, data.state, {currentQuestion: data.state.currentQuestion + 1, userAnswers, lives});
    showNextScreen(newState);
  };

  return view.element;
};
