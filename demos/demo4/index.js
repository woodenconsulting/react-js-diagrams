import React from 'react';
import ReactDOM from 'react-dom';
import { Demo4 } from './demo4';
import { AppContainer } from 'react-hot-loader';

window.onload = () => {
  const rootEl = document.getElementById('root');
  const render = Component =>
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      rootEl
    );

  render(Demo4);
  if (module.hot) module.hot.accept('./demo4', () => render(Demo4));
};
