import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

window.electron.onPong(() => {
  console.log('pong!');
});
window.electron.ping();

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
