import {setTimer} from '../set-timer';
import GenreView from '../views/genre-view';
import ArtistView from '../views/artist-view';
import WinView from '../views/win-view';
import FailView from '../views/fail-view';

import {getMinuteAndSeconds} from '../utils';
import Application from '../application';
import {showView} from '../utils';

const TIME_IS_ALMOST_OVER = 30;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.view = this.getQuestionView();

    this._timer = setTimer(this.model.state.time);
    this._interval = null;
  }

  get element() {
    return this.view.element;
  }

  startGame() {
    this._interval = setInterval(() => {
      this._timer.tick();
      this.model.updateTime(this._timer.time);

      if (!this.model.isAlive) {
        this.showTimeIsOver();
      } else {
        this.updateHeader();
      }
    }, 1000);
  }

  stopGame() {
    clearInterval(this._interval);
  }

  getQuestionView() {
    const question = this.model.getCurrentQuestion();
    let questionView;
    if (question.type === `artist`) {
      questionView = new ArtistView(this.model.state, question);
      questionView.onChange = (checkedArtist) => {
        const isRightAnswer = this.model.getCurrentQuestion().rightAnswer.artist === checkedArtist;
        const time = this.model.state.currentQuestionTime - this.model.state.time;
        this.model.updateState({passed: isRightAnswer, time});
        this.resolveNextStep();
      };
    } else if (question.type === `genre`) {
      questionView = new GenreView(this.model.state, question);
      questionView.onButtonClick = (checkedGenres) => {
        const isRightAnswer = checkedGenres.every((item) => item === this.model.getCurrentQuestion().rightAnswer.genre);
        const time = this.model.state.currentQuestionTime - this.model.state.time;
        this.model.updateState({passed: isRightAnswer, time});
        this.resolveNextStep();
      };

    }
    return questionView;
  }

  resolveNextStep() {
    this.stopGame();
    if (!this.model.isAlive) {
      this.showTimeIsOver();
    } else if (this.model.isWon) {
      this.view = new WinView(this.model.state);
      this.view.onButtonClick = () => {
        Application.showWelcome();
      };
      Application.showResult(this.view);
    } else {
      this.model.setNextQuestion();
      this.view = this.getQuestionView();
      this.showNextQuestion();
    }
  }

  showNextQuestion() {
    showView(this.view.element);
    this.startGame();
  }

  showTimeIsOver() {
    this.view = new FailView(this.model.state);
    this.view.onButtonClick = () => {
      Application.showWelcome();
    };
    Application.showResult(this.view);
  }

  updateHeader() {
    const {minutes, seconds} = getMinuteAndSeconds(this.model.state.time);
    const timerElement = this.view.element.querySelector(`.timer-value`);
    if (this.model.state.time < TIME_IS_ALMOST_OVER) {
      timerElement.classList.add(`timer-value--finished`);
    }
    timerElement.querySelector(`.timer-value-mins`).innerHTML = minutes;
    timerElement.querySelector(`.timer-value-secs`).innerHTML = seconds;
  }
}
