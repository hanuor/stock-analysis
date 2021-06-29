import { useState, useEffect } from 'react';
import { auth, db } from './firebase';

export default function useUserInfo() {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isPro, setIsPro] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((currentUser) => {
			setUser(currentUser);

			if (currentUser) {
				setIsLoggedIn(true);
				db.collection('users')
					.doc(currentUser.uid)
					.get()
					.then((doc) => {
						let data = doc.data();
						if (
							data.status === 'new' ||
							data.status === 'active' ||
							data.status === 'trialing' ||
							data.status === 'past_due'
						) {
							setIsPro(true);
						}
					})
					.catch((err) => {
						console.log('getUserMeta error:', err);
					});
			}
		});

		return unsubscribe;
	}, [isLoggedIn]);

	return { user, isLoggedIn, setIsLoggedIn, isPro };
}
