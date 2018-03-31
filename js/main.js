const KeyCode = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39
};
const templates = document.querySelector(`#templates`);
const viewTemplates = Array.from(templates.content.querySelectorAll(`.main`));
const maxViewIndex = viewTemplates.length - 1;
const app = document.querySelector(`.app`);
let currentViewIndex = 0;


const showView = (index) => {
  const main = document.querySelector(`.app > .main`);
  const currentView = viewTemplates[index];
  app.replaceChild(currentView, main);
};

showView(currentViewIndex);
document.onkeydown = (evt) => {
  if (!evt.altKey) {
    return;
  }

  if (evt.keyCode === KeyCode.ARROW_LEFT && currentViewIndex > 0) {
    showView(--currentViewIndex);
  } else if (evt.keyCode === KeyCode.ARROW_RIGHT && currentViewIndex < maxViewIndex) {
    showView(++currentViewIndex);
  }
};
