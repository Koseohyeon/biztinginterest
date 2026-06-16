import storeImg from "./../../assets/MartImage.png";

export default function MapLanding() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      margin: 0,
      padding: 0,
      overflow: "hidden",
      fontFamily: "'Noto Sans KR', -apple-system, sans-serif",
    }}>
      {/* 이미지 — 잘리지 않고 전체 보이기 */}
      <div style={{
        flex: 1,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        <img
          src={storeImg}
          alt="매장 이미지"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* 하단 버튼 */}
      <div style={{
        padding: "20px 24px 36px",
        background: "#fff",
      }}>
        <a
          href="https://naver.me/58NicTqn"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            width: "100%",
            padding: "16px 0",
            borderRadius: 16,
            background: "linear-gradient(135deg,#03C75A,#02904A)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 800,
            textDecoration: "none",
            boxShadow: "0 4px 16px rgba(3,199,90,0.30)",
          }}
        >
          <span style={{ fontSize: 20 }}></span>
          네이버 지도에서 위치 확인하기
        </a>
      </div>
    </div>
  );
}