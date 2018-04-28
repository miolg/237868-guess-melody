import {showNextScreen} from './data/game-logic';
import ArtistView from './views/artist-view';

// Игра на выбор исполнителя
export default (data) => {
  const viewElement = new ArtistView(data);

  viewElement.onChange = (event) => {
    const isRightAnswer = viewElement.question.rightAnswer.artist === event.target.value;
    const userAnswers = viewElement.state.userAnswers.slice();
    userAnswers.push({passed: isRightAnswer, time: 15});
    const lives = isRightAnswer ? viewElement.state.lives : viewElement.state.lives - 1;
    const newState = Object.assign({}, viewElement.state, {currentQuestion: viewElement.state.currentQuestion + 1, userAnswers, lives});
    showNextScreen(newState);
  };

  return viewElement.element;
};
