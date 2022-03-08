import { CustomElement, CustomElementRegistryHelper } from '../utilities/renderer';

export default class List extends CustomElement {
  constructor(private items: string[]) {
    super();
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.getTemplate(require('./list.html'));

    const list: HTMLUListElement = this.shadowRoot.querySelector('#list');
    this.items.map((item: string) => list.appendChild(new ListItem(item)));
  }
}
CustomElementRegistryHelper.register('list', List);

class ListItem extends CustomElement {
  constructor(private item: string) {
    super();
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.getTemplate(require('./list-item.html'));

    this.shadowRoot.querySelector('#item').textContent = this.item;
  }
}
CustomElementRegistryHelper.register('list-item', ListItem);
