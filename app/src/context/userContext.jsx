import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [authUser, setUser] = useState({});

	const saveUser = (user) => {
		setUser(user);
	};

	const deleteUser = () => {
		setUser(null);
	};

	const getUser = () => {
		return authUser;
	};

	return (
		<AuthContext.Provider
			value={{ authUser, saveUser, deleteUser, getUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
