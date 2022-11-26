import onChange from 'on-change';
import render from './render';

export default (state, i18nInstance) => onChange(state, () => {
  render(state, i18nInstance);
});
