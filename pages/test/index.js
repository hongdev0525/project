import React, { useEffect } from "react";
import axios from "axios";

const TestPage = ({ data }) => {
  useEffect(
    () => {
      console.log(data);
      return () => {};
    },
    [data]
  );
  return (
    <div>
      <h1>api 테스트</h1>
      <h2>
        {data}
      </h2>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_API_SERVER}/users`,
    method: "get"
  });
  const data = res.data;
  // const data = await res.data.json();
  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: data
    }
  };
}

export default TestPage;
