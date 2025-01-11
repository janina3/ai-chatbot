import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDXz_XGqcM6nHPFNQPDWUOb_skpYaUGRJY",
    authDomain: "codetocareerg7.firebaseapp.com",
    projectId: "codetocareerg7",
    storageBucket: "codetocareerg7.firebasestorage.app",
    messagingSenderId: "833467180028",
    appId: "1:833467180028:web:3f55d0299cd78bd455c879",
    measurementId: "G-9ZY622H121"
  };  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get the Firestore instance

export { db }; // Export for use in other files
