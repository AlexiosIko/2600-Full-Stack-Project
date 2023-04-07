import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.js';


import style from './style.css';


const root = createRoot(document.getElementById('react-container'));
root.render(<App />);