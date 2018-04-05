const appElement = document.querySelector(`.app`);

export const getElementFromTemplate = (template) => {
  const outerElement = document.createElement(`div`);
  outerElement.innerHTML = template;
  return outerElement.children[0];
};

export const showView = (element) => {
  const mainElement = document.querySelector(`.app > .main`);
  appElement.replaceChild(element, mainElement);
};
