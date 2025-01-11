"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyDXz_XGqcM6nHPFNQPDWUOb_skpYaUGRJY",
    authDomain: "codetocareerg7.firebaseapp.com",
    projectId: "codetocareerg7",
    storageBucket: "codetocareerg7.firebasestorage.app",
    messagingSenderId: "833467180028",
    appId: "1:833467180028:web:3f55d0299cd78bd455c879",
    measurementId: "G-9ZY622H121"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(app); // Get the Firestore instance
exports.db = db;
