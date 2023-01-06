import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CardStyle } from "./Card";
import { MouseEventHandler } from "react";
import { useComment } from "../../../../hooks/useComment";

type Data = {
  class: string;
  style: React.CSSProperties;
  name: string;
  mouse: MouseEventHandler<HTMLElement> | undefined;
};

export const CardHeader: React.FC = () => {
  const { selectSetComment } = useComment();

  const data: Data[] = [
    {
      class: "col-1",
      style: { textAlign: "center" },
      name: "分類",
      mouse: undefined,
    },
    {
      class: "col-3",
      style: { textAlign: "center" },
      name: "フォルダ名",
      mouse: undefined,
    },
    {
      class: "col-7",
      style: { textAlign: "center" },
      name: "パーツ一覧",
      mouse: () => selectSetComment("intricateDescriptionSample"),
    },
    {
      class: "col-1",
      style: { textAlign: "center" },
      name: "並び替え",
      mouse: () => selectSetComment("designDescriptionSort"),
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
