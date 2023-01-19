import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { useContext } from "react";
import { AnalysisContext, AnalysisData } from "./AnalysisContext";
import Table from "react-bootstrap/Table";

export const PartsAnalysis = () => {
  const { analysisDatas } = useContext(AnalysisContext);
  const urlParams = useParams();
  const mainParts =
    urlParams.partsName !== undefined ? urlParams.partsName : "";

  const filterAnalysisDatas = analysisDatas.filter((analysisData) => {
    return analysisData.attribute === mainParts;
  });

  filterAnalysisDatas.sort((a, b) => {
    if (a.count < b.count) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <>
      <Container className="py-3">
        <Container>
          <Row>
            <Col>メインパーツ:{mainParts}</Col>
          </Row>
          <Row>
            <Col>
              <AnalysisTable datas={filterAnalysisDatas} />{" "}
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

const AnalysisTable = ({ datas }: { datas: AnalysisData[] }) => {
  const total = datas.reduce((sum, element) => {
    return sum + element.count;
  }, 0);
  return (
    <Table striped bordered hover variant="secondary">
      <thead>
        <tr>
          <th className="col-1">No</th>
          <th>パーツ名</th>
          <th className="col-2">数</th>
          <th className="col-2">％</th>
        </tr>
      </thead>
      <tbody>
        {datas.map((data, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{data.value}</td>
              <td>{data.count}</td>
              <td>{Math.floor((data.count / total) * 100 * 100) / 100}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
