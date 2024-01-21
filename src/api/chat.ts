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
   const path = `${BASE_URL}/newchat`;
   return call(path, apiKey, message ? {message}: undefined);
}

export const sendMessage = async (chatId: string, message: string, apiKey:string) => {
   const path = `${BASE_URL}/converse`;
   return call<ThreadMessage[]>(path, apiKey, {chatId, message});
}

export const listMessage = async (chatId: string, apiKey: string) => {
   const path = `${BASE_URL}/list-message`;
   return call(path, apiKey, {chatId});
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

