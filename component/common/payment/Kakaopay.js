import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { kakaopayRequest } from "../../../modules/common/payment/kakaopay";
const Kakaopay = () => {
  const dispatch = useDispatch();

  const orderInfo = {
    pg: "kakaopay",
    merchant_uid: "order_monthly_2", // 상점에서 관리하는 주문 번호
    name: "최초인증결제",
    amount: 0, // 빌링키 발급만 진행하며 결제승인을 하지 않습니다.
    customer_uid: "cueat_test_uid_2", // 필수 입력
    buyer_email: "ghddmlgus3@naver.com",
    buyer_name: "홍의현",
    buyer_tel: "010-8248-7509"
  };

  const orderInfo2 = {
    pg: "kakaopay",
    merchant_uid: "order_monthly_7", // 상점에서 관리하는 주문 번호
    customer_uid: "cueat_test_uid_2", // 필수 입력//영문+구독번호로 하자
    name: "주문명:결제테스트",
    amount: 10,
    buyer_email: "ghddmlgus3@naver.com",
    buyer_name: "홍의현",
    buyer_tel: "010-8248-7509",
    buyer_addr: "서울특별시 동대문구 용두동",
    buyer_postcode: "02564"
  };
  const url = "https://api.iamport.kr/subscribe/payments/onetime";
  const url2 = "https://api.iamport.kr/subscribe/payments/again";

  const handlePayment = () => {
    // dispatch(kakaopayRequest(orderInfo, url));
    console.log(orderInfo);
    IMP.request_pay(orderInfo, function(rsp) {
      // callback 로직
      //* ...중략 (README 파일에서 상세 샘플코드를 확인하세요)... *//
      console.log(rsp);
    });
  };
  const handlePayment2 = () => {
    dispatch(kakaopayRequest(orderInfo2, url2));
  };

  useEffect(() => {
    var IMP = window.IMP; // 생략가능
    if (IMP) {
      IMP.init("imp72211200"); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용
    }
  }, []);

  return (
    <div className="kakaopay-container">
      <script
        type="text/javascript"
        src="https://code.jquery.com/jquery-1.12.4.min.js"
      />
      <script
        type="text/javascript"
        src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
      />
      <div>
        <button type="button" onClick={handlePayment}>
          카카오페이 결제하기
        </button>
      </div>
      <div>
        <button type="button" onClick={handlePayment2}>
          카카오페이 정기결제하기
        </button>
      </div>
    </div>
  );
};

export default Kakaopay;
