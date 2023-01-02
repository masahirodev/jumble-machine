import { useContext } from "react";
import { IntricateContext } from "../../IntricateContext";
import { MainPartsLayout } from "./MainPartsLayout";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { sidebarData } from "../../sidebarData";
import { linkTo } from "../../../../hooks/linkTo";

export const OptionConfig = () => {
  const { intricateDatas, saveData } = useContext(IntricateContext);
  const urlParams = useParams();
  const mainParts =
    urlParams.mainPartsName !== undefined ? urlParams.mainPartsName : "";

  const OptionConfigData = intricateDatas.filter((value) => {
    return value.folder === mainParts;
  })[0];

  const backPage = sidebarData.filter((value) => {
    return value.title === "オプションパーツ設定";
  })[0].link;

  const next = () => {
    saveData();
    linkTo(backPage);
  };

  return (
    <Container className="p-3">
      <Row>
        <Col>メインパーツ：{OptionConfigData.folder}</Col>
        <Col style={{ display: "flex", justifyContent: "end" }}>
          <NavLink to={backPage}>オプションパーツ設定に戻る</NavLink>
        </Col>
      </Row>
      {OptionConfigData.fileDatas.map((fileData, index) => {
        return (
          <MainPartsLayout
            mainFolder={OptionConfigData.folder}
            mainPartsName={fileData.name}
            optionParts={fileData.optionParts}
            key={`optionConfig-${index}`}
          />
        );
      })}
      <Button onClick={saveData} style={{ marginRight: "1rem" }}>
        データを保存
      </Button>
      <Button onClick={next}>データを保存してオプションパーツ設定に戻る</Button>
    </Container>
  );
};
