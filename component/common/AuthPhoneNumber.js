import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthNumber,
  checkAuth,
  expireAuth,
} from "../../modules/common/login";
import { getInquiryId } from "../../modules/common/userInquiry/idInquiry";
import { setInitialState } from "../../modules/common/timer";
import styles from "/styles/common/authPhoneNumber.module.scss";
import Timer from "./Timer";
const AuthPhoneNumber = ({ authObj, authType }) => {
  const dispatch = useDispatch();
  const [authNumber, setAuthNumber] = useState("");
  const [userInfo, setUserInfo] = useState({
    "user-name": {
      value: "",
      validation: false,
    },
    "user-phone": {
      value: "",
      validation: false,
    },
  });
  const timetObj = useSelector((state) => {
    return state.Timer;
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

  const handleUserInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({
      ...userInfo,
      [name]: {
        ...userInfo[name],
        value: value,
        validation: value.length === 0 ? false : true,
      },
    });
  };

  const checkAuthNumber = (e) => {
    setAuthNumber(e.target.value);
  };
  const checkAuthDone = () => {
    if (authObj.authNumber === parseInt(authNumber)) {
      dispatch(checkAuth());
      dispatch(
        getInquiryId(
          userInfo["user-name"].value,
          userInfo["user-phone"].value,
          authObj.inquiryToken
        )
      );
      dispatch(setInitialState(0, 10));
    } else {
      alert("인증번호가 틀렸습니다.");
    }
  };

  useEffect(() => {
    if (timetObj.seconds === 0 && timetObj.minutes === 0) {
      dispatch(expireAuth());
    }
  }, [timetObj]);

  /*JSX*/
  return (
    <div className={styles["authPhone-wrapper"]}>
      <div className={styles["authPhone-container"]}>
        <div className={styles["user-name"]}>
          <label htmlFor="user-name">이름</label>
          <div className={styles["input-name"]}>
            <input
              type="text"
              name="user-name"
              id="user-id"
              onChange={(e) => handleUserInfo(e)}
            />
          </div>
        </div>
        <div className={styles["user-phone"]}>
          <label htmlFor="user-phone">핸드폰 번호</label>
          <div className={styles["input-phone"]}>
            <input
              type="text"
              name="user-phone"
              id="user-phone"
              onChange={(e) => {
                handleUserInfo(e);
              }}
            />
            <button type="button" onClick={() => authPhoneNumber()}>
              인증번호받기
            </button>
          </div>
        </div>
        {authObj.inAuth == true && authObj.authDone == false && (
          <div className={styles["auth-number"]}>
            <label htmlFor="auth-number">인증번호</label>
            <div className={styles["input-auth"]}>
              <input
                type="number"
                name="auth-number"
                id="auth-number"
                onChange={(e) => checkAuthNumber(e)}
              />
              <Timer mm={1} ss={30} />
              <button type="button" onClick={checkAuthDone}>
                인증하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPhoneNumber;
