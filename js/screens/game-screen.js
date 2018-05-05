import {setTimer} from '../set-timer';
import GenreView from '../views/genre-view';
import ArtistView from '../views/artist-view';
import WinView from '../views/win-view';
import FailView from '../views/fail-view';

import {getMinuteAndSeconds} from '../utils';
import Application from '../application';
import {showView} from '../utils';

const ALMOST_OVER_TIME = 30;

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.view = this._getQuestionView();
    this._interval = null;
  }

  get element() {
    return this.view.element;
  }

  startGame() {
    this._timer = setTimer(this.model.state.time);
    this._interval = setInterval(() => {
      this._timer.tick();
      this.model.updateTime(this._timer.time);

      if (!this.model.isAlive) {
        this._showTimeIsOver();
      } else {
        this._updateHeader();
      }
    }, 1000);
  }

  _stopGame() {
    clearInterval(this._interval);
  }

  _getQuestionView() {
    const question = this.model.getCurrentQuestion();
    let questionView;
    if (question.type === `artist`) {
      questionView = new ArtistView(this.model.state, question);
      questionView.onChange = (checkedArtist) => {
        const isRightAnswer = this.model.getCurrentQuestion().rightAnswer.artist === checkedArtist;
        this._setAnswer(isRightAnswer);
      };
    } else if (question.type === `genre`) {
      questionView = new GenreView(this.model.state, question);
      questionView.onButtonClick = (checkedGenres) => {
        const isRightAnswer = checkedGenres.every((item) => item === this.model.getCurrentQuestion().rightAnswer.genre);
        this._setAnswer(isRightAnswer);
      };

    }
    return questionView;
  }

  _setAnswer(isRightAnswer) {
    const time = this.model.state.currentQuestionTime - this.model.state.time;
    this.model.updateState({passed: isRightAnswer, time});
    this._resolveNextStep();
  }

  _resolveNextStep() {
    this._stopGame();
    if (!this.model.isAlive) {
      this._showTimeIsOver();
    } else if (this.model.isWon) {
      Application.showResult(new WinView(this.model.state));
    } else {
      this.model.setNextQuestion();
      this.view = this._getQuestionView();
      this._showNextQuestion();
    }
  }

  _showNextQuestion() {
    showView(this.view.element);
    this.startGame();
  }

  _showTimeIsOver() {
    this._stopGame();
    Application.showResult(new FailView(this.model.state));
  }

  _updateHeader() {
    const {minutes, seconds} = getMinuteAndSeconds(this.model.state.time);
    const timerElement = this.view.element.querySelector(`.timer-value`);
    if (this.model.state.time < ALMOST_OVER_TIME) {
      timerElement.classList.add(`timer-value--finished`);
    }
    timerElement.querySelector(`.timer-value-mins`).innerHTML = minutes;
    timerElement.querySelector(`.timer-value-secs`).innerHTML = seconds;
  }
}
