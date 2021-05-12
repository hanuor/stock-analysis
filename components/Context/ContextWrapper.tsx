// This file holds the initial state, reducer function and provides a wrapper for the entire app that is used in _app.js
import DispatchContext from "@/components/Context/DispatchContext";
import StateContext from "@/components/Context/StateContext";
import React from "react";
import { useImmerReducer } from "use-immer";

const initialState: LoginState = {
	email: "",
	password: "",
	isLoading: false,
	error: "",
	isLoggedIn: false,
	variant: "login",
};

interface LoginState {
	[index: string]: string | boolean;
	email: string;
	password: string;
	isLoading: boolean;
	error: string;
	isLoggedIn: boolean;
	variant: "login" | "forgetPassword";
}

type LoginAction =
	| { type: "login" | "success" | "error" | "logout" }
	| { type: "field"; field: string; value: string };

function Reducer(draft: LoginState, action: LoginAction) {
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

interface IProps {
	children: React.ReactNode;
}

const ContextWrapper: React.FC<IProps> = ({ children }) => {
	const [state, dispatch] = useImmerReducer(Reducer, initialState);

	return (
		<DispatchContext.Provider value={dispatch}>
			<StateContext.Provider value={state}>{children}</StateContext.Provider>
		</DispatchContext.Provider>
	);
};

export default ContextWrapper;
