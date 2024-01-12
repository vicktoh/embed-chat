import './App.css'
import { useState } from 'react'
import { Appearance } from './types';
import { ChatPane } from './components/chat-pane';
const defaultAppearance: Appearance = {
  brandColor: "#69d962",
  title: "Hello there",
  description: "Start chatting with me about this company",
  icon: "",
  textColor: "#ffff",

}
function App({apiKey}: {apiKey:string}) {
  const [show, setShow] = useState<boolean>(false);
  console.log(apiKey, "api key 🔥")

  return (
      <div className="relative">
          <ChatPane
              apiKey={apiKey}
              appearance={defaultAppearance}
              show={show}
          />
          <div style={{backgroundColor: defaultAppearance.brandColor}} className='w-[56px] h-[56px] rounded-full flex items-center justify-center ' onClick={() => setShow((val) => !val)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
          </div>
      </div>
  );
}

export default App
