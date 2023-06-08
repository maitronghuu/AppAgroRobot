import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtbt86NZAGdha9EibXs5N2UXdtRCJ25EA",
  authDomain: "tudiendict.firebaseapp.com",
  databaseURL: "https://tudiendict-default-rtdb.firebaseio.com",
  projectId: "tudiendict",
  storageBucket: "tudiendict.appspot.com",
  messagingSenderId: "344257519816",
  appId: "1:344257519816:web:a60248af82e0b1448585fd",
  measurementId: "G-QHEVM1KB3J",
};

export const fApp = initializeApp(firebaseConfig);
export const fDatabase = getDatabase(fApp);
export const fStorage = getStorage(fApp);
export const fAuth = getAuth(fApp);
