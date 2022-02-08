import AuthPhoneNumber from "../AuthPhoneNumber";
import { useSelector } from "react-redux";
const IdInquiry = ({ styles }) => {
  const authObj = useSelector(state => {
    return state.Logins;
  });
  const userInfo = useSelector(state => {
    return state.IdInquiry;
  });
  return (
    <div className={styles["idInquiry-container"]}>
      <h1>아이디찾기</h1>
      {authObj.authDone === false &&
        <div>
          <AuthPhoneNumber authObj={authObj} authType={"id"} />
          {authObj.inAuth == false &&
            authObj.authDone === true &&
            <div>
              {userInfo.id.length === 0 &&
                userInfo.error === "not exist" &&
                <p>회원정보로 가입된 아이디가 없습니다.</p>}
            </div>}
        </div>}
      {userInfo.id.length !== 0 &&
        userInfo.error.length === 0 &&
        <div>
          <h2>
            아이디 : {userInfo.id}
          </h2>
        </div>}
    </div>
  );
};

export default IdInquiry;
