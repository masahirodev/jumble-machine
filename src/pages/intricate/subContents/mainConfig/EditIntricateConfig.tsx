import { useContext, useState } from "react";

import { IntricateContext } from "../../IntricateContext";
import type { IntricateDataType } from "../../../../schema/intricate";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

type Props = {
  data: IntricateDataType;
};

const CustomStyle = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
};

export const EditIntricateConfig: React.FC<Props> = ({ data }) => {
  const { intricateDatas, setIntricateDatas, update, setUpdata } =
    useContext(IntricateContext);

  const init = "Open this select menu";

  //fileDataのリスト
  const fileDataLists = intricateDatas.map((intricateData) => {
    return {
      folder: intricateData.folder,
      fileData: intricateData.fileDatas.map((fileData) => fileData.name),
    };
  });

  //コンビとして選ばれたリスト
  const selectedCombiLists = intricateDatas
    .filter((intricateData) => intricateData.combi !== "")
    .map((intricateData) => intricateData.folder);

  //コンビリスト
  const combiLists = intricateDatas
    .filter((intricateData) => intricateData.combi !== "")
    .map((intricateData) => intricateData.combi);

  //fileData一致リスト
  const canCombiLists = fileDataLists
    .filter(
      (fileDataList) =>
        fileDataList.fileData.toString() ===
        data.fileDatas.map((fileData) => fileData.name).toString()
    )
    .map((value) => value.folder)
    .filter((value) => selectedCombiLists.indexOf(value) === -1);

  //ラジオボタンの表示非表示
  const [disabled, setDisabled] = useState<boolean>(false);

  //Option設定
  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.fileDatas[Number(e.target.id)].option = Number(e.target.value);
    setIntricateDatas(intricateDatas);
  };

  //combi設定
  const com = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === init) {
      data.combi = "";
      setDisabled(false);
    } else {
      if (
        intricateDatas.filter(
          (intricateData) => intricateData.folder === e.target.value
        )[0].combi === ""
      ) {
        data.combi = e.target.value;
        combiLists.push(e.target.value);

        setDisabled(true);
      } else {
        alert("参照先が既に参照しています。選びなおしてください");
      }
    }
    setIntricateDatas(intricateDatas);
    setUpdata(update ? false : true);
  };

  //排出設定
  const [unit, setUnit] = useState<string>(
    data.property === "random" ? "%" : data.property === "fixed" ? "個" : ""
  );
  const propertyFunc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    data.property = e.target.value as IntricateDataType["property"];
    setIntricateDatas(intricateDatas);
    setUnit(
      data.property === "random" ? "%" : data.property === "fixed" ? "個" : ""
    );
  };

  return (
    <Row style={{ ...CustomStyle, display: "flex", alignItems: "center" }}>
      <Col className="col-3">{data.folder}</Col>
      <Col className="col-3">
        <Form.Select
          onChange={com}
          defaultValue={data.combi}
          disabled={combiLists.some((folder) => {
            return folder === data.folder;
          })}
        >
          <option>{init}</option>
          {canCombiLists.map(
            (combi) =>
              combi !== data.folder && <option key={combi}>{combi}</option>
          )}
        </Form.Select>
      </Col>
      <Col className="col-2">
        <Form.Select
          onChange={propertyFunc}
          defaultValue={
            data.property === undefined ? "default" : String(data.property)
          }
        >
          <option value={"default"}>重み付け</option>
          <option value={"random"}>ランダム</option>
          <option value={"fixed"}>個数</option>
        </Form.Select>
      </Col>
      <Col className="col-4">
        {data.combi !== "" || disabled ? (
          <></>
        ) : (
          data.fileDatas.map((fileData, index) => (
            <InputGroup key={index}>
              <InputGroup.Text className="col-7">
                {fileData.name}
              </InputGroup.Text>
              <Form.Control
                className="col-3"
                defaultValue={fileData.option}
                onChange={changeOption}
                type="number"
                id={String(index)}
              />
              <InputGroup.Text className="col-2">{unit}</InputGroup.Text>
            </InputGroup>
          ))
        )}
      </Col>
    </Row>
  );
};
