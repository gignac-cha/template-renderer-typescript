import { CustomElement, CustomElementRegistryHelper } from '../utilities/renderer';
import List from './list';

export default class Root extends CustomElement {
  async connectedCallback() {
    super.connectedCallback();
    await this.getTemplate(require('./root.html'));

    this.shadowRoot.appendChild(new List(['lorem', 'ipsum', 'dolor', 'sit', 'amet']));
  }
}
CustomElementRegistryHelper.register('root', Root);
