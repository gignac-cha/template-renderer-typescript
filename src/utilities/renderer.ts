export class CustomElementRegistryHelper {
  private static _prefix: string = 'custom';

  static get prefix(): string {
    return this._prefix;
  }
  static set prefix(value: string) {
    this._prefix = value;
  }

  static available(): boolean {
    return typeof customElements !== 'undefined' && customElements instanceof CustomElementRegistry;
  }
  static getCustomElementName(name: string): string {
    return `${this._prefix}-${name}`;
  }
  static register(name: string, customElementClass: CustomElementConstructor): boolean {
    if (this.available() && !customElements.get(this.getCustomElementName(name))) {
      customElements.define(this.getCustomElementName(name), customElementClass);
      return true;
    }
    return false;
  }
  static create(name: string): HTMLElement {
    return document.createElement(this.getCustomElementName(name));
  }
}

type TemplateMap = { [key: string]: HTMLTemplateElement };

export class CustomElement extends HTMLElement {
  static get observedAttributes() {
    return [];
  }
  static get disabledFeatures() {
    return [];
  }

  private static templates: TemplateMap = {};
  private static locked: boolean = false;

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
  }
  disconnectedCallback() {}
  adoptedCallback() {}
  attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {}

  protected async getTemplate(templatePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let task = async () => {
        if (CustomElement.locked) {
          requestAnimationFrame(task);
        } else {
          CustomElement.locked = true;
          if (!CustomElement.templates[templatePath]) {
            const response: Response = await fetch(templatePath);
            const html: string = await response.text();
            const document: Document = new DOMParser().parseFromString(html, 'text/html');
            CustomElement.templates[templatePath] = document.querySelector<HTMLTemplateElement>('template');
          }
          this.shadowRoot.appendChild(CustomElement.templates[templatePath].content.cloneNode(true));
          CustomElement.locked = false;
          resolve();
        }
      };
      requestAnimationFrame(task);
    });
  }
}
