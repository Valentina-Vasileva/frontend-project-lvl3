import onChange from 'on-change';
import {
  renderErrors,
  renderSuccessDataLoadingMessage,
  renderInitialState,
  renderFormState,
  renderFeeds,
  renderPosts,
  renderViewedPosts,
  renderPostModal,
} from './render.js';

const watchDataLoadingStatus = (state, i18nInstance, value) => {
  switch (value) {
    case 'processing':
      renderFormState(true);
      break;
    case 'inactivity':
      renderFormState(false);
      break;
    case 'finished':
      renderSuccessDataLoadingMessage(i18nInstance);
      break;
    case 'failed':
      renderErrors(state.dataLoading.errors);
      break;
    default:
      throw new Error(`Unknown dataLoading.status ${value}`);
  }
};

export default (state, i18nInstance) => onChange(state, (path, value) => {
  switch (path) {
    case 'url.errors':
      renderErrors(state.url.errors);
      break;
    case 'dataLoading.status':
      watchDataLoadingStatus(state, i18nInstance, value);
      break;
    case 'DOMContentLoaded':
      renderInitialState(i18nInstance);
      break;
    case 'feeds':
      renderFeeds(state.feeds, i18nInstance);
      break;
    case 'posts':
      renderPosts(state.posts, i18nInstance);
      break;
    case 'uiState.viewedPostIds':
      renderViewedPosts(state.uiState.viewedPostIds);
      break;
    case 'uiState.currentPostId':
      renderPostModal(state);
      break;
    default:
      break;
  }
});
