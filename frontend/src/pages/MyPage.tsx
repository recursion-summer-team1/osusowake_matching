/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useCallback, useEffect, useRef, useState } from "react";

import FooterBar from "../components/FooterBar";
import Header from "../components/Header";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getLoggedInInfo, myUserState } from "../utils/myUserState";
import { serverHostName } from "../utils/serverHostName";
import { FoodItem } from "../utils/foodItem";
import { Link } from "react-router-dom";

type Friendships = {
  mutualFollowers: { userId: number; userName: string; avatarUrl: string }[];
};

const MyPage = () => {
  const [myUser, setMyUser] = useRecoilState(myUserState);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const signInMutation = useMutation(
    (data: { email: string; password: string }) =>
      axios.post(`${serverHostName}/users/login`, data),
  );

  const myFriendshipsQuery = useQuery(["myFriendships", myUser], async () => {
    if (myUser === undefined) return null;
    const response = await axios.get<Friendships>(
      `${serverHostName}/friendships/${myUser.userId}`,
    );
    return response.data;
  });

  useEffect(() => {
    if (signInMutation.isSuccess) {
      const me = {
        // @ts-ignore
        userId: (signInMutation.data.data.userId as number).toString(),
        email: signInMutation.variables!.email,
        // @ts-ignore
        userName: signInMutation.data.data.userName as string,
        // @ts-ignore
        avatarUrl: signInMutation.data.data.avatarUrl as string,
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
    const storedMyUser = getLoggedInInfo();
    if (storedMyUser) {
      setMyUser(storedMyUser);
    }
  }, [setMyUser]);

  const handleSignOut = useCallback(() => {
    setMyUser(undefined);
    localStorage.removeItem("me");
  }, [setMyUser]);

  const [foodData, setFoodData] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // userIdを使用してAPIを呼び出す
        const response = await axios.get(
          `${serverHostName}/foods/self/${myUser?.userId}`,
        );
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching the food data:", error);
      }
    };
    fetchData();
  }, [myUser?.userId]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top */}
      <Header title="My Page" className="z-50" />
      <div className="p-4 flex-grow items-center justify-center overflow-y-auto">
        {myUser ? (
          <>
            <div className="flex items-center p-1">
              <div className="avatar px-4">
                <div className="w-14 rounded-full">
                  <img
                    src={
                      myUser.avatarUrl.startsWith("http")
                        ? myUser.avatarUrl
                        : `http://localhost:3000/images/avatars/${myUser.avatarUrl}`
                    }
                  />
                </div>
              </div>
              <div className="text-xl">{myUser.userName}</div>
            </div>
            {/* <div className="divider" /> */}
            <div className="h-2" />
            {myFriendshipsQuery.isLoading ? undefined : myFriendshipsQuery.data ? (
              <div className="">
                <details className="collapse collapse-arrow border outline-offset-0">
                  <summary className="collapse-title">
                    <div>
                      {myFriendshipsQuery.data.mutualFollowers.length === 1
                        ? `${myFriendshipsQuery.data.mutualFollowers.length} friend`
                        : `${myFriendshipsQuery.data.mutualFollowers.length} friends`}
                    </div>
                  </summary>
                  <div className="collapse-content">
                    <div className="flex flex-col">
                      {myFriendshipsQuery.data.mutualFollowers.map(
                        (friend, i) => (
                          <div className="flex items-center p-1" key={i}>
                            <div className="avatar px-2">
                              <div className="w-8 rounded-full">
                                <img
                                  src={
                                    friend.avatarUrl.startsWith("http")
                                      ? friend.avatarUrl
                                      : `http://localhost:3000/images/avatars/${friend.avatarUrl}`
                                  }
                                />
                              </div>
                            </div>
                            {friend.userName}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </details>
              </div>
            ) : undefined}
            {/* Scrollable Food Items Grid */}
            <div className="flex-grow overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 p-4">
                {foodData.map((item) => (
                  <div
                    key={item.foodId}
                    className="relative bg-white p-4 rounded-xl shadow-md"
                  >
                    <Link to={`/food-details/${item.foodId}`}>
                      {/* <div> */}
                      <img
                        src={
                          item.foodImageUrl.startsWith("http")
                            ? item.foodImageUrl
                            : `${serverHostName}/images/foods/${item.foodImageUrl}`
                        }
                        alt={item.userName}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <span className="absolute bottom-1 left-1 bg-white bg-opacity-60 text-sm rounded">
                        <div className="flex items-center m-1">
                          <div className="avatar px-1">
                            <div className="w-5 rounded-full">
                              <img
                                src={
                                  item.avatarUrl.startsWith("http")
                                    ? item.avatarUrl
                                    : `http://localhost:3000/images/avatars/${item.avatarUrl}`
                                }
                              />
                            </div>
                          </div>
                          {/* {item.userName} */}
                        </div>
                      </span>
                      {/* </div> */}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="divider" />
            <div className="justify-center flex">
              <button
                className="btn btn-sm btn-error text-center"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
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
            <button className="btn btn-success" type="submit">
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
