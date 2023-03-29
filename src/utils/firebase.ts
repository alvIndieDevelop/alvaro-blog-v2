import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID!,
};

let app: FirebaseApp;
let analytics: Promise<Analytics | null>;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
}

export { analytics, app };
