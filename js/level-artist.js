import {showNextScreen} from './data/game-logic';
import ArtistView from './views/artist-view';

// Игра на выбор исполнителя
export default (data) => {
  const view = new ArtistView(data);

  view.onChange = (checkedArtist) => {
    const isRightAnswer = data.question.rightAnswer.artist === checkedArtist;
    const userAnswers = data.state.userAnswers.slice();
    userAnswers.push({passed: isRightAnswer, time: 15});
    const lives = isRightAnswer ? data.state.lives : data.state.lives - 1;
    const newState = Object.assign({}, data.state, {currentQuestion: data.state.currentQuestion + 1, userAnswers, lives});
    showNextScreen(newState);
  };

  return view.element;
};
