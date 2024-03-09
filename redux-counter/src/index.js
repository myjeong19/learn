import React from 'react';
import ReactDOM from 'react-dom/client';

// 292-1 import Provider
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

// 292-3 import store
import { store } from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 292-2 Provider로 App을 감싸준다.
  <Provider store={store}>
    {/* 292-4 store 속성 부여 */}
    <App />
  </Provider>
);
