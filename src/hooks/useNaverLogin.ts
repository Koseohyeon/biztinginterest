import { useEffect, useState } from "react";

export function useNaverLogin(biztingCode: string, pageId: string) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (
        e.data?.type === "NAVER_LOGIN_SUCCESS" &&
        e.data?.pageId === pageId
      ) {
        setUnlocked(true);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [pageId]);

  const openLogin = () => {
    const url = `https://www.bizting.co.kr/naver/${biztingCode}?pageId=${pageId}`;
    window.open(url, "naverLogin", "width=500,height=700,left=200,top=100");
  };

  return { unlocked, openLogin };
}