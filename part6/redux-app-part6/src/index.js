import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from 'react-redux'
import noteReducer from "./reducers/noteReducer";
import App from './App'

const store = createStore(
  noteReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});
store.dispatch({
  type: "NEW_NOTE",
  data: {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  data: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});


ReactDOM.render(
  <Provider store={store}>    <App />
  </Provider>,  document.getElementById('root')
)
