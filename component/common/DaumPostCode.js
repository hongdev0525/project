import DaumPostCode from "react-daum-postcode";
const DaumPost = ({
  userInfo,
  setUserInfo,
  styles,
  setAddressModal,
  setFormValidtaionState,
  formValidationState
}) => {
  const handleComplete = data => {
    let mainAddress = data.address;
    let subAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        subAddress += data.bname;
      }
      if (data.buildingName !== "") {
        subAddress +=
          subAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      mainAddress += subAddress !== "" ? ` (${subAddress})` : "";
    }
    setUserInfo({ ...userInfo, "user-mainAddress": mainAddress });
    setFormValidtaionState({
      ...formValidationState,
      "user-mainAddress": true
    });
    setAddressModal(false);
  };
  return (
    <div className={styles["postCode-wrapper"]}>
      <button type="button" onClick={() => setAddressModal(false)}>
        X
      </button>
      <DaumPostCode
        onComplete={handleComplete}
        className={styles["post-code"]}
      />
    </div>
  );
};

export default DaumPost;
