import {showNextScreen} from './data/game-logic';
import GenreView from './views/genre-view';

// Игра на выбор жанра
export default (data) => {
  const viewElement = new GenreView(data);

  viewElement.onButtonClick = (checkedGenres) => {
    const isRightAnswer = checkedGenres.every((item) => item === viewElement.question.rightAnswer.genre) && checkedGenres.length === viewElement.question.rightAnswersCount;
    const userAnswers = viewElement.state.userAnswers.slice();
    userAnswers.push({passed: isRightAnswer, time: 15});
    const lives = isRightAnswer ? viewElement.state.lives : viewElement.state.lives - 1;
    const newState = Object.assign({}, viewElement.state, {currentQuestion: viewElement.state.currentQuestion + 1, userAnswers, lives});
    showNextScreen(newState);
  };

  return viewElement.element;
};
