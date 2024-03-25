import { atom } from "recoil";

interface UserInfo {
    uid: string;
    email: string | null;
}

export const userState = atom<UserInfo | null>({
    key: "userState",
    default: null,
});
