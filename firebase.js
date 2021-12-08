import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDnl_tqaTPtqnKq8cr_Gij-p6eyyy2Z8HU",
    authDomain: "cowapp-86111.firebaseapp.com",
    projectId: "cowapp-86111",
    storageBucket: "cowapp-86111.appspot.com",
    messagingSenderId: "474241292444",
    appId: "1:474241292444:web:b81b3464f443fcf510f559"
};
  

const app = initializeApp(firebaseConfig);
export default { app };


  