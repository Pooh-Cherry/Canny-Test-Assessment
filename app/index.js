import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './components/App';
import posts from './reducers/posts';
import sort from './reducers/sort';

function render() {
  const store = createStore(
    combineReducers({
      posts,
      sort,
    }),
    {},
    applyMiddleware(thunkMiddleware)
  );

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
}

render();
