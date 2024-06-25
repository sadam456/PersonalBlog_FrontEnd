// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZj5zyCr4oryyGbnl0Hg4jnp9mgqv43Ec",
  authDomain: "personal-blog-16f1d.firebaseapp.com",
  projectId: "personal-blog-16f1d",
  storageBucket: "personal-blog-16f1d.appspot.com",
  messagingSenderId: "203778556542",
  appId: "1:203778556542:web:46fda2e512476eb38dce2f",
  measurementId: "G-B9JCF3QQTX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const signInWithEmailAndPasswordFn = signInWithEmailAndPassword;
export const createUserWithEmailAndPasswordFn = createUserWithEmailAndPassword;
export const googleProvider = new GoogleAuthProvider();
export const EmailAuthProviderFn = EmailAuthProvider;

// Initialize Firestore and get a reference to the service
export const firestore = getFirestore(app);
export const docFn = doc;
export const setDocFn = setDoc;
export const updatePasswordFn = updatePassword;
export const reauthenticateWithCredentialFn = reauthenticateWithCredential;
