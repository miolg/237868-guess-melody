// import setTimer from '../set-timer';
import GenreView from '../views/genre-view';
import ArtistView from '../views/artist-view';
import WinView from '../views/win-view';
import FailView from '../views/fail-view';

import Application from '../application';
import {showView} from '../utils';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.view = this.getQuestionView();
  }

  get element() {
    return this.view.element;
  }

  startGame() {
    // start timer here
  }

  getQuestionView() {
    const question = this.model.getCurrentQuestion();
    let questionView;
    if (question.type === `artist`) {
      questionView = new ArtistView(this.model.state, question);
      questionView.onChange = (checkedArtist) => {
        const isRightAnswer = this.model.getCurrentRightAnswer().artist === checkedArtist;
        this.model.updateState({passed: isRightAnswer, time: 15});
        this.showNextView();
      };
    } else if (question.type === `genre`) {
      questionView = new GenreView(this.model.state, question);
      questionView.onButtonClick = (checkedGenres) => {
        const isRightAnswer = checkedGenres.every((item) => item === this.model.getCurrentRightAnswer().genre);
        this.model.updateState({passed: isRightAnswer, time: 15});
        this.showNextView();
      };

    }
    return questionView;
  }

  getNextView() {
    let nextView;
    if (!this.model.isAlive()) {
      nextView = new FailView(this.model.state);
      nextView.onButtonClick = () => {
        Application.showWelcome();
      };
    } else if (this.model.isWon()) {
      nextView = new WinView(this.model.state);
      nextView.onButtonClick = () => {
        Application.showWelcome();
      };
    } else {
      nextView = this.getQuestionView(this.model.nextQuestion());
    }
    return nextView;
  }

  showNextView() {
    showView(this.getNextView().element);
  }
}
