import { useContext } from "react";
import { IntricateContext } from "../../IntricateContext";
import { MainPartsLayout } from "./MainPartsLayout";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

//TODO sidebar選択から、folder情報を受け渡す
export const OptionConfig = () => {
  const { intricateDatas, saveData } = useContext(IntricateContext);
  const next = () => {
    saveData();
  };
  return (
    <Container className="pb-3">
      {intricateDatas
        .filter((value) => {
          return value.pairing === "main" || value.pairing === "bg";
        })
        .map((value, index) => {
          return (
            <Container key={index}>
              <Row>メインパーツ：{value.folder}</Row>
              {value.fileDatas.map((fileData, index) => {
                return (
                  <MainPartsLayout
                    mainFolder={value.folder}
                    mainPartsName={fileData.name}
                    optionParts={fileData.optionParts}
                    key={`optionConfig-${index}`}
                  />
                );
              })}
              <Button onClick={next}>データを保存して次に進む</Button>
            </Container>
          );
        })}
    </Container>
  );
};
