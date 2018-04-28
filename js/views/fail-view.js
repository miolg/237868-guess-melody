import AbstractView from './abstract-view';
import {gameStatistics} from '../data/game-data';
import {calcUserPoints, printUserResults} from '../result-functions';

export default class FailView extends AbstractView {
  constructor(state) {
    super();
    const {userPoints} = calcUserPoints(state.userAnswers, state.lives);
    this.userResult = {
      points: userPoints,
      remainingTime: state.time,
      remainingTries: state.lives
    };
    this.title = state.lives > 0 ? `Какая жалость!` : `Увы и ах!`;
    this.result = printUserResults(gameStatistics, this.userResult);
  }

  get template() {
    return `
      <section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

        <h2 class="title">${this.title}!</h2>
        <div class="main-stat">${this.result}</div>
        <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
      </section>`;
  }

  bind() {
    const button = this.element.querySelector(`.main-replay`);

    button.addEventListener(`click`, () => {
      gameStatistics.push(this.userResult);
      this.onButtonClick();
    });

  }

  onButtonClick() {}
}
