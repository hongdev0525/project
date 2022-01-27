import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthNumber, checkAuth } from "../../modules/common/login";
const AuthPhoneNumber = () => {
  ///variable
  const dispatch = useDispatch();
  const [authNumber, setAuthNumber] = useState("");
  const [userInfo, setUserInfo] = useState({
    "user-name": {
      value: "",
      validation: false
    },
    "user-phone": {
      value: "",
      validation: false
    }
  });

  const authObj = useSelector(state => {
    return state.Logins;
  });

  //function
  const authPhoneNumber = () => {
    if (
      userInfo["user-name"].validation === true &&
      userInfo["user-phone"].validation === true
    ) {
      dispatch(
        getAuthNumber(userInfo["user-name"].value, userInfo["user-phone"].value)
      );
    } else {
      alert("이름과 전화번호를 입력해주세요.");
    }
  };

  const handleUserInfo = e => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({
      ...userInfo,
      [name]: {
        ...userInfo[name],
        value: value,
        validation: value.length === 0 ? false : true
      }
    });
  };

  const checkAuthNumber = e => {
    setAuthNumber(e.target.value);
  };
  const checkAuthDone = () => {
    if (authObj.authNumber === parseInt(authNumber)) {
      dispatch(checkAuth());
    } else {
      alert("인증번호가 틀렸습니다.");
    }
  };

  useEffect(
    () => {
      console.log(userInfo);
    },
    [userInfo]
  );

  /*JSX*/
  return (
    <div>
      <div>
        <label htmlFor="user-name">이름</label>
        <input
          type="text"
          name="user-name"
          id="user-id"
          onChange={e => handleUserInfo(e)}
        />
      </div>
      <div>
        <label htmlFor="user-phone">핸드폰 번호</label>
        <div>
          <input
            type="text"
            name="user-phone"
            id="user-phone"
            onChange={e => {
              handleUserInfo(e);
            }}
          />
          <button type="button" onClick={() => authPhoneNumber()}>
            인증번호받기
          </button>
        </div>
      </div>
      <div>
        {authObj.inAuth == true &&
          authObj.authDone == false &&
          <div>
            <label htmlFor="auth-number">인증번호</label>
            <input
              type="number"
              name="auth-number"
              id="auth-number"
              onChange={e => checkAuthNumber(e)}
            />
            <button type="button" onClick={checkAuthDone}>
              인증하기
            </button>
          </div>}
        {authObj.inAuth == false &&
          authObj.authDone === true &&
          <span>인증완료</span>}
      </div>
    </div>
  );
};

export default AuthPhoneNumber;
