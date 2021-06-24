import Firebase from 'firebase/app';
import 'firebase/auth';

const firebaseCredentials = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

if (!Firebase.apps.length) {
	Firebase.initializeApp(firebaseCredentials);
}

export default Firebase;
