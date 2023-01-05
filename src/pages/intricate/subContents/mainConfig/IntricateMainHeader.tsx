import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CustomStyle } from "./EditIntricateConfig";
import { MouseEventHandler } from "react";
import { useComment } from "../../../../hooks/useComment";

type Data = {
  class: string;
  style: React.CSSProperties;
  name: string;
  mouse: MouseEventHandler<HTMLElement> | undefined;
};

export const IntricateMainHeader: React.FC = () => {
  const { selectSetComment } = useComment();

  const data: Data[] = [
    {
      class: "col-3",
      style: { textAlign: "start" },
      name: "フォルダーの名前",
      mouse: undefined,
    },
    {
      class: "col-3",
      style: { textAlign: "center" },
      name: "ペア設定",
      mouse: () => selectSetComment("designDescriptionPairParts"),
    },
    {
      class: "col-6",
      style: { textAlign: "center" },
      name: "排出設定",
      mouse: () => selectSetComment("intricateEmissionDescription"),
    },
  ];
  return (
    <Row style={{ ...CustomStyle, display: "flex", alignItems: "center" }}>
      {data.map((value, index) => {
        return (
          <Col
            key={index}
            className={value.class}
            style={value.style}
            onMouseEnter={value.mouse}
          >
            {value.name}
          </Col>
        );
      })}
    </Row>
  );
};
