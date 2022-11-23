export default (i18nInstance) => {
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
