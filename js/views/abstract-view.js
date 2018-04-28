import {getElementFromTemplate} from '../utils';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Direct use of AbstractView is not permitted`);
    }
  }

  get template() {
    throw new Error(`Specify the template`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {}
}
