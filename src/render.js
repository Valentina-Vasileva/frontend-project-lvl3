import _ from 'lodash';
import localize from './localize';

export default (state, i18nInstance) => {
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
