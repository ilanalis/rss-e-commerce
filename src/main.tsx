import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(getRootDiv()).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

function getRootDiv(): HTMLDivElement {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'root';
  document.body.append(rootDiv);

  return rootDiv;
}
