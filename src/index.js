import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Loadable from 'react-loadable';
import LoadingHat from './components/LoadingHat';
import registerServiceWorker from './registerServiceWorker';
const App = Loadable({
  loader: () => import('./App' /* webpackChunkName: "App" */),
  loading() {
    return LoadingHat;
  },
});
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
