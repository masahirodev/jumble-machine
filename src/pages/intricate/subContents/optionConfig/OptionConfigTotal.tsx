import { useContext } from "react";
import { IntricateContext } from "../../IntricateContext";
import { MainPartsLayout } from "./MainPartsLayout";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { OptionCardHeader } from "./OptionCardHeader";
import { linkTo } from "../../../../hooks/linkTo";

export const OptionConfigTotal = () => {
  const { intricateDatas, saveData } = useContext(IntricateContext);
  const next = () => {
    saveData();
    linkTo("/intricate/sortConfig");
  };
  return (
    <Container className="py-3">
      {intricateDatas
        .filter((value) => {
          return value.pairing === "main" || value.pairing === "bg";
        })
        .map((value, index) => {
          return (
            <Container className="pb-5" key={index}>
              <Row>
                <Col>
                  メインパーツ：
                  <NavLink to={`/intricate/optionConfig/${value.folder}`}>
                    {value.folder}
                  </NavLink>
                </Col>
              </Row>
              <OptionCardHeader />
              {value.fileDatas.map((fileData, index) => {
                return (
                  <MainPartsLayout
                    mainFolder={value.folder}
                    mainPartsName={fileData.name}
                    optionParts={fileData.optionParts}
                    key={`optionConfig-${index}`}
                    isTotal={true}
                  />
                );
              })}
            </Container>
          );
        })}
      <Button onClick={next}>データを保存して次に進む</Button>
    </Container>
  );
};
