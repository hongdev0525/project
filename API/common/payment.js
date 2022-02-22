import axios from "axios";
// import Router from "next/router";
export const kakopayRequestAPI = async orderInfo => {
  if (orderInfo) {
    return await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/payment/test`,
      data: orderInfo
    });
  }
};
