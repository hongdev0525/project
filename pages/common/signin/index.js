import { useEffect, useState } from "react";
import axios from "axios";
import styles from "/styles/cueat/signin.module.scss";
import DaumPost from "/component/common/DaumPostCode";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const [isIdDuplicate, setIsIdDuplicate] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState("");
  const [authInput, setAuthInput] = useState("");
  const [addressModal, setAddressModal] = useState(false);
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
    "user-gender": ""
    // usageAgreement: ""
  });

  const [formValidationState, setFormValidtaionState] = useState({
    usageAgreement: "",
    "user-birthDay": "",
    "user-email": "",
    "user-gender": "",
    "user-id": "",
    "user-mainAddress": "",
    "user-name": "",
    "user-password": "",
    "user-phone": "",
    "user-subAddress": ""
  });

  const checkId = async () => {
    await axios({
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/signin/id`,
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
    formValidation(e.target.name, e.target.value);
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
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_SERVER}/signin/phone`,
        data: {
          userPhone: userPhone,
          userName: userName
        }
      })
        .then(res => {
          const status = res.data.status;
          const error = res.data.error;
          if (status === "fail" && error === "already exist") {
            alert("이미 가입된 번호입니다. 번호로 가입한 적이 없으시면 고객센터로 문의주세요.");
          } else if (status === "fail" && error === "query error") {
            alert("인증번호 발송에 실패 했습니다. 고객센터로 문의주세요.");
          } else {
            setAuthNumber({
              ...authNumber,
              authrizing: true,
              number: res.data.authNumber
            });
            setFormValidtaionState({
              ...formValidationState,
              ["user-phone"]: true
            });
            console.log("res", res.data);
          }
        })
        .catch(err => {
          setFormValidtaionState({
            ...formValidationState,
            ["user-phone"]: false
          });
          console.log(err);
        });
    } else {
      alert("성함과 전화번호를 입력해주세요.");
    }
  };

  const authCheck = () => {
    if (parseInt(authInput) !== authNumber.number) {
      alert("인증번호를 올바르게 입력해주세요.");
    } else {
      setAuthNumber({
        ...authNumber,
        authrizing: false,
        number: "",
        authDone: true
      });
    }
  };

  const searchAddress = () => {
    setAddressModal(true);
  };

  useEffect(
    () => {
      console.log("userInfo", userInfo);
      console.log("formValidation", formValidationState);
      return () => {};
    },
    [userInfo, formValidationState]
  );
  const setValidation = (name, boolen) => {
    setFormValidtaionState({
      ...formValidationState,
      [name]: boolen
    });
  };

  const formValidation = (name, value) => {
    const len = value.length;
    console.log("name : ", name, " value : ", value);

    switch (name) {
      case "user-id":
        const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if (!koreanRegex.test(value)) {
          if (len > 6 && len < 13) {
            setValidation(name, true);
          } else {
            setValidation(name, false);
          }
        } else {
          setValidation(name, false);
        }
        break;

      case "user-password":
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
        if (passwordRegex.test(value)) {
          if (len < 8 || len > 20) {
            setValidation(name, false);
          } else {
            setValidation(name, true);
          }
        } else {
          setValidation(name, false);
        }
        break;
      case "user-name":
        if (len !== 0) {
          setValidation(name, true);
        } else {
          setValidation(name, false);
        }
        break;
      case "user-email":
        const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (emailRegex.test(value)) {
          setValidation(name, true);
        } else {
          setValidation(name, false);
        }
        break;
      case "user-subAddress":
        if (len !== 0) {
          setValidation(name, true);
        } else {
          setValidation(name, false);
        }
        break;
      case "user-birthDay":
        const year = value.substr(0, 4);
        const month = value.substr(4, 2);
        const day = value.substr(6, 2);
        if (len === 8) {
          if (
            parseInt(month) < 0 ||
            parseInt(month) > 12 ||
            parseInt(day) <= 0 ||
            day > 31
          ) {
            setValidation(name, false);
          } else {
            setValidation(name, true);
          }
        } else {
          setValidation(name, false);
        }
        break;
      case "user-mainAddress":
        if (len !== 0) {
          setValidation(name, true);
        } else {
          setValidation(name, false);
        }
        break;
      case "user-gender":
        if (len !== 0) {
          setValidation(name, true);
        } else {
          setValidation(name, false);
        }
        break;
      case "user-phone":
        break;
      case "usageAgreement":
        break;
      default:
        break;
    }
  };
  useEffect(
    () => {
      console.log(formValidationState);
    },
    [formValidationState]
  );

  const submitFormData = async () => {
    console.log(typeof formValidationState);
    const formDataObj = {};
    const validationObj = {};
    const validation = true;
    Object.keys(formValidationState).forEach((key, index) => {
      if (key === "user-birthDay" || key === "user-gender") {
        validation = true;
        validationObj[key] = validation;
      } else if (key === "user-id" && isIdDuplicate === true) {
        console.log("isIdDuplicate", isIdDuplicate);
        validation = false;
        validationObj[key] = validation;
      } else if (key === "user-phone" && authNumber.authDone === false) {
        console.log("authDone", authNumber.authDone);
        validation = false;
        validationObj[key] = validation;
      } else if (formValidationState[key] !== true) {
        validation = false;
        validationObj[key] = validation;
      } else {
        validation = true;
        validationObj[key] = validation;
      }
      console.log(key, " validation", validation);
    });
    setFormValidtaionState(validationObj);
    Object.keys(userInfo).forEach((key, index) => {
      console.log(index, key, userInfo[key]);
      formDataObj[key] = userInfo[key];
    });
    console.log("formValidationState", formValidationState);
    console.log("userInfo", userInfo);
    if (validation === false) {
      return false;
    } else {
      await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_SERVER}/signin/create`,
        data: userInfo
      })
        .then(res => {
          console.log(res);
          if (res.data.status === "success") {
            alert("회원가입이 성공적으로 됐습니다! 반가워요!");
            router.push("/");
          } else {
            alert("회원가입에 실패했습니다. 잠시후 다시 시도해주세요.");
          }
        })
        .catch(err => {
          console.log(err);
          alert("회원가입에 실패했습니다. 잠시후 다시 시도해주세요.");
        });
    }
  };
  return (
    <div className={styles["signin-wrapper"]}>
      <div className={styles["signin-container"]}>
        <div className={styles["sigin-id"]}>
          <label htmlFor="user-id">
            아이디<span>*</span>
          </label>
          <div>
            <input
              type="text"
              name="user-id"
              id="user-id"
              maxLength={12}
              defaultValue={userInfo.id}
              onChange={onChnageInput}
              onKeyDown={e => handleKeypress(e)}
              placeholder="영문,숫자 8~12자 조합"
            />
            <button type="button" onClick={e => checkId(e)} id="user-id-btn">
              중복확인
            </button>
          </div>
          {isIdDuplicate === true &&
            <p className={styles["validation-warning"]}>아이디 중복체크를 해주세요.</p>}
          {formValidationState["user-id"] === false &&
            <p className={styles["validation-warning"]}>
              아이디는 영문,숫자 8~12자 조합만 가능합니다.
            </p>}
        </div>
        <div className={styles["sigin-password"]}>
          <label htmlFor="user-password">
            비밀번호<span>*</span>
          </label>
          <input
            type="password"
            name="user-password"
            id="user-password"
            placeholder="영문, 숫자, 특수문자 조합 8~20자리"
            onChange={onChnageInput}
          />
          {formValidationState["user-password"] === false &&
            <p className={styles["validation-warning"]}>
              영문, 숫자, 특수문자 조합 8~20자리를 입력해주세요.
            </p>}
        </div>
        <div className={styles["sigin-passwordCheck"]}>
          <label htmlFor="user-passwordCheck">
            비밀번호 확인<span>*</span>
          </label>
          <input
            type="password"
            name="user-passwordCheck"
            id="user-passwordCheck"
            onChange={e => passwordCheck(e)}
            placeholder="비밀번호 확인"
          />
          {isPasswordSame === false &&
            <p className={styles["validation-warning"]}>비밀번호가 일치하지 않습니다.</p>}
        </div>
        <div className={styles["sigin-name"]}>
          <label htmlFor="user-name">
            이름<span>*</span>
          </label>
          <input
            type="text"
            name="user-name"
            id="user-name"
            onChange={e => onChnageInput(e)}
            placeholder="이름을 입력해주세요"
          />
          {formValidationState["user-id"] === false &&
            <p className={styles["validation-warning"]}>이름을 입력해주세요.</p>}
        </div>
        <div className={styles["sigin-email"]}>
          <label htmlFor="user-email">
            이메일<span>*</span>
          </label>
          <input
            type="text"
            name="user-email"
            id="user-email"
            onChange={e => onChnageInput(e)}
            placeholder="이메일을 입력해주세요"
          />
          {formValidationState["user-email"] === false &&
            <p className={styles["validation-warning"]}>이메일을 올바르게 입력해주세요.</p>}
        </div>
        <div className={styles["sigin-phone"]}>
          <label htmlFor="user-phone">
            전화번호<span>*</span>
          </label>
          <div>
            <input
              type="text"
              name="user-phone"
              id="user-phone"
              onChange={e => onChnageInput(e)}
              placeholder="전화번호를 입력해주세요"
            />
            {authNumber.authDone === false
              ? <button type="button" onClick={authPhoneNumber}>
                  {authNumber.authrizing === false
                    ? "인증번호 받기"
                    : "인증번호 재전송"}{" "}
                </button>
              : <p>인증완료</p>}
          </div>
          <div>
            {authNumber.authrizing === true &&
              (authNumber.authDone == false &&
                <div>
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
                </div>)}
          </div>
          {formValidationState["user-phone"] === false &&
            <p className={styles["validation-warning"]}>핸드폰 인증을 해주세요.</p>}
        </div>
        <div className={styles["sigin-mainAddress"]}>
          <label htmlFor="user-mainAddress">
            주소<span>*</span>
          </label>
          <div>
            <input
              type="text"
              name="user-mainAddress"
              id="user-mainAddress"
              readOnly
              defaultValue={userInfo["user-mainAddress"]}
              onChange={e => onChnageInput(e)}
              placeholder="주소를 입력해주세요"
            />
            <button type="button" onClick={searchAddress}>
              주소 찾기
            </button>
          </div>
        </div>
        <div className={styles["sigin-subAddress"]}>
          {/* <label htmlFor="user-subAddress">상세주소<span>*</span></label> */}
          <input
            type="text"
            name="user-subAddress"
            id="user-subAddress"
            onChange={e => onChnageInput(e)}
            placeholder="상세주소를 입력해주세요"
          />
          {(formValidationState["user-mainAddress"] === false ||
            formValidationState["user-subAddress"] === false) &&
            <p className={styles["validation-warning"]}>주소 및 상세주소를 입력해주세요.</p>}
        </div>
        <div className={styles["sigin-birthDay"]}>
          <label htmlFor="user-birthDay">생년월일</label>
          <input
            type="number"
            name="user-birthDay"
            id="user-birthDay"
            onChange={e => onChnageInput(e)}
            placeholder="생년월일을 8자리를 입력해주세요 ex)19900525"
          />
          {formValidationState["user-birthDay"] === false &&
            <p className={styles["validation-warning"]}>생년월일을 올바르게 입력해주세요.</p>}
        </div>
        <div className={styles["sigin-gender"]}>
          <label htmlFor="user-gender">성별</label>
          <div>
            <div>
              <input
                type="radio"
                name="user-gender"
                id="user-gender"
                value="male"
                checked={userInfo["user-gender"] === "male"}
                onChange={e => onChnageInput(e)}
              />
              <p>남성</p>
            </div>
            <div>
              <input
                type="radio"
                name="user-gender"
                id="user-gender"
                value="female"
                checked={userInfo["user-gender"] === "female"}
                onChange={e => onChnageInput(e)}
              />
              <p>여성</p>
            </div>
          </div>
        </div>
        <div className={styles["usage-agreement"]}>
          <h2>이용약관동의</h2>
        </div>
        <button type="button" id="submit-formData" onClick={submitFormData}>
          가입하기
        </button>
      </div>
      {addressModal === true &&
        <DaumPost
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          formValidationState={formValidationState}
          setFormValidtaionState={setFormValidtaionState}
          styles={styles}
          setAddressModal={setAddressModal}
        />}
    </div>
  );
};

export default index;
