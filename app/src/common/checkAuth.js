import { api } from "./api";


/**
 * Create an axios instance with the api base URL
 */
export const checkAuthConnected = async () => {
	const res = await api.get("/auth/connected");
	return res.data.connected
};