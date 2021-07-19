import create from 'zustand';

interface AuthState {
	email: string | null;
	avatar: string | null;
	isLoggedIn: boolean;
	isPro: boolean;
	setEmail: (newEmail: string | null) => void;
	setAvatar: (newAvatar: string | null) => void;
	setIsLoggedIn: (newIsLoggedIn: boolean) => void;
	setIsPro: (newIsPro: boolean) => void;
}

export const authState = create<AuthState>((set) => ({
	email: null,
	avatar: null,
	isLoggedIn: false,
	isPro: false,
	setEmail: (newEmail) => set({ email: newEmail }),
	setAvatar: (newAvatar) => set({ avatar: newAvatar }),
	setIsLoggedIn: (newIsLoggedIn) => set({ isLoggedIn: newIsLoggedIn }),
	setIsPro: (newIsPro) => set({ isPro: newIsPro }),
}));
