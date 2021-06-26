import { useState, useEffect } from 'react';
import { auth } from './firebase';

export default function useUserInfo() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
		});

		return unsubscribe;
	}, []);

	return user;
}
