import {getElementFromTemplate, getQuestion, showNextScreen} from './utils';
import renderHeader from './game/header';
import renderPlayer from './game/player';

// Игра на выбор жанра
export default (data) => {
  const question = getQuestion(data);
  const levelTemplate = `
    <section class="main main--level main--level-genre">
      ${renderHeader(data)}
      <div class="main-wrap">
        <h2 class="title">Выберите ${question.rightAnswer.genre} треки</h2>
        <form class="genre">
          ${question.answers.map((answer, index) =>`<div class="genre-answer">
              ${renderPlayer(answer, false)}
              <input type="checkbox" name="answer" value=${answer.genre}" id="a-${index}">
              <label class="genre-answer-check" for="a-${index}"></label>
            </div>`).join(``)}
          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>
    </section>`;

  const viewElement = getElementFromTemplate(levelTemplate);
  const formElement = viewElement.querySelector(`.genre`);
  const formAnswers = Array.from(formElement.answer);
  const button = viewElement.querySelector(`.genre-answer-send`);
  button.disabled = true;

  formElement.addEventListener(`change`, () => {
    button.disabled = !formAnswers.some((item) => item.checked);
  });

  formElement.addEventListener(`click`, (event) => {
    const target = event.target;
    if (target.className.includes(`player-control`)) {
      const audios = formElement.querySelectorAll(`audio`);
      audios.forEach((item) => item.pause());
      target.parentNode.querySelector(`audio`).play();
    }
  });

  button.addEventListener(`click`, () => {
    let isRightAnswer = true;
    formAnswers.forEach((item) => {
      if (item.value !== question.rightAnswer.genre) {
        isRightAnswer = false;
      }
      item.checked = false;
    });
    button.disabled = true;
    const userAnswers = data.userAnswers.slice();
    userAnswers.push({passed: isRightAnswer, time: 15});
    const lives = isRightAnswer ? data.lives : data.lives - 1;
    const newState = Object.assign({}, data, {currentQuestion: data.currentQuestion + 1, userAnswers, lives});
    showNextScreen(newState);
  });

  return viewElement;
};
