import './templates';
import { CustomElementRegistryHelper } from './utilities/renderer';

CustomElementRegistryHelper.prefix = 'custom';

window.addEventListener('load', (ev: Event) => {
  document.body.appendChild(document.createElement('custom-root'));
});
