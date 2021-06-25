import Layout from '@/Layout/LayoutFullWidth';
import LoginForm from '@/components/Users/LoginForm';
import LogoutForm from '@/components/Users/LogoutForm';
import { useAuth } from 'firebase/AuthContext';

export default function Login() {
	const { currentUser } = useAuth();

	return <Layout>{currentUser ? <LogoutForm /> : <LoginForm />}</Layout>;
}
