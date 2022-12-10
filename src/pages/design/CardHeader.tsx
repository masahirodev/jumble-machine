import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { CardStyle } from "./Card";

type Props = {
  setComment: React.Dispatch<React.SetStateAction<string | string[]>>;
};

export const CardHeader: React.FC<Props> = ({ setComment }) => {
  return (
    <Container fluid className="px-5">
      <Row style={{ ...CardStyle, display: "flex", alignItems: "center" }}>
        <Col className="col-2" style={{ textAlign: "start" }}>
          フォルダーの名前
        </Col>
        <Col
          className="col-2"
          style={customStyle}
          onMouseEnter={() =>
            setComment(
              "この欄には、ジェネラティブを行った際にペアにしたいパーツを設定するよ。"
            )
          }
        >
          ペア設定
        </Col>
        <Col
          className="col-2"
          style={customStyle}
          onMouseEnter={() =>
            setComment(
              "この欄には、メタデータに書き込むパーツの名前を変更したいときに記入するよ。後から変更することも可能だよ。"
            )
          }
        >
          プロパティの名前
        </Col>
        <Col
          className="col-1"
          style={customStyle}
          onMouseEnter={() =>
            setComment(
              "この欄では、メタデータに表示したくないパーツを非表示にすることが出来るよ。"
            )
          }
        >
          プロパティ
          <br />
          に使う？
        </Col>
        <Col
          className="col-4"
          style={customStyle}
          onMouseEnter={() =>
            setComment([
              "この欄では、サンプルデータの選択をすることが出来るよ。パーツを選んでサンプル機能を押してみてね。",
              "隣にある数字は、ジェネラティブしたときのだいたいの排出率を設定することが出来るよ。",
            ])
          }
        >
          サンプルデータの選択と重みづけ
        </Col>
        <Col
          className="col-1"
          style={customStyle}
          onMouseEnter={() =>
            setComment("ここを上下に動かすことでパーツの並び替えが出来るよ。")
          }
        >
          並び替え
        </Col>
      </Row>
    </Container>
  );
};

const customStyle: React.CSSProperties = {
  textAlign: "center",
};
