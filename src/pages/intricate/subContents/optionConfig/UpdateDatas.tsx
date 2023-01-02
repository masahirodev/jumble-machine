import { useContext, useState } from "react";

import { IntricateContext } from "../../IntricateContext";
import type { OptionPart } from "../../../../schema/intricate";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { OptionPartsLayout } from "./OptionPartsLayout";

type Props = {
  buttonFunc: (updateOptionPart: OptionPart) => void;
  mainFolder: string;
};

export const UpdateDatas: React.FC<Props> = ({ buttonFunc, mainFolder }) => {
  const { intricateDatas } = useContext(IntricateContext);

  const init = "Open this select menu";

  //optionデータ
  const optionDataLists = intricateDatas
    .filter((intricateData) => {
      return intricateData.pairing === "option";
    })
    .map((intricateData) => {
      return {
        folder: intricateData.folder,
        fileDatas: intricateData.fileDatas.map((fileData) => fileData.name),
      };
    });

  const [selectFolder, setSelectFolder] = useState<string>("init");

  //既に選択されているペアパーツを除去;
  const selectedOptionParts = intricateDatas
    .map((intricateData) => {
      return intricateData.fileDatas;
    })
    .flat()
    .map((fileData) => {
      return fileData.optionParts;
    })
    .flat()
    .filter((optionPart) => {
      return optionPart?.folder === selectFolder;
    })
    .map((optionPart) => {
      return optionPart?.name;
    });

  //選択結果からオプションパーツのdatasetを作成
  const selectOptionParts: OptionPart[] | undefined =
    selectFolder !== "init"
      ? optionDataLists
          .filter((value) => {
            return value.folder === selectFolder;
          })[0]
          .fileDatas.filter((fileData) => {
            return !selectedOptionParts.includes(fileData);
          })
          .map((fileData) => {
            return {
              folder: selectFolder,
              name: fileData,
              option: 0,
              property: "random",
            };
          })
      : undefined;

  return (
    <Row className="align-items-center my-3">
      <Col className="col-4">
        <Form.Select
          onChange={(e) => {
            setSelectFolder(e.target.value);
          }}
          defaultValue={selectFolder}
        >
          <option value="init">{init}</option>
          {optionDataLists.map((optionDataList, index) => (
            <option key={index}>{optionDataList.folder}</option>
          ))}
        </Form.Select>
      </Col>
      <Col className="col-8">
        {selectOptionParts !== undefined && (
          <OptionPartsLayout
            optionParts={selectOptionParts}
            isUpdate={true}
            funcOptionParts={buttonFunc}
          />
        )}
      </Col>
    </Row>
  );
};
