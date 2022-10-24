import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import { createStore } from 'redux';
// import allReducers from './reducers/index';
// import { Provider } from 'react-redux';

// const store = createStore(
//   allReducers,
//   (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
//     (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
// );

// <Provider store={store}>
// </Provider>,

ReactDOM.render(<App />, document.getElementById('root'));
