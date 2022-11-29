import onChange from 'on-change';
import {
  renderErrors,
  renderBlockedForm,
  renderUnblockedForm,
  renderSuccessDataLoadingMessage,
  renderInitialState,
} from './render.js';

const watchDataLoadingStatus = (state, i18nInstance, value) => {
  switch (value) {
    case 'processing':
      renderBlockedForm();
      break;
    case 'inactivity':
      renderUnblockedForm();
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
    default:
      break;
  }
});
