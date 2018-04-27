import {getElementFromTemplate, showView} from './utils';
import {calcUserPoints, printUserResults} from './result-functions';
import {gameStatistics} from './data/game-data';
import welcome from './welcome';

// Результат игры - проигрыш: время вышло или закончились попытки
export default (data) => {
  const {userPoints} = calcUserPoints(data.userAnswers, data.lives);
  const userResult = {
    points: userPoints,
    remainingTime: data.time,
    remainingTries: data.lives
  };
  const title = data.lives > 0 ? `Какая жалость!` : `Увы и ах!`;

  const viewElement = getElementFromTemplate(`
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">${title}!</h2>
      <div class="main-stat">${printUserResults(gameStatistics, userResult)}</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`);

  const button = viewElement.querySelector(`.main-replay`);

  button.addEventListener(`click`, () => {
    gameStatistics.push(userResult);
    showView(welcome);
  });

  return viewElement;
};
