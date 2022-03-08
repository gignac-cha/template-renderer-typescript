import { CustomElement, CustomElementRegistryHelper } from '../utilities/renderer';

export default class Root extends CustomElement {
  async connectedCallback() {
    super.connectedCallback();
    await this.getTemplate(require('./root.html'));
  }
}
CustomElementRegistryHelper.register('root', Root);
