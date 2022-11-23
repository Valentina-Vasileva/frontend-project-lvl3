import i18next from 'i18next';
import { object, string } from 'yup';
import onChange from 'on-change';
import _ from 'lodash';
import localize from './localize.js';
import resources from './locales/index.js';

const validationSchema = object({
  url: string().url().required(),
});

const render = (state, i18nInstance) => {
  localize(i18nInstance);

  const oldError = document.querySelector('.feedback');
  if (oldError) {
    oldError.remove();
  }

  if (!_.isEmpty(state.errors)) {
    const example = document.querySelector('#url-example');
    const error = document.createElement('p');

    error.classList.add('feedback', 'small', 'text-danger', 'position-absolute');
    error.textContent = i18nInstance.t('inputs.url.error_text');
    example.after(error);
  }
};

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

  const watchedState = onChange(state, () => {
    render(state, i18nInstance);
  });

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
