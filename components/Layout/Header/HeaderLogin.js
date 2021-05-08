import { useContext } from "react";
import DispatchContext from "@/components/Context/DispatchContext";
import StateContext from "@/components/Context/StateContext";
import { useRouter } from "next/router";

export default function HeaderLogin() {
	const state = useContext(StateContext);
	const dispatch = useContext(DispatchContext);
	const router = useRouter();

	return (
		<>
			{state.isLoggedIn ? (
				<button
					onClick={() => dispatch({ type: "logout" })}
					className="w-24 bg-blue-500 py-2 px-3 text-white">
					Log Out
				</button>
			) : (
				<button
					onClick={() => router.push("/login/")}
					className="w-24 bg-blue-500 py-2 px-3 text-white">
					Log In
				</button>
			)}
		</>
	);
}
