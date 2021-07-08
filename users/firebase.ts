import { initializeApp, getApps } from 'firebase/app';

const FIREBASE_API_KEYS = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
};

let firebase = getApps()[0];

if (!firebase) {
	firebase = initializeApp(FIREBASE_API_KEYS);
}

export default firebase;
