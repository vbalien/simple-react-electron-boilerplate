import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './index.css';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('app')
);
