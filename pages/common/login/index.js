import { Fragment, useEffect, useState } from "react";
import Router from "next/router";
import LoginInput from "../../../component/common/LoginInput";
import styles from "/styles/common/login.module.scss";
import { kakoLogin } from "/API/common/login";
import Link from "next/link";
const Login = () => {
  const [loginState, setLoginState] = useState(false);
  const handleLogin = e => {
    e.preventDefault();
    kakoLogin();
  };
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.Kakao !== "undefined") {
      if (!Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAKO_JS_KEY);
      }
    }
    if (window.localStorage.getItem("loggedInState") === "loggedIn") {
      alert("회원님은 로그인 중입니다.");
      setLoginState(true);
      Router.push("/");
    }
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className={styles["login-wrapper"]}>
      {loginState === false &&
        <Fragment>
          <h1>로그인페이지</h1>
          <div>
            <LoginInput styles={styles} />
            <Link href="/common/userInquiry">아이디/비밀번호 찾기</Link>
          </div>
          <div onClick={e => handleLogin(e)}>
            <img
              src="https://k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
              width="242"
            />
          </div>
        </Fragment>}
      <script src="https://developers.kakao.com/sdk/js/kakao.js" defer />
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {} // will be passed to the page component as props
  };
}

export default Login;
