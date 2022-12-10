import { ReactNode } from "react";

import Container from "react-bootstrap/Container";

type Props = {
  title: string;
  children: ReactNode;
  color?: string;
  size?: "min";
};

export const Step: React.FC<Props> = ({ title, children, color, size }) => {
  return (
    <Container
      style={{
        position: "relative",
        margin: `${size === "min" ? "1em 0" : "2em 0"}`,
        padding: `${size === "min" ? "0.5em 0" : "1em 1em"}`,
        border: `solid 3px ${color ? color : "#999999"}`,
        borderRadius: "0.5em",
      }}
    >
      <span
        style={{
          position: "absolute",
          display: "inline-block",
          top: `${size === "min" ? "-0.6em" : "-0.6em"}`,
          left: " 0.5em",
          padding: "0 0.5em",
          lineHeight: "1",
          fontSize: `${size === "min" ? "1em" : "2em "}`,
          background: "#FFF",
          color: `${color ? color : "#999999"}`,
          fontWeight: "bold",
        }}
      >
        {title}
      </span>
      {children}
    </Container>
  );
};
