// This file holds the initial state, reducer function and provides a wrapper for the entire app that is used in _app.js
import DispatchContext from "@/components/Context/DispatchContext";
import StateContext from "@/components/Context/StateContext";
import { useImmerReducer } from "use-immer";

const initialState = {
	email: "",
	password: "",
	isLoading: false,
	error: "",
	isLoggedIn: false,
};

function Reducer(draft, action) {
	switch (action.type) {
		case "field":
			draft[action.field] = action.value;
			return;

		case "login":
			draft.isLoading = true;
			draft.error = "";
			return;

		case "success":
			draft.isLoggedIn = true;
			draft.isLoading = false;
			return;

		case "error":
			draft.error = "Incorrect username or password!";
			draft.isLoading = false;
			draft.email = "";
			draft.password = "";
			return;

		case "logout":
			draft.isLoggedIn = false;
			draft.email = "";
			draft.password = "";
			return;

		default:
			return;
	}
}

const ContextWrapper = ({ children }) => {
	const [state, dispatch] = useImmerReducer(Reducer, initialState);

	return (
		<DispatchContext.Provider value={dispatch}>
			<StateContext.Provider value={state}>{children}</StateContext.Provider>
		</DispatchContext.Provider>
	);
};

export default ContextWrapper;
