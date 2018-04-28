import {showNextScreen} from './data/game-logic';
import GenreView from './views/genre-view';

// Игра на выбор жанра
export default (data) => {
  const viewElement = new GenreView(data);

  viewElement.onButtonClick = (formAnswers) => {
    let isRightAnswer = true;
    formAnswers.forEach((item) => {
      if (item.value !== viewElement.question.rightAnswer.genre) {
        isRightAnswer = false;
      }
      item.checked = false;
    });
    const userAnswers = viewElement.state.userAnswers.slice();
    userAnswers.push({passed: isRightAnswer, time: 15});
    const lives = isRightAnswer ? viewElement.state.lives : viewElement.state.lives - 1;
    const newState = Object.assign({}, viewElement.state, {currentQuestion: viewElement.state.currentQuestion + 1, userAnswers, lives});
    showNextScreen(newState);
  };

  return viewElement.element;
};
