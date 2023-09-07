import { atom } from "recoil";

export type MyUser = { userId: string; userName: string; email: string };

export const myUserState = atom<MyUser | undefined>({
  key: "myUserState",
  default: undefined,
});
