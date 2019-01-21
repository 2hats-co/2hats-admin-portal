import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import LoadingHat from './components/LoadingHat';
import registerServiceWorker from './registerServiceWorker';

const App = lazy(() => import('./App' /* webpackChunkName: "App" */));

ReactDOM.render(
  <Suspense fallback={<LoadingHat />}>
    <App />
  </Suspense>,
  document.getElementById('root')
);
registerServiceWorker();

if (window.location.hostname === 'localhost')
  window.document.title = 'LOCAL 2hats Admin';
