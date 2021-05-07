import { useContext } from "react"
import GlobalContext from "@/components/GlobalContext";

export default function HeaderLogin() {

	const { status } = useContext(GlobalContext);

	return (
		<>
			{
				status.loggedIn
					? <button onClick={status.logout} className="w-24 bg-blue-500 py-2 px-3 text-white">Log Out</button>
					: <button onClick={status.login} className="w-24 bg-blue-500 py-2 px-3 text-white">Log In</button>
			}
		</>
	)
}