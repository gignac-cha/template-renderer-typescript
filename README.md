# Tutorials: TypeScript template renderer

Rendering template with TypeScript.

## Dependencies

* [Parcel](https://github.com/parcel-bundler/parcel): Easy to convert from TypeScript to JavaScript for browser script

## Related technologies

* [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
* [Custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements) - `Window.customElements`
* [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
* [Shadow Root](https://developer.mozilla.org/en-US/docs/Web/API/Element/shadowRoot) - `Element.shadowRoot`
* [Template Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) - `<template>`

## Basic concepts

### Define your custom element prefix

```typescript
import { CustomElementRegistryHelper } from '<project-root>/src/utilities/renderer';
CustomElementRegistryHelper.prefix = 'custom';
```

### Write your template

```html
<!- template.html -->
<template>
  <div>your template</div>
</template>
```

### Write your template element

```typescript
// template.ts
import { CustomElement } from '<project-root>/src/utilities/renderer';
export default class Template extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
  }
}
```

### Register your template element to `CustomElementRegistry`

```typescript
// template.ts
import { CustomElementRegistryHelper } from '<project-root>/src/utilities/renderer';
CustomElementRegistryHelper.register('template', Template);
```

### Use your template element

```typescript
document.querySelector('#some-element').appendChild(document.createElement('custom-template'));
```

```typescript
import Template from '<project-root>/<your-template-path>/template';
document.querySelector('#some-element').appendChild(new Template());
```

```html
<template>
  <custom-template></custom-template>
</template>
```
