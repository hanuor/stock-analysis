import create from 'zustand';

const registrationState = create((set) => ({
	email: '',
	password: '',
	setEmail: (newEmail) => set({ email: newEmail }),
	setPassword: (newPassword) => set({ password: newPassword }),
}));
export default registrationState;
