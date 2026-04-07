import { api } from "./api";

export const checkAuthConnected = async () => {
	const res = await api.get("/auth/connected");
	return res.data.connected
};