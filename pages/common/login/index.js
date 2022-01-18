import { useEffect } from "react";
import axios from "axios";
import Router from "next/router";

const index = () => {
  const handleLogin = e => {
    e.preventDefault();
    Kakao.Auth.login({
      success: authObj => {
        Kakao.API.request({
          url: "/v2/user/me",
          success: async res => {
            console.log(res);
            const response = await axios({
              url: "http://localhost:3000/login/check",
              method: "POST",
              data: {
                ...res,
                login_type: "kakao",
                access_token: authObj.access_token
              },
              withCredentials: true
            });
            const status = response.data.status;
            console.log(response);
            if (status === "success") {
              //쿠키에 access token과 refresh toekn을 저장.
              window.localStorage.setItem("loggedInState", "loggedIn");
              Router.push("/");
            } else if (status === "signIn") {
              alert("회원가입 후 로그인이 가능합니다.");
              window.location.href = "/common/signin";
            } else if (status === "logIn") {
              window.location.href = "/common/logIn";
            }
          },
          fail: error => {
            console.log(error);
          }
        });
      },
      fail: () => {}
    });
  };
  useEffect(() => {
    console.log("layout loading");
    if (typeof window !== "undefined" && typeof window.Kakao !== "undefined") {
      console.log("init");
      if (!Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAKO_JS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <h1>로그인페이지</h1>
      <div onClick={e => handleLogin(e)}>
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="242"
        />
      </div>
      <script src="https://developers.kakao.com/sdk/js/kakao.js" defer />
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {} // will be passed to the page component as props
  };
}

export default index;
