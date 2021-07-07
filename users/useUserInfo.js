import { useState, useEffect } from 'react';
import { firebaseApp } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function useUserInfo() {
	const auth = getAuth(firebaseApp);
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);

			if (currentUser) {
				setIsLoggedIn(true);
			}
		});

		return unsubscribe;
	}, [auth, isLoggedIn]);

	return { user, isLoggedIn, setIsLoggedIn };
}
