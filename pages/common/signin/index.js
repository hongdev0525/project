import { useEffect, useState } from "react";
import axios from "axios";
import styles from "/styles/cueat/signin.module.scss";
const index = () => {
  const [isIdDuplicate, setIsIdDuplicate] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState("");
  const [authInput, setAuthInput] = useState("");
  const [authNumber, setAuthNumber] = useState({
    authrizing: false,
    number: "",
    authDone: false
  });
  const [userInfo, setUserInfo] = useState({
    "user-id": "",
    "user-password": "",
    "user-name": "",
    "user-email": "",
    "user-phone": "",
    "user-mainAddress": "",
    "user-subAddress": "",
    "user-birthDay": "",
    "user-gender": "",
    usageAgreement: ""
  });

  const checkId = async () => {
    await axios({
      url: "http://localhost:3000/signin/id",
      method: "get",
      params: {
        userId: userInfo["user-id"]
      }
    })
      .then(res => {
        if (res.data.status === "success") {
          setIsIdDuplicate(false);
          alert("사용할 수 있는 아이디입니다.");
        } else if (res.data.status === "fail") {
          setIsIdDuplicate(true);
          alert("아이디가 중복됩니다.");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const passwordCheck = e => {
    if (e.target.value !== userInfo["user-password"]) {
      setIsPasswordSame(false);
    } else {
      setIsPasswordSame(true);
    }
  };

  const onChnageInput = e => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  //Deal the handleKeypress Enter
  const handleKeypress = e => {
    switch (e.key) {
      case "Enter":
        checkId();
        break;
      default:
        break;
    }
  };

  const authPhoneNumber = async () => {
    const userPhone = userInfo["user-phone"];
    const userName = userInfo["user-name"];
    if (userName.length !== 0 && userPhone.length !== 0) {
      await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_SERVICE_URL + "/signin/phone",
        params: {
          userPhone: userPhone,
          userName: userName
        }
      })
        .then(res => {
          setAuthNumber({
            ...authNumber,
            authrizing: true,
            number: res.data.authNumber
          });
          console.log("res", res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert("성함과 전화번호를 입력해주세요.");
    }
  };

  const authCheck = () => {
    if(parseInt(authInput) !==authNumber.number){
      alert("인증번호를 올바르게 입력해주세요.");
    }else{
      setAuthNumber({
        ...authNumber,
        authrizing: false,
        number: "",
        authDone: true
      });
    }
  };

  useEffect(
    () => {
      console.log("userInfo", userInfo);
      console.log("authNumber", authNumber);
      return () => {};
    },
    [userInfo, authNumber]
  );

  return (
    <div className={styles["signin-wrapper"]}>
      <div className={styles["signin-container"]}>
        <div className={styles["sigin-id"]}>
          <label htmlFor="user-id">아이디</label>
          <div>
            <input
              type="text"
              name="user-id"
              id="user-id"
              maxLength={10}
              defaultValue={userInfo.id}
              onChange={onChnageInput}
              onKeyDown={e => handleKeypress(e)}
            />
            <button type="button" onClick={e => checkId(e)} id="user-id-btn">
              중복확인
            </button>
          </div>
          {isIdDuplicate === true && <p>아이디 중복체크를 해주세요.</p>}
        </div>
        <div className={styles["sigin-password"]}>
          <label htmlFor="user-password">비밀번호</label>
          <input
            type="password"
            name="user-password"
            id="user-password"
            onChange={onChnageInput}
          />
        </div>
        <div className={styles["sigin-passwordCheck"]}>
          <label htmlFor="user-passwordCheck">비밀번호 확인</label>
          <input
            type="password"
            name="user-passwordCheck"
            id="user-passwordCheck"
            onChange={e => passwordCheck(e)}
          />
          {isPasswordSame === false && <p>비밀번호가 일치하지 않습니다.</p>}
        </div>
        <div className={styles["sigin-name"]}>
          <label htmlFor="user-name">이름</label>
          <input
            type="text"
            name="user-name"
            id="user-name"
            onChange={e => onChnageInput(e)}
          />
        </div>
        <div className={styles["sigin-email"]}>
          <label htmlFor="user-email">이메일</label>
          <input
            type="text"
            name="user-email"
            id="user-email"
            onChange={e => onChnageInput(e)}
          />
        </div>
        <div className={styles["sigin-phone"]}>
          <label htmlFor="user-phone">전화번호</label>
          <div>
            <input
              type="text"
              name="user-phone"
              id="user-phone"
              onChange={e => onChnageInput(e)}
            />
                 {authNumber.authDone===false? 
                  <button type="button" onClick={authPhoneNumber}>
                  {authNumber.authrizing === false ? "인증번호 받기": "인증번호 재전송"
                  }  </button>
                  :<p>인증완료</p>
                }
          </div>
          <div>
            {authNumber.authrizing === true &&
              (authNumber.authDone == false &&
                <>
                <input
                  type="text"
                  name="auth-number"
                  id="auth-number"
                  defaultValue={authInput}
                  onChange={e => setAuthInput(e.target.value)}
                  
                />
                <button type="button" onClick={authCheck}>
                  인증하기
                </button>
                </>
                )}
          </div>
        </div>
        <div className={styles["sigin-mainAddress"]}>
          <label htmlFor="user-mainAddress">주소</label>
          <div>
            <input
              type="text"
              name="user-mainAddress"
              id="user-mainAddress"
              onChange={e => onChnageInput(e)}
            />
            <button type="button">주소 찾기</button>
          </div>
        </div>
        <div className={styles["sigin-subAddress"]}>
          <label htmlFor="user-subAddress">상세주소주소</label>
          <input
            type="text"
            name="user-subAddress"
            id="user-subAddress"
            onChange={e => onChnageInput(e)}
          />
        </div>
        <div className={styles["sigin-birthDay"]}>
          <label htmlFor="user-birthDay">생년월일</label>
          <input
            type="text"
            name="user-birthDay"
            id="user-birthDay"
            onChange={e => onChnageInput(e)}
          />
        </div>
        <div className={styles["sigin-gender"]}>
          <label htmlFor="user-gender">성별</label>
          <div>
            <div>
              <input
                type="checkbox"
                name="user-gender"
                id="user-gender"
                onChange={e => onChnageInput(e)}
              />
              <p>남성</p>
            </div>
            <div>
              <input type="checkbox" name="user-gender" id="user-gender" />
              <p>여성</p>
            </div>
          </div>
        </div>
        <div className={styles["usage-agreement"]}>
          <h2>이용약관동의</h2>
        </div>
      </div>
    </div>
  );
};

export default index;
