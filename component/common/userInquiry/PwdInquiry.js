import AuthPhoneNumber from "../AuthPhoneNumber";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { idExistCheck, setNewPassword } from "/modules/common/userInquiry";
import Router from "next/router";
import Timer from "../Timer";

const PwdInquiry = () => {
  const dispatch = useDispatch();
  const authObj = useSelector(state => {
    return state.Logins;
  });
  const userInquiry = useSelector(state => {
    return state.PwdInquiry;
  });
  const [passwordCheck, setPasswordCheck] = useState({
    pwdSame: "",
    pwdValidation: ""
  });
  const [pwdStep, setPwdStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    "user-name": "",
    "user-id": "",
    "user-password": ""
  });
  const handleInput = e => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    if (inputName === "user-password") {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
      if (
        inputValue.length < 8 ||
        inputValue.length >= 20 ||
        passwordRegex.test(inputValue) === false
      ) {
        setPasswordCheck({
          ...passwordCheck,
          pwdValidation: false
        });
      } else {
        setPasswordCheck({
          ...passwordCheck,
          pwdValidation: true
        });
        setUserInfo({
          ...userInfo,
          [e.target.name]: e.target.value
        });
      }
    } else {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value
      });
    }
  };

  const handlePasswordConfirm = e => {
    if (userInfo["user-password"] === e.target.value) {
      setPasswordCheck({
        ...passwordCheck,
        pwdSame: true
      });
    } else {
      setPasswordCheck({
        ...passwordCheck,
        pwdSame: false
      });
    }
  };
  const checkId = () => {
    dispatch(idExistCheck(userInfo["user-id"]));
  };
  const setPassword = () => {
    if (passwordCheck === false) {
      alert("비밀번호를 정확히 입력해주세요.");
    } else {
      dispatch(setNewPassword(userInfo["user-id"], userInfo["user-password"]));
    }
  };

  useEffect(
    () => {
      console.log(userInfo);

      if (userInquiry.isExist === true) {
        setPwdStep(1);
      }
      if (authObj.authDone === true) {
        setPwdStep(2);
      }
      if (userInquiry.pwdDuplicate === true) {
        alert("기존 비밀번호와 동일합니다.");
      }
      if (userInquiry.setDone === true && userInquiry.pwdDuplicate === false) {
        alert("비밀번호가 변경되었습니다.");
        Router.push("/common/login");
      }
    },
    [authObj, userInquiry, userInfo]
  );

  return (
    <div className="pwdInquiry-container">
      <h1>비밀번호 찾기</h1>
      {pwdStep === 0 &&
        <div className="id-check">
          <div className="input-id">
            <label htmlFor="user-id">아이디 입력</label>
            <input type="text" name="user-id" onChange={e => handleInput(e)} />
          </div>
          {userInquiry.isExist === false && <p>아이디가 존재하지 않습니다.</p>}
          <button onClick={checkId}>다음</button>
        </div>}
      {pwdStep === 1 &&
        <div>
          <AuthPhoneNumber authObj={authObj} authType={"pwd"} />
        </div>}
      {pwdStep === 2 &&
        authObj.authDone === true &&
        <div className="password-modify">
          <h2>
            아이디: <span>{authObj.id}</span>
          </h2>
          <div className="set-password">
            <h3>새 비밀번호 입력</h3>
            <input
              type="password"
              name="user-password"
              id="user-password"
              onChange={e => handleInput(e)}
            />
            {passwordCheck["pwdValidation"] === false &&
              <p>영문, 숫자, 특수문자 조합 8~20자리를 입력해주세요.</p>}
            <input
              type="password"
              name="password-confirm"
              id="password-confirm"
              onChange={e => handlePasswordConfirm(e)}
            />
            {/* {userInquiry.pwdDuplicate === true && <p>기존 암호와 동일합니다.</p>} */}
            {passwordCheck["pwdSame"] === false && <p>비밀번호가 일치하지않습니다.</p>}
          </div>
          <button onClick={() => setPassword()}>비밀번호 변경하기</button>
        </div>}
    </div>
  );
};

export default PwdInquiry;
