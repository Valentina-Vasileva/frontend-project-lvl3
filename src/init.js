import i18next from 'i18next';
import axios from 'axios';
import { object, string, setLocale } from 'yup';
import resources from './locales/index.js';
import watch from './watch.js';
import parse from './parse.js';

const validateForm = (formData, state, i18nInstance = null) => {
  if (i18nInstance) {
    setLocale({
      mixed: {
        notOneOf: i18nInstance.t('inputs.url.errors.one_of'),
      },
      string: {
        url: i18nInstance.t('inputs.url.errors.invalid'),
      },
    });
  }

  const validationSchema = object({
    url: string().url().required().notOneOf(state.feeds.map((feed) => feed.url)),
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

const getTypeOfErrorMessage = (message) => {
  switch (message) {
    case 'Parsing error':
      return 'parsing';
    case 'Network Error':
      return 'network';
    default:
      return message;
  }
};

const uploadFeed = (state, i18nInstance) => {
  state.dataLoading.status = 'processing';
  axios.get(getProxiedUrl(state.url.data))
    .then((response) => {
      const feed = parse(response.data.contents, 'application/xml');
      state.feeds.push({ ...feed, url: state.url.data });
      if (feed.posts.length > 0) {
        state.posts.push(feed.posts);
      }
      state.dataLoading.status = 'finished';
      state.dataLoading.status = 'inactivity';
    })
    .catch((error) => {
      const typeOfMessage = getTypeOfErrorMessage(error.message);
      state.dataLoading.errors.push(i18nInstance.t(`data_loading.errors.${typeOfMessage}`));
      state.dataLoading.status = 'failed';
      state.dataLoading.status = 'inactivity';
    });
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
    DOMContentLoaded: false,
    feeds: [],
    posts: [],
  };

  const i18nInstance = i18next.createInstance();

  i18nInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  }).then(() => {
    const watchedState = watch(state, i18nInstance);

    document.addEventListener('DOMContentLoaded', () => {
      watchedState.DOMContentLoaded = true;
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = new FormData(e.target);

      validateForm(data, watchedState, i18nInstance)
        .then(() => {
          watchedState.url.data = data.get('url');
          watchedState.url.errors = [];
          uploadFeed(watchedState, i18nInstance);
        })
        .catch((errors) => {
          console.log(errors.errors);
          watchedState.url.errors = errors.errors;
        });
    });
  })
    .catch((error) => console.error(error));
};
