import { useContext } from "react";
import StateContext from "@/components/Context/StateContext";
import DispatchContext from "@/components/Context/DispatchContext";

async function login({ email, password }) {
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
	const state = useContext(StateContext);
	const dispatch = useContext(DispatchContext);

	const { email, password, isLoading, error, isLoggedIn } = state;

	const onSubmit = async (e) => {
		e.preventDefault();

		dispatch({ type: "login" });

		try {
			await login({ email, password });
			dispatch({ type: "success" });
		} catch (error) {
			dispatch({ type: "error" });
		}
	};

	return (
		<div className="max-w-md mx-auto my-20 border border-gray-500 flex flex-col p-6">
			{isLoggedIn ? (
				<>
					<h1 className="text-xl font-bold mb-5">Hello {email}!</h1>
					<button
						onClick={() => dispatch({ type: "logout" })}
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
						value={email}
						onChange={(e) =>
							dispatch({
								type: "field",
								field: "email",
								value: e.currentTarget.value,
							})
						}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						className="mb-4 p-2 border shadow-sm"
						placeholder="Password"
						value={password}
						onChange={(e) =>
							dispatch({
								type: "field",
								field: "password",
								value: e.currentTarget.value,
							})
						}
					/>
					<button
						className="bg-blue-500 text-white font-bold py-2"
						type="submit"
						disabled={isLoading}>
						{isLoading ? "Logging in..." : "Log In"}
					</button>
				</form>
			)}
		</div>
	);
};

export default LoginForm;
