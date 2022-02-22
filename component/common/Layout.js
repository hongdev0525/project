import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginCheck } from "../../lib/js/logincheck";
import Loading from "./Loading";
import Logout from "./Logout";
import Navigation from "./Navigation";
import styles from "/styles/common/layout.module.scss";
import { setLoading } from "/modules/common/loading";
import Router from "next/router";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const loadingStete = useSelector((state) => {
    return state.LoadingSpinner.loadingState;
  });

  Router.events.on("routeChangeStart", () => {
    dispatch(setLoading(true));
  });
  Router.events.on("routeChangeComplete", () => {
    dispatch(setLoading(false));
  });

  useEffect(() => {
    loginCheck();
  }, []);

  const testSpinner = () => {
    dispatch(setLoading(!loadingStete));
  };

  return (
    <div className={styles["layout"]}>
      <button onClick={() => testSpinner()}> 로딩 스피너 테스트</button>
      <div className={styles["header"]}>
        <h1>공통 레이아웃</h1>
        <Navigation styles={styles} />
        <Logout />
      </div>
      {children}
      {loadingStete === true && <Loading styles={styles}></Loading>}
    </div>
  );
};

export default Layout;
