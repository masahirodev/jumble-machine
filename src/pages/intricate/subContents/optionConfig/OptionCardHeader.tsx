import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MouseEventHandler } from "react";
import { useComment } from "../../../../hooks/useComment";
import { CardStyle } from "../sortConfig/Card";

type Data = {
  class: string;
  style: React.CSSProperties;
  name: string;
  mouse: MouseEventHandler<HTMLElement> | undefined;
};

export const OptionCardHeader: React.FC = () => {
  const { selectSetComment } = useComment();

  const data: Data[] = [
    {
      class: "col-3",
      style: { textAlign: "start" },
      name: "メインパーツ",
      mouse: undefined,
    },
    {
      class: "col-3",
      style: { textAlign: "center" },
      name: "オプションパーツのフォルダ名",
      mouse: undefined,
    },
    {
      class: "col-6",
      style: { textAlign: "center" },
      name: "オプションパーツと排出設定",
      mouse: () => selectSetComment("intricateEmissionDescriptionOptionparts"),
    },
  ];
  return (
    <Row style={{ ...CardStyle, display: "flex", alignItems: "center" }}>
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
