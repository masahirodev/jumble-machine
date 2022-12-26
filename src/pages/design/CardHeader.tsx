import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CardStyle } from "./Card";
import { useComment } from "../../hooks/useComment";
import { MouseEventHandler } from "react";

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
      class: "col-2",
      style: { textAlign: "start" },
      name: "フォルダーの名前",
      mouse: undefined,
    },
    {
      class: "col-2",
      style: { textAlign: "center" },
      name: "ペア設定",
      mouse: () => selectSetComment("designDescriptionPairParts"),
    },
    {
      class: "col-2",
      style: { textAlign: "center" },
      name: "プロパティの名前",
      mouse: () => selectSetComment("designDescriptionProperty"),
    },
    {
      class: "col-1",
      style: { textAlign: "center" },
      name: `プロパティ\nに使う？`,
      mouse: () => selectSetComment("designDescriptionPropertyDropdown"),
    },
    {
      class: "col-4",
      style: { textAlign: "center" },
      name: "サンプルデータの選択と重みづけ",
      mouse: () => selectSetComment("designDescriptionSample"),
    },
    {
      class: "col-1",
      style: { textAlign: "center" },
      name: "並び替え",
      mouse: () => selectSetComment("designDescriptionSort"),
    },
  ];
  return (
    <Container fluid className="px-5">
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
    </Container>
  );
};
