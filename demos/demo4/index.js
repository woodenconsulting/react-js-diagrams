import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { store } from './store';
import { Demo4 } from './demo4';

window.onload = () => {
  const rootEl = document.getElementById('root');
  const render = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <Component />
        </AppContainer>
      </Provider>,
      rootEl
    );
  };

  render(Demo4);
  if (module.hot) module.hot.accept('./demo4', () => render(Demo4));
};
