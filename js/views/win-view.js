import AbstractView from './abstract-view';
import {getMinuteAndSeconds, getDeclinedNoun} from '../utils';
import {calcUserPoints, printUserResults} from '../result-functions';
import {GAME, initialState} from '../data/game-data';

export default class WinView extends AbstractView {
  constructor(state) {
    super();
    const {userPoints, fastPoints} = calcUserPoints(state.userAnswers, state.lives);
    this.userResult = {
      points: userPoints,
      remainingTime: state.time,
      remainingTries: state.lives
    };

    const {minutes, seconds} = getMinuteAndSeconds(initialState.time - state.time);
    this.minutes = minutes;
    this.seconds = seconds;
    this.minutesWord = getDeclinedNoun([`минуту`, `минуты`, `минут`], minutes);
    this.secondsWord = getDeclinedNoun([`секунду`, `секунды`, `секунд`], seconds);
    this.userPointsWord = getDeclinedNoun([`балл`, `балла`, `баллов`], userPoints);
    this.errorsNumber = GAME.MAX_LIVES - state.lives;
    this.errorsWord = getDeclinedNoun([`ошибку`, `ошибки`, `ошибок`], this.errorsNumber);
    this.userPoints = userPoints;
    this.fastPoints = fastPoints;
    this.userResultString = ``;
  }

  get template() {
    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

        <h2 class="title">Вы настоящий меломан!</h2>
        <div class="main-stat">За&nbsp;${this.minutes}&nbsp;${this.minutesWord} и ${this.seconds}&nbsp;${this.secondsWord}
          <br>вы&nbsp;набрали ${this.userPoints} ${this.userPointsWord} (${this.fastPoints} быстрых)
          <br>совершив ${this.errorsNumber} ${this.errorsWord}</div>
        <span class="main-comparison">${this.userResultString}</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>`;
  }

  updateStatistics(gameStatistics) {
    this.userResultString = printUserResults(gameStatistics, this.userResult);
    this.element.querySelector(`.main-comparison`).innerHTML = this.userResultString;
  }

  bind() {
    const button = this.element.querySelector(`.main-replay`);

    button.addEventListener(`click`, () => {
      this.onButtonClick();
    });
  }

  onButtonClick() {}
}
