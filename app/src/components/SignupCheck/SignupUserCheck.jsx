import { api } from "../../common/api";

export async function alreadyUsedUsername(username) {
    try {
        await api.head(`/username${username}`, {});
        return false;
    }
    catch (e) {
        return true;
    }
}

export async function alreadyUsedMail(mail) {
    try {
        await api.head(`/email/${mail}`, {});
        return false;
    }
    catch (e) {
        return true;
    }
}
