const renderInitialState = (i18nInstance) => {
  const title = document.querySelector('title');
  const h1 = document.querySelector('h1');
  const lead = document.querySelector('.lead');
  const urlInput = document.querySelector('#url-input');
  const urlInputLabel = document.querySelector('label[for="url-input"]');
  const addButton = document.querySelector('button[aria-label="add"]');
  const urlExample = document.querySelector('#url-example');
  const author = document.querySelector('#author');

  const postModal = document.querySelector('#postModal');
  const modalFooter = postModal.querySelector('.modal-footer');
  const linkToResource = modalFooter.querySelector('a');
  const footerButtonClose = modalFooter.querySelector('button');

  title.textContent = i18nInstance.t('title');
  h1.textContent = i18nInstance.t('app_name');
  lead.textContent = i18nInstance.t('lead');
  urlInput.placeholder = i18nInstance.t('inputs.url.placeholder');
  urlInputLabel.textContent = i18nInstance.t('inputs.url.label');
  addButton.textContent = i18nInstance.t('buttons.add');
  urlExample.textContent = i18nInstance.t('inputs.url.example');
  author.textContent = i18nInstance.t('author');
  linkToResource.textContent = i18nInstance.t('buttons.read');
  footerButtonClose.textContent = i18nInstance.t('buttons.close');
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
  const button = form.querySelector('button[type="submit"]');
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

  const input = document.querySelector('#url-input');
  input.value = '';
};

const renderFeeds = (feeds, i18nInstance) => {
  const feedsEl = document.querySelector('.feeds');
  feedsEl.innerHTML = '';

  if (feeds.length > 0) {
    const feedsTitle = document.createElement('h2');
    feedsTitle.textContent = i18nInstance.t('feeds.title');
    feedsTitle.classList.add('h4', 'my-4');

    const ul = document.createElement('ul');
    ul.classList.add('list-group');

    const feedLiEls = feeds.map((feed) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'border-0', 'px-0');

      const titleEl = document.createElement('h3');
      titleEl.textContent = feed.title;
      titleEl.classList.add('h6', 'm-0');

      const descEl = document.createElement('p');
      descEl.textContent = feed.description;
      descEl.classList.add('small', 'm-0', 'text-black-50');

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
    postsTitle.classList.add('h4', 'my-4');

    const ul = document.createElement('ul');
    ul.classList.add('list-group');

    const postLiEls = posts.map((post) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'border-0', 'align-items-start', 'justify-content-between', 'd-flex', 'px-0');

      const a = document.createElement('a');
      a.textContent = post.title;
      a.href = post.link;
      a.target = '_blank';
      a.classList.add('fw-bold');
      a.dataset.postId = post.id;

      const button = document.createElement('button');
      button.textContent = i18nInstance.t('buttons.watch');
      button.classList.add('btn', 'btn-sm', 'btn-outline-primary');
      button.dataset.postId = post.id;
      button.dataset.bsToggle = 'modal';
      button.dataset.bsTarget = '#postModal';

      li.append(a, button);
      return li;
    });
    ul.append(...postLiEls);
    postsEl.append(postsTitle, ul);
  }
};

const renderViewedPosts = (viewedPostIds) => {
  viewedPostIds.forEach((id) => {
    const a = document.querySelector(`a[data-post-id="${id}"]`);
    a.classList.add('link-secondary');
    a.classList.replace('fw-bold', 'fw-normal');
  });
};

const renderPostModal = (state) => {
  const modal = document.querySelector('#postModal');
  const modalHeader = modal.querySelector('.modal-header');
  const modalFooter = modal.querySelector('.modal-footer');

  const modalTitle = modalHeader.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body');
  const linkToResource = modalFooter.querySelector('a');

  const post = state.posts.find(({ id }) => id === state.uiState.currentPostId);

  modalTitle.textContent = post.title;
  modalBody.textContent = post.description;
  linkToResource.href = post.link;
  linkToResource.target = '_blank';
};

export {
  renderInitialState,
  renderErrors,
  renderFormState,
  renderSuccessDataLoadingMessage,
  renderFeeds,
  renderPosts,
  renderViewedPosts,
  renderPostModal,
};
