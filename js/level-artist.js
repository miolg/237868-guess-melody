import {getElementFromTemplate, showNextScreen, getQuestion} from './utils';
import renderHeader from './game/header';
import renderPlayer from './game/player';

// Игра на выбор исполнителя
export default (data) => {
  const question = getQuestion(data);
  const levelTemplate = `
    <section class="main main--level main--level-artist">
      ${renderHeader(data)}
      <div class="main-wrap">
        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        ${renderPlayer(question.rightAnswer, true)}
        <form class="main-list">
          ${question.answers.map((answer, index) => `
            <div class="main-answer-wrapper">
              <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="${answer.artist}"/>
              <label class="main-answer" for="answer-${index}">
                <img class="main-answer-preview" src=${answer.image}
                     alt=${answer.artist} width="134" height="134">
                ${answer.artist}
              </label>
            </div>`).join(``)}
        </form>
      </div>
    </section>`;

  const viewElement = getElementFromTemplate(levelTemplate);
  const formElement = viewElement.querySelector(`.main-list`);
  formElement.addEventListener(`change`, (event) => {
    const isRightAnswer = question.rightAnswer.artist === event.target.value;
    const userAnswers = data.userAnswers.slice();
    userAnswers.push({passed: isRightAnswer, time: 15});
    const lives = isRightAnswer ? data.lives : data.lives - 1;
    const newState = Object.assign({}, data, {currentQuestion: data.currentQuestion + 1, userAnswers, lives});
    showNextScreen(newState);
    event.target.checked = false;
  });

  const playButton = viewElement.querySelector(`.player-control`);
  playButton.addEventListener(`click`, () => {
    const audio = viewElement.querySelector(`audio`);
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  return viewElement;
};
