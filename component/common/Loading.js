import { TailSpin } from "react-loader-spinner";

function Loading({ styles }) {
  return (
    <div className={styles["loading-container"]}>
      <TailSpin color="#6667AB" height={120} width={120}></TailSpin>
    </div>
  );
}

export default Loading;
