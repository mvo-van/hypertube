import { api } from "../../common/api";

export async function alreadyUsedUsername(username) {
    try {
        const response = await api.get(`/users/username/${username}/exists`);
        
        return response.data.exists;
    }
    catch (e) {
        return true;
    }
}

export async function alreadyUsedMail(mail) {
    try {
        const response = await api.get(`/users/email/${mail}/exists`);
        
        return response.data.exists;
    }
    catch (e) {
        return true;
    }
}
