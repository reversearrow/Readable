import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(<BrowserRouter>
  <Provider store = {store}>
    <App/>
  </Provider>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
