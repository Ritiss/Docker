import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import App from './App.jsx'
import './style/index.scss'
import store from "./store/reducer/rootReducer"
const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
