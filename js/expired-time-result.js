import {getElementFromTemplate, showView} from './utils.js';
import welcome from './welcome';

// Результат игры: проигрыш время вышло
const viewElement = getElementFromTemplate(`
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>`);

const button = viewElement.querySelector(`.main-replay`);

button.addEventListener(`click`, () => {
  showView(welcome);
});

export default viewElement;
