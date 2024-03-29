import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import Axios
import axios from 'axios';

// Import Redux
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

// Import React Router
import { BrowserRouter } from 'react-router-dom';

// import toasts
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Set Axios base URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3500/api' ;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
