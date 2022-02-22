import axios from "axios";

export const kakopayRequestAPI = async (orderInfo) => {
  if (orderInfo) {
    return await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/payment/kakao`,
      data: orderInfo,
    });
  }
};
