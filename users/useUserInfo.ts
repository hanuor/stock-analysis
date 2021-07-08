import firebase from './firebase';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface User {
	uid: string;
	email: string | null;
	metadata: {
		creationTime?: string;
	};
}

export function useUserInfo() {
	const auth = getAuth(firebase);
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);

			if (currentUser) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});

		return unsubscribe;
	}, [auth, isLoggedIn, user]);

	return { user, isLoggedIn };
}
