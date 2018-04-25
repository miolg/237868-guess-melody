import {getElementFromTemplate, showView, getQuestion, getRandomAnswers, canContinue, win} from './utils';
import renderHeader from './game/header';
import renderPlayer from './game/player';
import gameAnswers from './data/game-answers';
import {UserAnswers} from './data/game-data';
import genreLevel from './level-genre';
import winResult from './win-result.js';
import expiredTriesResult from './expired-tries-result';

// Игра на выбор исполнителя
export default (data) => {
  const question = getQuestion(data.question);
  const randomAnswers = getRandomAnswers(gameAnswers, 3);
  const randomRightAnswerIndex = Math.floor(Math.random() * randomAnswers.length);
  const randomRightAnswer = randomAnswers[randomRightAnswerIndex];
  const levelTemplate = `
    <section class="main main--level main--level-artist">
      ${renderHeader(data)}
      <div class="main-wrap">
        <h2 class="title main-title">${question.text}</h2>
        ${renderPlayer(randomRightAnswer)}
        <form class="main-list">
          ${randomAnswers.map((answer, index) => `
            <div class="main-answer-wrapper">
              <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="val-${index}"/>
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
    const checkedAnswer = parseInt(event.target.value.substr(-1), 10);
    const isRightAnswer = checkedAnswer === randomRightAnswerIndex;
    UserAnswers.push({passed: isRightAnswer, time: 15});
    let nextScreen = ``;
    if (!canContinue(data)) {
      nextScreen = expiredTriesResult;
    } else if (win(data)) {
      nextScreen = winResult;
    }
    if (nextScreen) {
      showView(nextScreen);
    } else {
      showView(genreLevel(Object.assign({}, data, {question: question.nextQuestion})));
    }
    event.target.checked = false;
  });

  return viewElement;
};
