import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KVR Brain Point - Home Tuition Chennai & Online Coaching Tamil Nadu";
export const size = { width: 2400, height: 1260 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(140deg, #071625 0%, #1C4269 55%, #1f4f80 100%)",
          padding: "128px 160px 104px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Ghost K background decoration */}
        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "-120px",
            fontSize: "1040px",
            fontWeight: 900,
            color: "rgba(255,255,255,0.025)",
            lineHeight: 1,
            display: "flex",
            letterSpacing: "-0.04em",
          }}
        >
          K
        </div>

        {/* Orange circle glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-240px",
            right: "640px",
            width: "680px",
            height: "680px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(242,118,48,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Orange accent bar */}
        <div
          style={{
            width: "112px",
            height: "10px",
            background: "#F27630",
            borderRadius: "6px",
            marginBottom: "88px",
            display: "flex",
          }}
        />

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: "34px",
              fontWeight: 600,
              color: "#F27630",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "36px",
              display: "flex",
            }}
          >
            Chennai · Tamil Nadu
          </div>

          <div
            style={{
              fontSize: "168px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              marginBottom: "52px",
              display: "flex",
            }}
          >
            KVR Brain Point
          </div>

          <div
            style={{
              fontSize: "54px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.60)",
              lineHeight: 1.45,
              maxWidth: "1360px",
              display: "flex",
            }}
          >
            Home tuition that builds confidence, not just marks.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255,255,255,0.10)",
            paddingTop: "44px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ fontSize: "30px", color: "rgba(255,255,255,0.45)", display: "flex" }}>
              Classes 1–12
            </div>
            <div style={{ fontSize: "30px", color: "rgba(242,118,48,0.6)", margin: "0 28px", display: "flex" }}>·</div>
            <div style={{ fontSize: "30px", color: "rgba(255,255,255,0.45)", display: "flex" }}>
              CBSE · ICSE · State Board
            </div>
            <div style={{ fontSize: "30px", color: "rgba(242,118,48,0.6)", margin: "0 28px", display: "flex" }}>·</div>
            <div style={{ fontSize: "30px", color: "rgba(255,255,255,0.45)", display: "flex" }}>
              Online &amp; Offline
            </div>
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.30)",
              display: "flex",
            }}
          >
            kvrbrainpoint.in
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
