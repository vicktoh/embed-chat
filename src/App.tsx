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
             className={`dmd-relative ${
                 appearance.theme === 'dark' ? 'dark' : ''
             }`}
         >
             <ChatPane apiKey={apiKey} appearance={appearance} show={show} onToggleShow={()=> setShow(false)}/>
             <div
                 style={{
                     backgroundColor: appearance.brandColor,
                     color: appearance.textColor,
                 }}
                 className="dmd-w-[56px] dmd-h-[56px] dmd-rounded-full dmd-flex dmd-items-center dmd-justify-center dmd-cursor-pointer "
                 onClick={() => setShow((val) => !val)}
             >
                 {show ? (
                     <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="24"
                         height="24"
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         stroke-width="2"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         className="lucide lucide-x"
                     >
                         <path d="M18 6 6 18" />
                         <path d="m6 6 12 12" />
                     </svg>
                 ) : (
                     <>
                         {appearance.icon === 'circle' ||
                         appearance.icon === 'square' ? (
                             Icons[appearance.icon].big
                         ) : (
                             <img
                                 src={appearance.icon}
                                 className="dmd-w-10 dmd-h-10 dmd-rounded-full"
                             />
                         )}
                     </>
                 )}
             </div>
         </div>
     ) : null;
      
}

export default App
