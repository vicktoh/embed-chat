import  { FC, useEffect, useRef, useState } from 'react'
import { Appearance } from '../types';
import { ChatBubble } from './chat-bubble';
type ChatPaneProps = {
   apiKey: string;
   appearance: Appearance, 
   show: boolean;

}
export const ChatPane:FC<ChatPaneProps> = ({appearance, show}) => {
   const [chats, setChats] = useState<{role: "user" | "assistant", text: string}[]>([{role: "assistant", text: "I am kunle how may I help you today"}])
   const [userInput, setUserInput] = useState('');
   const containerRef = useRef<HTMLDivElement>(null)
   const endRef = useRef<HTMLDivElement>(null);
   const sendChatMessage = () => {
     setChats((value) => [...value, { text: userInput, role: 'user' }]);
     setUserInput('');
   }
   useEffect(() => {
      if(containerRef.current?.scrollHeight || 0  > 356){
         endRef.current && endRef.current.scrollIntoView({behavior: "smooth"});
      }
   }, [chats])
  return (
      <div
          className={` absolute  bg-white dark:bg-slate-800 border-slate-400 rounded-lg w-mobile md:w-[400px] bottom-[50px] right-[-20px] md:right-[50px] `}
          style={{ display: show ? 'block' : 'none' }}
      >
          <div
              className={`flex flex-col gap-2 justify-center  rounded-tr-lg rounded-tl-lg content-center py-5 px-8`}
              style={{ backgroundColor: appearance.brandColor }}
          >
              <h3
                  className={`text-3xl text-center font-bold text-[${
                      appearance.textColor || '#ffff'
                  }]`}
              >
                  {appearance.title}
              </h3>
              <p className="text-base text-center">{appearance.description}</p>
          </div>
          <div className=" flex flex-col  relative   rounded-b-lg ">
              <div className="flex flex-col h-[356px] overflow-y-auto overflow-x-hidden px-4" ref={containerRef}>
                  {chats.map((chat, id) => (
                      <ChatBubble
                          key={`dumbledore-chat-${id}`}
                          timestamp={1000}
                          appearance={appearance}
                          role={chat.role}
                          text={chat.text}
                      />
                  ))}

                  <div ref={endRef}></div>
              </div>

              <div className="flex bg-white dark:bg-slate-800 flex-row items-center relative py-5 px-4 rounded-b-lg">
                  <input
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="py-3 pl-2 pr-8 w-full rounded-md bg-white border text-black dark:bg-slate-800 dark:text-white"
                      placeholder="Ask me a question"
                  />
                  <button
                      onClick={sendChatMessage}
                      className={`absolute right-5 py-1 px-4 border-1`}
                      style={{ backgroundColor: appearance.brandColor }}
                  >
                      Send
                  </button>
              </div>
          </div>
      </div>
  );
}
