import { Oval } from "react-loader-spinner";

function Loading({ styles }) {
  return (
    <div className={styles["loading-container"]}>
      <Oval color="#6667AB" height={80} width={80}></Oval>
    </div>
  );
}

export default Loading;
