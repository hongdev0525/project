import Router from "next/router";

export const loginCheck = () => {
  const loggInState = localStorage.getItem("loggedInState");
  //로그인이 필요없는 페이지 리스트를 객체화 하여 예외처리해줘야함.

  const notNeededLoginList = [
    "/common/signin",
    "/common/userInquiry",
    "/common/payment"
  ];

  if (!notNeededLoginList.includes(Router.pathname)) {
    if (!loggInState) {
      Router.push("/common/login");
    }
  }
};
