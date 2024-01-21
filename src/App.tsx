import './App.css'
import { useEffect, useState } from 'react'
import { Appearance } from './types';
import { ChatPane } from './components/chat-pane';
import { Icons } from './assets/chatsquare';
import { listenOnAppearance } from './api/firebase';
function App({apiKey}: {apiKey:string}) {
  const [show, setShow] = useState<boolean>(false);
  const [appearance, setAppearance] = useState<Appearance>();


  useEffect(() => {
    const unsub = listenOnAppearance(apiKey, (appearance)=> {
      setAppearance(appearance)
    });
    return unsub
  }, [apiKey])
   
     return appearance ? (
         <div
             className={`relative ${appearance.theme === 'dark' ? 'dark' : ''}`}
         >
             <ChatPane apiKey={apiKey} appearance={appearance} show={show} />
             <div
                 style={{
                     backgroundColor: appearance.brandColor,
                     color: appearance.textColor,
                 }}
                 className="w-[56px] h-[56px] rounded-full flex items-center justify-center "
                 onClick={() => setShow((val) => !val)}
             >
                 {appearance.icon === 'circle' ||
                 appearance.icon === 'square' ? (
                     Icons[appearance.icon].big
                 ) : (
                     <img
                         src={appearance.icon}
                         className="w-10 h-10 rounded-full"
                     />
                 )}
             </div>
         </div>
     ) : null;
      
}

export default App
