import { useEffect } from "react";
import { loginCheck } from "../../lib/js/logincheck";
import Logout from "./Logout";
import Navigation from "./Navigation";
import styles from "/styles/common/layout.module.scss";
const Layout = ({ children }) => {
  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <div className={styles["layout"]}>
      <div className={styles["header"]}>
        <h1>공통 레이아웃</h1>
        <Navigation styles={styles} />
        <Logout />
      </div>
      {children}
    </div>
  );
};

export default Layout;
