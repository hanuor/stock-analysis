import firebase from './firebase';
import { useUserInfo } from './useUserInfo';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

interface UserMeta {
	country?: string;
	email?: string;
	name?: string;
	nextPaymentAmount?: string;
	nextPaymentDate?: string;
	paymentMethod?: string;
	paymentCurrency?: string;
	plan?: string;
	status?: string;
	urlCancel?: string;
	urlReceipt?: string;
	urlUpdate?: string;
}

export function useProInfo() {
	const { user } = useUserInfo();
	const [isPro, setIsPro] = useState<boolean | undefined>();
	const db = getFirestore(firebase);
	const [userMeta, setUserMeta] = useState<UserMeta>({});

	useEffect(() => {
		async function getUserMeta(uid: string) {
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
						setIsPro(true);
					} else {
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
			getUserMeta(user.uid);
		}
	}, [db, user]);

	return { isPro, userMeta };
}
