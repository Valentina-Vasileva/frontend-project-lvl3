import i18next from 'i18next';
import { object, string, setLocale } from 'yup';
import resources from './locales/index.js';
import render from './render.js';
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
  }).then(() => render(state, i18nInstance))
    .then(() => {
      const watchedState = watch(state, i18nInstance);

      const form = document.querySelector('form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        validateForm(data, i18nInstance)
          .then(() => {
            watchedState.url = data.get('url');
            watchedState.errors = [];
          })
          .catch((errors) => {
            watchedState.errors = errors.errors;
          });
      });
    })
    .catch((error) => console.error(error));
};
