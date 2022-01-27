import axios from "axios";
import { useEffect, useState } from "react";
import { loginCheck } from "../../lib/js/logincheck";
import Logout from "./Logout";

const Layout = ({ children }) => {
  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <div className="layout">
      <div className="header">
        <h1>공통 레이아웃</h1>
        <Logout />
      </div>
      {children}
    </div>
  );
};

export default Layout;
