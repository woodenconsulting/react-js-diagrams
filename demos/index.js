import React from 'react';
import ReactDOM from 'react-dom';
import { Demos } from './demos';
import { AppContainer } from 'react-hot-loader';
import './test.scss';

window.onload = () => {
  const rootEl = document.getElementById('root');
  const render = Component =>
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      rootEl
    );


  render(Demos);
  if (module.hot) module.hot.accept('./demos', () => render(Demos));
};
