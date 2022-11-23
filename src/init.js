import i18next from 'i18next';
import localize from './localize.js';
import resources from './locales/index.js';

const render = (i18nInstance) => {
  localize(i18nInstance);
};

export default () => {
  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  }).then(() => render(i18nInstance));
};
