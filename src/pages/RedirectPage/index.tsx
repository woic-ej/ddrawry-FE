import api from "@api/fetcher";
import { useEffect } from "react";

const RedirectPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await api.get({ endpoint: `/auth/kakao/callback?code=${code}` });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return <div>로그인 중</div>;
};

export default RedirectPage;
