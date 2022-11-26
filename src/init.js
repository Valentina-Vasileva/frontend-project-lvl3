import i18next from 'i18next';
import { object, string } from 'yup';
import resources from './locales/index.js';
import render from './render.js';
import watch from './watch.js';

const validationSchema = object({
  url: string().url().required(),
});

export default () => {
  const state = {
    url: '',
    errors: [],
  };

  const i18nInstance = i18next.createInstance();

  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  }).then(() => render(state, i18nInstance));

  const watchedState = watch(state, i18nInstance);

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const url = data.get('url');

    validationSchema.validate({ url })
      .then(() => {
        watchedState.url = url;
        watchedState.errors = [];
      })
      .catch((errors) => {
        watchedState.errors = errors;
      });
  });
};
