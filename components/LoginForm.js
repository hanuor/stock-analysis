import { useState } from "react";
import userState from "@State/userState";

async function login(email, password) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (email === "kris" && password === "password") {
				resolve();
			} else {
				reject();
			}
		}, 1000);
	});
}

const LoginForm = () => {
	const isLoggedIn = userState((state) => state.isLoggedIn);
	const setIsLoggedIn = userState((state) => state.setIsLoggedIn);
	const email = userState((state) => state.email);
	const setEmail = userState((state) => state.setEmail);

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();

		setError("");
		setLoading(true);

		try {
			await login(inputEmail, inputPassword);
			setIsLoggedIn(true);
			setEmail(inputEmail);
			setLoading(false);
			setInputEmail("");
			setInputPassword("");
		} catch (error) {
			setError("Incorrect username or password");
			setLoading(false);
		}
	};

	const logOut = () => {
		setEmail("");
		setIsLoggedIn(false);
	};

	return (
		<div className="max-w-md mx-auto my-20 border border-gray-500 flex flex-col p-6">
			{isLoggedIn ? (
				<>
					<h1 className="text-xl font-bold mb-5">Hello {email}!</h1>
					<button
						onClick={() => logOut()}
						className="bg-blue-500 text-white font-bold py-2">
						Log Out
					</button>
				</>
			) : (
				<form onSubmit={onSubmit} className="flex flex-col">
					<h1 className="text-2xl font-bold text-center mb-5 text-gray-800">
						Log in to Stock Analysis
					</h1>
					{error && (
						<p className="text-red-600 text-center mb-3">{error}</p>
					)}
					<label htmlFor="email">Email Address</label>
					<input
						type="text"
						name="email"
						className="mb-4 p-2 border shadow-sm"
						placeholder="Email"
						value={inputEmail}
						onChange={(e) => setInputEmail(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						className="mb-4 p-2 border shadow-sm"
						placeholder="Password"
						value={inputPassword}
						onChange={(e) => setInputPassword(e.target.value)}
					/>
					<button
						className="bg-blue-500 text-white font-bold py-2"
						type="submit"
						disabled={loading}>
						{loading ? "Logging in..." : "Log In"}
					</button>
				</form>
			)}
		</div>
	);
};

export default LoginForm;
