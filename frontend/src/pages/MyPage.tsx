/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useRef } from "react";

import FooterBar from "../components/FooterBar";
import Header from "../components/Header";
import { atom, useRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type MyUser = { userId: string; userName: string; email: string };

const myUserState = atom<MyUser | undefined>({
  key: "myUserState",
  default: undefined,
});

const MyPage = () => {
  const [myUser, setMyUser] = useRecoilState(myUserState);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const signInMutation = useMutation(
    (data: { email: string; password: string }) =>
      axios.post("http://localhost:3000/users/login", data),
  );

  useEffect(() => {
    if (signInMutation.isSuccess) {
      const me = {
        // @ts-ignore
        userId: (signInMutation.data.data.userId as number).toString(),
        email: signInMutation.variables!.email,
        // @ts-ignore
        userName: signInMutation.data.data.userName as string,
      };
      setMyUser(me);
      localStorage.setItem("me", JSON.stringify(me));
    }
  }, [
    signInMutation.isSuccess,
    signInMutation.data,
    signInMutation.variables,
    setMyUser,
  ]);

  const handleSignInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInMutation.mutate({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    });
  };

  useEffect(() => {
    const storedMyUser = localStorage.getItem("me");
    if (storedMyUser) {
      const storedMyUserObject = JSON.parse(storedMyUser);
      if (
        typeof storedMyUserObject === "object" &&
        "userId" in storedMyUserObject &&
        "userName" in storedMyUserObject &&
        "email" in storedMyUserObject
      ) {
        setMyUser({
          userId: storedMyUserObject.userId,
          userName: storedMyUserObject.userName,
          email: storedMyUserObject.email,
        });
      } else {
        localStorage.removeItem("me");
      }
    }
  }, [setMyUser]);

  const handleSignOut = useCallback(() => {
    setMyUser(undefined);
    localStorage.removeItem("me");
  }, [setMyUser]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top */}
      <Header title="My Page" className="z-50" />
      <div className="p-4 flex-grow items-center justify-center overflow-y-auto">
        {myUser ? (
          <>
            <div>{myUser.userName}</div>
            <button className="btn items-center" onClick={handleSignOut}>
              Sign out
            </button>
          </>
        ) : (
          <form
            onSubmit={handleSignInSubmit}
            className="w-full text-center"
            style={{ maxWidth: "100%", textAlign: "center" }}
          >
            <div className="mb-3">
              <label htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                required
                type="text"
                // placeholder=""
                id="email"
                ref={emailRef}
                className="input input-bordered input-sm text-center w-full"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <div className="label-text">Password</div>
              </label>
              <input
                required
                type="password"
                id="password"
                ref={passwordRef}
                className="input input-bordered input-sm text-center w-full"
              />
            </div>
            <button className="btn btn-info " type="submit">
              Sign in
            </button>
          </form>
        )}
      </div>

      {/* Footer */}
      <FooterBar />
    </div>
  );
};

export default MyPage;
