import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
const WIDGETCONTAINER = import.meta.env.VITE_APP_HTML_TAG || '';
const element = document.getElementById(WIDGETCONTAINER)!
if(!element){
  console.warn("Could not find widget container, Please insert widget container in body of element. " + WIDGETCONTAINER);

  
}
element.style.position= "fixed"
element.style.right = "28px"
element.style.bottom= "20px"
element.style.zIndex = "5000";
ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <App apiKey={element.dataset.apikey || ""} />
  </React.StrictMode>,
)
