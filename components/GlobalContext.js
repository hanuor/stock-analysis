import { useState, createContext } from "react";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
	const [loggedIn, setLoggedIn] = useState(false);

	const login = value => {
		setLoggedIn(true);
	}

	const logout = value => {
		setLoggedIn(false);
	}

	const contextValue = {
		status: {
			loggedIn,
			login,
			logout
		}
	};

	return (
		<GlobalContext.Provider value={contextValue}>
			{ children}
		</GlobalContext.Provider>
	);

};

export default GlobalContext;