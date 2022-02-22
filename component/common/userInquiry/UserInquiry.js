import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import IdInquiry from "./IdInquiry";
import PwdInquiry from "./PwdInquiry";
import { authInitialize } from "/modules/common/login";
import { idInquiryInitialize } from "../../../modules/common/userInquiry/idInquiry";
import { pwdInquiryInitialize } from "../../../modules/common/userInquiry/pwdInquiry";
const UserInquiry = ({ styles }) => {
  const dispatch = useDispatch();
  const [tabMenuIndex, setTabMenuIndex] = useState(1);
  const handleTabMenu = index => {
    setTabMenuIndex(index);
    dispatch(authInitialize());
    dispatch(idInquiryInitialize());
    dispatch(pwdInquiryInitialize());
  };

  return (
    <div className={styles["userInquiry-container"]}>
      <div className={styles["userInquiry-tab"]}>
        <div
          className={`${styles["tabs"]} ${tabMenuIndex === 0
            ? styles["active"]
            : ""}`}
          onClick={() => handleTabMenu(0)}
        >
          아이디 찾기
        </div>
        <div
          className={`${styles["tabs"]} ${tabMenuIndex === 1
            ? styles["active"]
            : ""}`}
          onClick={() => handleTabMenu(1)}
        >
          비밀번호 찾기
        </div>
      </div>
      <div className={styles["user-inquiry"]}>
        {tabMenuIndex === 0
          ? <IdInquiry styles={styles} />
          : <PwdInquiry styles={styles} />}
      </div>
    </div>
  );
};

export default UserInquiry;
