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

export const RenameConfigHeader: React.FC = () => {
  const { selectSetComment } = useComment();

  const data: Data[] = [
    {
      class: "col-3",
      style: { textAlign: "start" },
      name: "フォルダーの名前",
      mouse: undefined,
    },
    {
      class: "col-2",
      style: { textAlign: "center" },
      name: "パーツの名称",
      mouse: () => selectSetComment("designDescriptionProperty"),
    },
    {
      class: "col-1",
      style: { textAlign: "center" },
      name: "メタデータに使う？",
      mouse: () => selectSetComment("designDescriptionPropertyDropdown"),
    },
    {
      class: "col-3",
      style: { textAlign: "center" },
      name: "ファイルの名前",
      mouse: undefined,
    },
    {
      class: "col-3",
      style: { textAlign: "center" },
      name: "パーツの名前",
      mouse: () => selectSetComment("designDescriptionProperty"),
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
