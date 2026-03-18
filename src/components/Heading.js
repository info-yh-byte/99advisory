import { COLORS } from "../constants";

export default function Heading(props) {
  return (
    <div style={{ textAlign: "center", marginBottom: 44 }}>
      {props.tag && (
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: COLORS.green,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {props.tag}
        </div>
      )}
      <h2
        style={{
          fontSize: "clamp(20px, 4vw, 28px)",
          fontWeight: 900,
          color: COLORS.text,
          lineHeight: 1.55,
          marginBottom: props.sub ? 14 : 0,
        }}
      >
        {props.title}
      </h2>
      {props.sub && (
        <p
          style={{
            fontSize: 14,
            color: COLORS.sub,
            lineHeight: 1.8,
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          {props.sub}
        </p>
      )}
    </div>
  );
}
