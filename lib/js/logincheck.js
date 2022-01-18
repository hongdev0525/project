import Router from "next/router";

export const loginCheck = () => {
  const loggInState = localStorage.getItem("loggedInState");
  if (loggInState !== "loggedIn") {
    Router.push("/common/login");
  }
};
