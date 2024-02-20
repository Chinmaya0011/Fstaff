import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGN7j9co3r4ugqiJYjv3-YET19KnNOXaI",
  authDomain: "my-staff-3cab1.firebaseapp.com",
  projectId: "my-staff-3cab1",
  storageBucket: "my-staff-3cab1.appspot.com",
  messagingSenderId: "538330051111",
  appId: "1:538330051111:web:8cd92f64bac5bd58999402",
  measurementId: "G-K04VBD58WR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
