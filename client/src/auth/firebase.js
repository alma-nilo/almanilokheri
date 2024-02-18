// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
const apiKey = process.env.REACT_APP_apiKey;
const authDomain = process.env.REACT_APP_authDomain;
const projectId = process.env.REACT_APP_projectId;
const storageBucket = process.env.REACT_APP_storageBucket;
const messagingSenderId = process.env.REACT_APP_messagingSenderId;
const appId = process.env.REACT_APP_appId;
// const measurementId = process.env.REACT_APP_measurementId;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  // measurementId,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCTgwZ2Y2BtvXP8hzcfADuau2F3WgIMj4w",
//   authDomain: "gbn-alumni-nilokheri.firebaseapp.com",
//   projectId: "gbn-alumni-nilokheri",
//   storageBucket: "gbn-alumni-nilokheri.appspot.com",
//   messagingSenderId: "65575131168",
//   appId: "1:65575131168:web:fff3ce9ae704404219c445",
// };

// Initialize

const app = initializeApp(firebaseConfig);

// Initialize Firebastore

export const auth = getAuth(app);

// export const analytics = getAnalytics(app);
