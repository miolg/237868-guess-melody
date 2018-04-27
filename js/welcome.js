import {getElementFromTemplate, showView} from './utils';
import {getQuestionView} from './data/game-logic';
import {initialState} from './data/game-data';

// Приветствие
const viewElement = getElementFromTemplate(`
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>`);

const button = viewElement.querySelector(`.main-play`);

button.addEventListener(`click`, () => {
  showView(getQuestionView(initialState));
});

export default viewElement;
