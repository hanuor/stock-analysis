import create from 'zustand';

type User = {
	uid: string;
	email: string | null;
	metadata: {
		creationTime?: string;
	};
};

type UserMeta = {
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
};

interface UserState {
	email: string | null;
	user: User | null;
	isLoggedIn: boolean;
	isPro: boolean;
	userMeta: UserMeta;
	setEmail: (newEmail: string) => void;
	setUser: (newUser: User | null) => void;
	setIsLoggedIn: (newIsLoggedIn: boolean) => void;
	setIsPro: (newIsPro: boolean) => void;
	setUserMeta: (newUserMeta: UserMeta) => void;
}

export const userState = create<UserState>((set) => ({
	email: null,
	user: null,
	isLoggedIn: false,
	isPro: false,
	userMeta: {},
	setEmail: (newEmail) => set({ email: newEmail }),
	setUser: (newUser) => set({ user: newUser }),
	setIsLoggedIn: (newIsLoggedIn) => set({ isLoggedIn: newIsLoggedIn }),
	setIsPro: (newIsPro) => set({ isPro: newIsPro }),
	setUserMeta: (newUserMeta) => set({ userMeta: newUserMeta }),
}));
