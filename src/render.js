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

const renderFeeds = (feeds, i18nInstance) => {
  const feedsEl = document.querySelector('.feeds');
  feedsEl.innerHTML = '';

  if (feeds.length > 0) {
    const feedsTitle = document.createElement('h2');
    feedsTitle.textContent = i18nInstance.t('feeds.title');

    const ul = document.createElement('ul');
    ul.classList.add('list-group');

    const feedLiEls = feeds.map((feed) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'border-0');

      const titleEl = document.createElement('h3');
      titleEl.textContent = feed.title;

      const descEl = document.createElement('p');
      descEl.textContent = feed.description;

      li.append(titleEl, descEl);
      return li;
    });
    ul.append(...feedLiEls);
    feedsEl.append(feedsTitle, ul);
  }
};

const renderPosts = (posts, i18nInstance) => {
  const postsEl = document.querySelector('.posts');
  postsEl.innerHTML = '';

  if (posts.length > 0) {
    const postsTitle = document.createElement('h2');
    postsTitle.textContent = i18nInstance.t('posts.title');

    const ul = document.createElement('ul');
    ul.classList.add('list-group');

    const postLiEls = posts.map((post) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'border-0');

      const a = document.createElement('a');
      a.textContent = post.title;
      a.href = post.link;

      const button = document.createElement('button');
      button.textContent = i18nInstance.t('buttons.watch');

      li.append(a, button);
      return li;
    });
    ul.append(...postLiEls);
    postsEl.append(postsTitle, ul);
  }
};

export {
  renderInitialState,
  renderErrors,
  renderFormState,
  renderSuccessDataLoadingMessage,
  renderFeeds,
  renderPosts,
};
