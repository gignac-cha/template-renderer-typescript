import { CustomElement, CustomElementRegistryHelper } from '../utilities/renderer';

export default class Static extends CustomElement {
  get value(): string {
    return this.getAttribute('value');
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.getTemplate(require('./static.html'));

    if (this.value) {
      const span: HTMLSpanElement = document.createElement('span');
      span.textContent = `(${this.value})`;
      this.shadowRoot.appendChild(span);
    }
  }
}
CustomElementRegistryHelper.register('static', Static);
