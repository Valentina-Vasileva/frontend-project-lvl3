const renderInitialState = (i18nInstance) => {
  const title = document.querySelector('title');
  const h1 = document.querySelector('h1');
  const lead = document.querySelector('.lead');
  const urlInput = document.querySelector('#url-input');
  const urlInputLabel = document.querySelector('label[for="url-input"]');
  const addButton = document.querySelector('input[type="submit"]');
  const urlExample = document.querySelector('#url-example');
  const author = document.querySelector('#author');

  title.textContent = i18nInstance.t('title');
  h1.textContent = i18nInstance.t('app_name');
  lead.textContent = i18nInstance.t('lead');
  urlInput.placeholder = i18nInstance.t('inputs.url.placeholder');
  urlInputLabel.textContent = i18nInstance.t('inputs.url.label');
  addButton.value = i18nInstance.t('buttons.add');
  urlExample.textContent = i18nInstance.t('inputs.url.example');
  author.textContent = i18nInstance.t('author');
};

const renderErrors = (errors) => {
  document.querySelectorAll('.feedback').forEach((oldError) => oldError.remove());

  const example = document.querySelector('#url-example');

  const newErrors = errors.map((error) => {
    const errorEl = document.createElement('p');
    errorEl.classList.add('feedback', 'small', 'text-danger', 'position-absolute');
    errorEl.textContent = error;
    return errorEl;
  });
  example.after(...newErrors);
};

const renderFormState = (blocked = false) => {
  const form = document.querySelector('form');
  const button = form.querySelector('input[type="submit"]');
  const input = form.querySelector('#url-input');
  button.disabled = blocked;
  input.disabled = blocked;
};

const renderSuccessDataLoadingMessage = (i18nInstance) => {
  document.querySelectorAll('.feedback').forEach((oldError) => oldError.remove());

  const example = document.querySelector('#url-example');

  const successMessageEl = document.createElement('p');
  successMessageEl.classList.add('feedback', 'small', 'text-success', 'position-absolute');
  successMessageEl.textContent = i18nInstance.t('data_loading.success');
  example.after(successMessageEl);
};

export {
  renderInitialState,
  renderErrors,
  renderFormState,
  renderSuccessDataLoadingMessage,
};
