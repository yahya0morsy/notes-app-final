import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import {HashRouter, Route, Routes } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')).render(
  <HashRouter >
    <App/>
  </HashRouter>
)
