import axios from "axios";
import { useEffect } from "react";
import { loginCheck } from "../../lib/js/logincheck";
import Logout from "./Logout";

const Layout = ({ children }) => {
  useEffect(() => {
    // loginCheck();
  }, []);

  return (
    <div className="layout">
      <h1>공통 레이아웃</h1>
      {children}
      {/* <Logout />
      <br />
      <button onClick={test}>테스트</button> */}
    </div>
  );
};

export default Layout;
