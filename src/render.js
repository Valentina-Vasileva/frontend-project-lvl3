import localize from './localize';

const renderInitialState = (i18nInstance) => localize(i18nInstance);

const renderValidationErrors = (state) => {
  document.querySelectorAll('.feedback').forEach((oldError) => oldError.remove());

  const example = document.querySelector('#url-example');

  const newErrors = state.url.errors.map((error) => {
    const errorEl = document.createElement('p');
    errorEl.classList.add('feedback', 'small', 'text-danger', 'position-absolute');
    errorEl.textContent = error;
    return errorEl;
  });
  example.after(...newErrors);
};

export { renderInitialState, renderValidationErrors };
