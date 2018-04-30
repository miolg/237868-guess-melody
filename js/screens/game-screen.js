import {setTimer} from '../set-timer';
import GenreView from '../views/genre-view';
import ArtistView from '../views/artist-view';
import WinView from '../views/win-view';
import FailView from '../views/fail-view';

import {getMinuteAndSeconds} from '../utils';
import Application from '../application';
import {showView} from '../utils';

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
      this.updateHeader();
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
        this.model.updateState({passed: isRightAnswer, time: this.model.state.currentQuestionTime});
        this.resolveNextStep();
      };
    } else if (question.type === `genre`) {
      questionView = new GenreView(this.model.state, question);
      questionView.onButtonClick = (checkedGenres) => {
        const isRightAnswer = checkedGenres.every((item) => item === this.model.getCurrentQuestion().rightAnswer.genre);
        this.model.updateState({passed: isRightAnswer, time: this.model.state.currentQuestionTime});
        this.resolveNextStep();
      };

    }
    return questionView;
  }

  resolveNextStep() {
    this.stopGame();
    if (!this.model.isAlive()) {
      this.showResult(false);
    } else if (this.model.isWon()) {
      this.showResult(true);
    } else {
      this.showNextQuestion();
    }
  }

  showNextQuestion() {
    this.model.setNextQuestion();
    this.view = this.getQuestionView();
    showView(this.view.element);
    this.startGame();
  }

  showResult(isWon) {
    let resultView;
    if (!isWon) {
      resultView = new FailView(this.model.state);
      resultView.onButtonClick = () => {
        Application.showWelcome();
      };
    } else {
      resultView = new WinView(this.model.state);
      resultView.onButtonClick = () => {
        Application.showWelcome();
      };
    }
    showView(resultView.element);
  }

  updateHeader() {
    const {minutes, seconds} = getMinuteAndSeconds(this.model.state.time);
    const timerElement = this.view.element.querySelector(`.timer-value`);
    timerElement.querySelector(`.timer-value-mins`).innerHTML = minutes;
    timerElement.querySelector(`.timer-value-secs`).innerHTML = seconds;
  }
}
