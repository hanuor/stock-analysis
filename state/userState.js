// todo: Add the "persist" middleware to remember logged in state
import create from "zustand";

const userState = create((set) => ({
	email: "",
	isLoggedIn: false,
	setEmail: (newEmail) => set({ email: newEmail }),
	setIsLoggedIn: (newIsLoggedIn) => set({ isLoggedIn: newIsLoggedIn }),
}));
export default userState;
