const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const templates = document.querySelector(`#templates`);
const viewsArray = Array.from(templates.content.querySelectorAll(`.main`));
const maxViewIndex = viewsArray.length - 1;
const app = document.querySelector(`.app`);
let currentViewIndex = 0;


const showView = (index) => {
  const main = document.querySelector(`.app > .main`);
  const currentView = viewsArray[index];
  app.replaceChild(currentView, main);
};

showView(currentViewIndex);
document.onkeydown = (evt) => {
  if (!evt.altKey) {
    return;
  }

  if (evt.keyCode === ARROW_LEFT && currentViewIndex > 0) {
    showView(--currentViewIndex);
  } else if (evt.keyCode === ARROW_RIGHT && currentViewIndex < maxViewIndex) {
    showView(++currentViewIndex);
  }
};
