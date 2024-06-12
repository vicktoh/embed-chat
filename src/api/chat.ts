import { Appearance, ThreadMessage } from "../types";


const env = import.meta.env.VITE_CURRENT_ENV || 'dev';
const prod_url = import.meta.env.VITE_API_URL_PROD;
const dev_url = import.meta.env.VITE_API_URL_DEV;
const ErroCodeMap: Record<number, string> = {
   402: 'Payment Required',
   400: 'Bad Request',
   500: 'Internal Server Error',
   429: 'Service Unavailable',
}
const BASE_URL = env === 'dev' ? dev_url : prod_url;

console.log(BASE_URL, env, "🌹")

export const call = async <R=object>(path: string, apiKey:string, body?: object): Promise<R> =>{
   const res = await fetch(path, {
      method: 'POST',
      body: JSON.stringify({ apiKey, ...(body || {}) }),
  });
  if(!res.ok){
     try {
        const data = await res.json();
        throw new Error(data?.message);
     } catch (error) {
        throw new Error(ErroCodeMap[res.status] || "Unknow Error");
     }
  }
  const data = await res.json();
  return data;
}
export const startNewChat =  async (apiKey: string, message?: {role: string, content: string} []) => {
   const path = env === 'prod' ? `https://newchat-${BASE_URL}`: `${BASE_URL}/newchat`;
   return call(path, apiKey, message ? {message}: undefined);
}

export const sendMessage = async (chatId: string, message: string, apiKey:string) => {
   const path =env === 'prod' ? `https://converse-${BASE_URL}`: `${BASE_URL}/converse`;
   return call<ThreadMessage[]>(path, apiKey, {chatId, message});
}
export const streamChat = async (
   conversationRequest: {chatId: string, message: string, apiKey:string },
   onReceiveChunk :(chunk: string) =>void,
   onEnd: (fullChunk?:string) => void, 
   onError: (message: string) => void,
   ) => {
       const path =env === 'prod' ? `https://streamConverse-${BASE_URL}`: `${BASE_URL}/streamConverse`;
       const response = await fetch(path, {
           method: 'POST',
           headers:{
               'Content-Type': 'application/json',
               // 'Authorization': 'Bearer ' + message: string
           },
           body: JSON.stringify(conversationRequest),
       })
       if(!response.ok){
           onError(response.statusText)
           return;
       }
       let chunks = "";
       const reader = response.body?.getReader();
       while (true && reader) {
         const { done, value } = await reader?.read() || {};
         const fullMessage = new TextDecoder().decode(value);
         
         
         if (done) {
           break;
         }

         onReceiveChunk(fullMessage);

         chunks += (fullMessage);
       }
       onEnd(chunks);
       console.log("done for real")
      return
   }

export const listMessage = async (chatId: string, apiKey: string) => {
   const path =env === 'prod' ? `https://listMessage-${BASE_URL}`: `${BASE_URL}/listMessage`;
   return call<ThreadMessage[]>(path, apiKey, {chatId});
}

export const defaultAppearance: Appearance = {
   brandColor: "#69d962",
   title: "Hello there",
   description: "Start chatting with me about this company",
   icon: "circle",
   textColor: "#000",
   defaultMessage: "Welcome how may I help you today",
   theme: "light"
 }

