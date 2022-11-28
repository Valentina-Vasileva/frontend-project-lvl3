import i18next from 'i18next';
import axios from 'axios';
import { object, string, setLocale } from 'yup';
import resources from './locales/index.js';
import { renderInitialState } from './render.js';
import watch from './watch.js';

const validateForm = (formData, i18nInstance = null) => {
  if (i18nInstance) {
    setLocale({
      string: {
        url: i18nInstance.t('inputs.url.error_text'),
      },
    });
  }

  const validationSchema = object({
    url: string().url().required(),
  });

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  return validationSchema.validate(data);
};

const getProxiedUrl = (url) => {
  const proxy = 'https://allorigins.hexlet.app/';
  const proxyUrl = new URL('/get', proxy);
  proxyUrl.search = `url=${encodeURIComponent(url)}&disableCache=true`;
  return proxyUrl;
};

const uploadFeed = (state) => {
  axios.get(getProxiedUrl(state.url.data)).then();
};

export default () => {
  const state = {
    url: {
      data: '',
      errors: [],
    },
    dataLoading: {
      status: 'inactivity',
      errors: [],
    },
    feeds: [],
    posts: [],
  };

  const i18nInstance = i18next.createInstance();

  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  }).then(() => renderInitialState(i18nInstance))
    .then(() => {
      const watchedState = watch(state);

      const form = document.querySelector('form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        validateForm(data, i18nInstance)
          .then(() => {
            watchedState.url.data = data.get('url');
            watchedState.url.errors = [];
          })
          // .then(() => uploadFeed(watchedState.url.data))
          .catch((errors) => {
            watchedState.url.errors = errors.errors;
          });
      });
    })
    .catch((error) => console.error(error));
};
