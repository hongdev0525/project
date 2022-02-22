import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const LoginInput = ({ styles }) => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    "user-id": "",
    "user-password": "",
  });

  const [loginValidation, setLoginValidation] = useState({
    "user-id": false,
    "user-password": false,
  });

  const seValidation = (name, status) => {
    setLoginValidation({
      ...loginValidation,
      [name]: status,
    });
  };

  const handleValidation = (name, value) => {
    switch (name) {
      case "user-id":
        if (value.length === 0) {
          seValidation(name, false);
        } else {
          seValidation(name, true);
        }
        break;
      case "user-password":
        if (value.length === 0) {
          seValidation(name, false);
        } else {
          seValidation(name, true);
        }
        break;
      default:
        break;
    }
  };

  const handleLoginInfo = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
    handleValidation(inputName, inputValue);
  };
  const handleLogin = async () => {
    if (
      loginValidation["user-id"] === false ||
      loginValidation["user-password"] === false
    ) {
      alert("아이디 또는 비밀번호를 입력해주세요.");
    } else {
      await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_SERVER}/logins`,
        data: loginInfo,
        withCredentials: true,
      })
        .then((res) => {
          const error = res.data.error;
          const status = res.data.status;
          if (status === "fail") {
            if (error === "wrong password") {
              alert("비밀번호가 틀렸습니다.");
            } else if (error === "not found") {
              alert("아이디를 올바르게 입력해주세요.");
            } else {
              alert("로그인 에러가 발생했습니다. 고객센터로 문의주세요.");
            }
          } else {
            alert("로그인 되었습니다.");
            window.localStorage.setItem("loggedInState", "loggedIn");
            router.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    console.log(loginInfo);
    console.log("loginValidation", loginValidation);
  }, [loginInfo, loginValidation]);

  return (
    <div className={styles["login-container"]}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <input
          type="text"
          name="user-id"
          id="user-id"
          onChange={(e) => handleLoginInfo(e)}
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <input
          type="password"
          name="user-password"
          id="user-password"
          onChange={(e) => handleLoginInfo(e)}
        />
      </div>
      <div>
        <button type="button" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginInput;
