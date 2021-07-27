import create from 'zustand';

interface AuthState {
	email: string | null;
	avatar: string | null;
	isLoggedIn: boolean;
	isPro: boolean;
	status: 'unchecked' | 'loading' | 'completed';
	setEmail: (newEmail: string | null) => void;
	setAvatar: (newAvatar: string | null) => void;
	setIsLoggedIn: (newIsLoggedIn: boolean) => void;
	setIsPro: (newIsPro: boolean) => void;
	setStatus: (newStatus: 'unchecked' | 'loading' | 'completed') => void;
}

export const authState = create<AuthState>((set) => ({
	email: null,
	avatar: null,
	isLoggedIn: false,
	isPro: false,
	status: 'unchecked',
	setEmail: (newEmail) => set({ email: newEmail }),
	setAvatar: (newAvatar) => set({ avatar: newAvatar }),
	setIsLoggedIn: (newIsLoggedIn) => set({ isLoggedIn: newIsLoggedIn }),
	setIsPro: (newIsPro) => set({ isPro: newIsPro }),
	setStatus: (newStatus) => set({ status: newStatus }),
}));
