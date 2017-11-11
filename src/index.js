import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers';
import 'bootstrap/dist/css/bootstrap.css';


const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(<BrowserRouter>
  <Provider store = {store}>
    <App/>
  </Provider>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
