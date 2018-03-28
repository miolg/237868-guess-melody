const templates = document.querySelector(`#templates`);
const viewsArray = Array.from(templates.content.querySelectorAll(`section.main`));
const main = document.querySelector(`.app > .main`);
const maxViewIndex = 5;
let currentViewIndex = 0;


const showView = (index) => {
  const currentView = viewsArray[index];
  if (main.hasChildNodes()) {
    main.removeChild(main.childNodes[0]);
  }
  main.appendChild(currentView);
};

showView(currentViewIndex);
document.onkeydown = (e) => {
  if (e.altKey && e.keyCode === 37 && currentViewIndex > 0) {
    showView(--currentViewIndex);
  }
  if (e.altKey && e.keyCode === 39 && currentViewIndex < maxViewIndex) {
    showView(++currentViewIndex);
  }
};
