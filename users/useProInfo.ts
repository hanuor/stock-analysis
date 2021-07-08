import firebase from './firebase';
import { useUserInfo } from './useUserInfo';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { userState } from 'state/userState';

export function useProInfo() {
	const { user } = useUserInfo();
	const userMeta = userState((state) => state.userMeta);
	const setUserMeta = userState((state) => state.setUserMeta);
	const isPro = userState((state) => state.isPro);
	const setIsPro = userState((state) => state.setIsPro);

	useEffect(() => {
		console.log(user);
		console.log('useProInfo');
		async function getUserMeta(uid: string) {
			const db = getFirestore(firebase);
			try {
				const userDbRef = doc(db, 'users', uid);
				const userDoc = await getDoc(userDbRef);
				if (userDoc.exists()) {
					const data = userDoc.data();
					setUserMeta(data);

					if (
						data.status === 'new' ||
						data.status === 'active' ||
						data.status === 'trialing' ||
						data.status === 'past_due'
					) {
						console.log('user is pro');
						setIsPro(true);
					} else {
						console.log('user is not pro');
						setIsPro(false);
					}
				} else {
					return false;
				}
			} catch (error) {
				console.log(error);
			}
			return;
		}

		if (!user) {
			setIsPro(false);
		} else {
			if (!isPro) {
				getUserMeta(user.uid);
			}
		}
	}, [isPro, setIsPro, setUserMeta, user]);

	return { isPro, userMeta };
}
