import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDm2uNf6U1r9vvofE1hAqmlklo5QvY7iqY",
    authDomain: "otp-authenticator-19e3a.firebaseapp.com",
    projectId: "otp-authenticator-19e3a",
    storageBucket: "otp-authenticator-19e3a.appspot.com",
    messagingSenderId: "1049982751872",
    appId: "1:1049982751872:web:b1fab05a7bb8a8982ec265",
    measurementId: "G-97DM6HCR63"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };