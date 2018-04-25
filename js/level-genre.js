import {getElementFromTemplate, showView, getQuestion, getRandomAnswers} from './utils';
import renderHeader from './game/header';
import renderPlayer from './game/player';
import gameAnswers from './data/game-answers';
import winResult from './win-result.js';
import expiredTimeResult from './expired-time-result';
import expiredTriesResult from './expired-tries-result';

// Игра на выбор жанра
export default (data) => {
  const question = getQuestion(data.question);
  const randomAnswers = getRandomAnswers(gameAnswers, 4);
  // const randomRightAnswers = getRandomAnswers(randomAnswers, Math.floor(Math.random() * randomAnswers.length));
  const levelTemplate = `
    <section class="main main--level main--level-genre">
      ${renderHeader(data)}
      <div class="main-wrap">
        <h2 class="title">${question.text}</h2>
        <form class="genre">
          ${randomAnswers.map((answer, index) =>`<div class="genre-answer">
              ${renderPlayer(answer)}
              <input type="checkbox" name="answer" value="answer-1" id="a-${index}">
              <label class="genre-answer-check" for="a-${index}"></label>
            </div>`).join(``)}
          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>
    </section>`;

  const viewElement = getElementFromTemplate(levelTemplate);
  const formElement = viewElement.querySelector(`.genre`);
  const userAnswers = Array.from(formElement.answer);
  const button = viewElement.querySelector(`.genre-answer-send`);
  const nextScreens = [winResult, expiredTimeResult, expiredTriesResult];
  button.disabled = true;

  formElement.addEventListener(`change`, () => {
    button.disabled = !userAnswers.some((item) => item.checked);
  });

  button.addEventListener(`click`, () => {
    const screenIndex = Math.floor(Math.random() * nextScreens.length);
    userAnswers.forEach((item) => {
      item.checked = false;
    });
    button.disabled = true;
    showView(nextScreens[screenIndex]);
  });

  return viewElement;
};
