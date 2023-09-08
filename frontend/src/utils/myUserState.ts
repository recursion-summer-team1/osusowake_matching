import { atom } from "recoil";

export type MyUser = {
  userId: string;
  userName: string;
  email: string;
  avatarUrl: string;
};

export const myUserState = atom<MyUser | undefined>({
  key: "myUserState",
  default: undefined,
});

export const getLoggedInInfo = (): MyUser | undefined => {
  const storedMyUser = localStorage.getItem("me");
  if (storedMyUser) {
    const storedMyUserObject = JSON.parse(storedMyUser);
    if (
      typeof storedMyUserObject === "object" &&
      "userId" in storedMyUserObject &&
      "userName" in storedMyUserObject &&
      "email" in storedMyUserObject &&
      "avatarUrl" in storedMyUserObject
    ) {
      return {
        userId: storedMyUserObject.userId,
        userName: storedMyUserObject.userName,
        email: storedMyUserObject.email,
        avatarUrl: storedMyUserObject.avatarUrl,
      };
    } else {
      localStorage.removeItem("me");
    }
  }
};
