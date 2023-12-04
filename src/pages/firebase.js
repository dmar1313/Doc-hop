// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export { app as firebase}