import {getElementFromTemplate, showView, getMinuteAndSeconds, getDeclinedNoun} from './utils';
import {calcUserPoints, calcFastPoints, printUserResults} from './result-functions';
import {initialState, gameStatistics} from './data/game-data';
import welcome from './welcome';
import {GAME} from './data/game-data';

// Результат игры: выигрыш
export default (data) => {
  const userResult = {
    points: calcUserPoints(data.userAnswers, data.lives),
    remainingTime: data.time,
    remainingTries: data.lives
  };

  const fastPoints = calcFastPoints(data.userAnswers, data.lives);
  const {minutes, seconds} = getMinuteAndSeconds(initialState.time - data.time);
  const errorsNumber = GAME.MAX_LIVES - data.lives;
  const viewElement = getElementFromTemplate(`
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;${minutes}&nbsp;${getDeclinedNoun([`минуту`, `минуты`, `минут`], minutes)} и ${seconds}&nbsp;${getDeclinedNoun([`секунду`, `секунды`, `секунд`], seconds)}
        <br>вы&nbsp;набрали ${userResult.points} ${getDeclinedNoun([`балл`, `балла`, `баллов`], userResult.points)} (${fastPoints} быстрых)
        <br>совершив ${errorsNumber} ${getDeclinedNoun([`ошибка`, `ошибки`, `ошибок`], errorsNumber)}</div>
      <span class="main-comparison">${printUserResults(gameStatistics, userResult)}</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`);

  const button = viewElement.querySelector(`.main-replay`);

  button.addEventListener(`click`, () => {
    gameStatistics.push(userResult);
    showView(welcome);
  });

  return viewElement;
};
