const app = document.querySelector(`.app`);

export const getElementFromTemplate = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.children[0];
};

export const showView = (element) => {
  const main = document.querySelector(`.app > .main`);
  app.replaceChild(element, main);
};
