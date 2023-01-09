import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const AddOptionDescription = () => {
  return (
    <>
      <Row className="mt-5 m-2">
        <Col>~注意事項~</Col>
      </Row>
      <Row className="m-2">
        <Col>
          元々のジェネラティブ機能は、重み付け設定されているメインパーツの組み合わせが同じ組み合わせにならないように配慮されています。
        </Col>
      </Row>
      <Row className="m-2">
        <Col>
          追加ジェネラティブ機能は、元々のジェネラティブ機能を用いてデータを作成し、すでに保存されているデータの全てのパーツの組み合わせと一致しないもののみをランダムに抽出したのち、データに追加しております。
        </Col>
      </Row>
    </>
  );
};
