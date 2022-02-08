import axios from "axios";

export const setPassword = async ({ userId, userPassword }) => {
  console.log(userPassword);
  if (userPassword.length !== 0) {
    return await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/signin/setNewpwd`,
      data: {
        userId: userId,
        userPassword: userPassword
      }
    });
  }
};

export const idExist = async ({ userId }) => {
  if (userId.length !== 0) {
    return await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/signin/idCheck`,
      params: {
        userId: userId
      }
    });
  }
};

export const idInquiry = async ({ userName, userPhone, inquiryToken }) => {
  if (
    userName.length !== 0 &&
    userPhone.length !== 0 &&
    inquiryToken.length !== 0
  ) {
    return await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/signin/idInquiry`,
      data: {
        userPhone: userPhone,
        userName: userName,
        inquiryToken: inquiryToken
      }
    });
  }
};
