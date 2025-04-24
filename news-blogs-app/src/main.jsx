import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

axios.defaults.headers.post["Content-Type"] =
  // "application/x-www-form-urlencoded";
  "application/json";
axios.defaults.baseURL = 'http://localhost:1457';
axios.defaults.timeout = 5000;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
