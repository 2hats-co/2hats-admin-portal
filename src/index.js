import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Loadable from 'react-loadable';
import LoadingHat from './components/LoadingHat';
import registerServiceWorker from './registerServiceWorker';
const App = Loadable({
  loader: () => import('./App' /* webpackChunkName: "App" */),
  loading: LoadingHat,
});
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

if (window.location.hostname === 'localhost')
  window.document.title = 'LOCAL 2hats Admin';
