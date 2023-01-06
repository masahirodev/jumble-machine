import { useContext } from "react";
import { IntricateContext } from "../../IntricateContext";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RenameMainData } from "./RenameMainData";
import { RenameFileData } from "./RenameFileData";
import { CardStyle } from "../sortConfig/Card";
import { linkTo } from "../../../../hooks/linkTo";
import { RenameConfigHeader } from "./RenameConfigHeader";

export const RenameConfig = () => {
  const { intricateDatas, saveData } = useContext(IntricateContext);
  const next = () => {
    saveData();
    linkTo("prep");
  };

  return (
    <Container className="p-3">
      <RenameConfigHeader />
      {intricateDatas.map((intricateData, index) => {
        return (
          <Row
            style={{ ...CardStyle, display: "flex", alignItems: "center" }}
            key={index}
          >
            <Col className="col-3">{intricateData.folder}</Col>
            <RenameMainData data={intricateData} />
            <Col className="col-6">
              {intricateData.fileDatas.map((fileData, index) => {
                return (
                  <Row key={index}>
                    <Col style={{ alignSelf: "center" }}>
                      {fileData.name.split(".").slice(0, -1).join(".")}
                    </Col>
                    <Col>
                      <RenameFileData
                        data={fileData}
                        folder={intricateData.folder}
                      />
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        );
      })}
      <Button onClick={next}>データを保存して次に進む</Button>
    </Container>
  );
};
