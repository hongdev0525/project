import UserInquiry from "../../../component/common/userInquiry/UserInquiry";
import styles from "/styles/common/userInquiry.module.scss";

const UserInquiryIndex = () => {
  return (
    <div className={styles["userInquiry-wrapper"]}>
      <UserInquiry styles={styles} />
    </div>
  );
};

export default UserInquiryIndex;
