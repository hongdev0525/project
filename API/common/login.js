import axios from "axios";
import Router from "next/router";

export const authPhoneNumber = async ({ userName, userPhone }) => {
  if (userName.length !== 0 && userPhone.length !== 0) {
    return await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/signin/phone`,
      data: {
        userPhone: userPhone,
        userName: userName
      }
    });
    // .then(res => {
    //   const status = res.data.status;
    //   const error = res.data.error;
    //   if (status === "fail" && error === "already exist") {
    //     alert("이미 가입된 번호입니다. 번호로 가입한 적이 없으시면 고객센터로 문의주세요.");
    //   } else if (status === "fail" && error === "query error") {
    //     alert("인증번호 발송에 실패 했습니다. 고객센터로 문의주세요.");
    //   } else {
    //     setAuthNumber({
    //       ...authNumber,
    //       authrizing: true,
    //       number: res.data.authNumber
    //     });
    //     setFormValidtaionState({
    //       ...formValidationState,
    //       ["user-phone"]: true
    //     });
    //     console.log("res", res.data);
    //   }
    // })
    // .catch(err => {
    //   setFormValidtaionState({
    //     ...formValidationState,
    //     ["user-phone"]: false
    //   });
    //   console.log(err);
    // });
  } else {
    alert("성함과 전화번호를 입력해주세요.");
  }
};
export const checkId = async id => {
  await axios({
    url: `${process.env.NEXT_PUBLIC_API_SERVER}/signin/id`,
    method: "get",
    params: {
      userId: id
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

export const kakoLogin = async () => {
  Kakao.Auth.login({
    success: authObj => {
      Kakao.API.request({
        url: "/v2/user/me",
        success: async res => {
          console.log("res", res);
          const response = await axios({
            url: "http://localhost:3000/login/kakao",
            method: "POST",
            data: {
              ...res,
              login_type: "kakao",
              email: res.kakao_account.email,
              access_token: authObj.access_token
            },
            withCredentials: true
          });
          const status = response.data.status;
          if (status === "success") {
            //쿠키에 access token과 refresh toekn을 저장.
            window.localStorage.setItem("loggedInState", "loggedIn");
            Router.push("/");
          } else if (status === "signIn") {
            alert("회원가입 후 로그인이 가능합니다.");
            Router.push("/common/signin");
          } else if (status === "logIn") {
            Router.push("/common/logIn");
          }
        },
        fail: error => {
          console.log(error);
        }
      });
    },
    fail: () => {}
  });
};

// export default kakoLogin;
