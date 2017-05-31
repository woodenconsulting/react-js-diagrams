import { createStore, compose, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { reducer } from './reducer';

const logger = createLogger({
  level: 'info',
  collapsed: true
});

export const store = applyMiddleware(logger)(compose(createStore))(reducer);
