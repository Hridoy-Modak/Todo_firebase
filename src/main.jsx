import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import firebaseConfig from './firebase.config.js'
import { getDatabase, ref, set  } from "firebase/database";

ReactDOM.createRoot(document.getElementById('root')).render(

    <App />

)
