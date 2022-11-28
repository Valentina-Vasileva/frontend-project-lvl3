import onChange from 'on-change';
import { renderValidationErrors } from './render.js';

export default (state) => onChange(state, (path) => {
  switch (path) {
    case 'url.errors':
      renderValidationErrors(state);
      break;
    default:
      throw new Error(`Unexpected path: ${path}`);
  }
});
