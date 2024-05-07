import { initializeApp } from "firebase/app";
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import  {GoogleAuthProvider, EmailAuthProvider, getAuth} from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAK6l8ETrRBgwq6_AV-lMX-VoYq9-vshU4",
  authDomain: "van-app-f3dac.firebaseapp.com",
  projectId: "van-app-f3dac",
  storageBucket: "van-app-f3dac.appspot.com",
  messagingSenderId: "356214122845",
  appId: "1:356214122845:web:09fa76b448f3ae417b60b4",
  measurementId: "G-DVZZBXFFGD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const ui = new firebaseui.auth.AuthUI(auth);

type startFirebaseAuthProps = {
  elementId: string
  signInSuccessUrl: string
  termsOfServiceUrl: string
  privacyPolicyUrl: string
}

export const startFirebaseAuth = ({elementId, privacyPolicyUrl,signInSuccessUrl,
termsOfServiceUrl}: startFirebaseAuthProps): void => {
  const uiConfig = {
    signInSuccessUrl,
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: termsOfServiceUrl,
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign(privacyPolicyUrl);
    }
  };
  ui.start(`#${elementId}`, uiConfig);

}