import localize from './localize';

export default (state, i18nInstance) => {
  localize(i18nInstance);

  const oldErrors = document.querySelectorAll('.feedback');
  oldErrors.forEach((oldError) => {
    oldError.remove();
  });

  const example = document.querySelector('#url-example');
  const newErrors = state.errors.map((error) => {
    const errorEl = document.createElement('p');
    errorEl.classList.add('feedback', 'small', 'text-danger', 'position-absolute');
    errorEl.textContent = error;
    return errorEl;
  });
  example.after(...newErrors);
};
