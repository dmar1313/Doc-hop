import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyBZTV1d2DI-j_X7UAsnzomzMrgtUUBkiCY",
 authDomain: "doc-hop.firebaseapp.com",
 databaseURL: "https://doc-hop-default-rtdb.firebaseio.com",
 projectId: "doc-hop",
 storageBucket: "doc-hop.appspot.com",
 messagingSenderId: "975681851472",
 appId: "1:975681851472:web:c9528d81e0d3e7fd1fc155",
 measurementId: "G-W7YVF4FHDK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);