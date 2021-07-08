import firebase from './firebase';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { userState } from 'state/userState';

export function useUserInfo() {
	const auth = getAuth(firebase);
	const user = userState((state) => state.user);
	const setUser = userState((state) => state.setUser);
	const isLoggedIn = userState((state) => state.isLoggedIn);
	const setIsLoggedIn = userState((state) => state.setIsLoggedIn);

	useEffect(() => {
		console.log('useUserInfo');
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);

			if (currentUser) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});

		return unsubscribe;
	}, [auth, isLoggedIn, setIsLoggedIn, setUser, user]);

	return { user, isLoggedIn };
}
