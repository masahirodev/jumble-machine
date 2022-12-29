import { useContext } from "react";
import { IntricateContext } from "../../IntricateContext";
import { MainPartsLayout } from "./MainPartsLayout";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";

//TODO sidebar選択から、folder情報を受け渡す
export const OptionConfig = () => {
  const { intricateDatas, saveData } = useContext(IntricateContext);
  const next = () => {
    saveData();
  };

  const urlParams = useParams();
  const mainParts =
    urlParams.mainPartsName !== undefined ? urlParams.mainPartsName : "";

  const OptionConfigData = intricateDatas.filter((value) => {
    return value.folder === mainParts;
  })[0];

  return (
    <Container className="p-3">
      <Row>メインパーツ：{OptionConfigData.folder}</Row>
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
      <Button onClick={next}>データを保存して次に進む</Button>
    </Container>
  );
};
