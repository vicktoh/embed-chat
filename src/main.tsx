import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
const element = document.getElementById('dumbledore-ai-embed')!
element.style.position= "fixed"
element.style.right = "48px"
element.style.bottom= "40px"
ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <App apiKey={element.dataset.apikey || ""} />
  </React.StrictMode>,
)
