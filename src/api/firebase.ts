import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { Appearance } from "../types";
import { defaultAppearance } from "./chat";

const firebaseConfig = {
   apiKey: 'AIzaSyBMQ7808wMqxxfGEkG3E3uaW8HwMYl2-fk',
   authDomain: 'dumbledore-ai.firebaseapp.com',
   projectId: 'dumbledore-ai',
   storageBucket: 'dumbledore-ai.appspot.com',
   messagingSenderId: '219143742768',
   appId: '1:219143742768:web:0f8cbdc6a0483d763d94f5',
   measurementId: 'G-3MEGCGJCNV',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


export const listenOnAppearance = (apiKey: string, onReceive: (appearance: Appearance) => void) => {
   const dbRef = ref(db,`botAppearance/${apiKey}`);
   const unsub = onValue(dbRef, (snap) => {
      if(snap.exists()){
         const appearance = snap.val() as Appearance;
         onReceive(appearance);
      } else{
         onReceive(defaultAppearance);
      }
   })

   return unsub;
}