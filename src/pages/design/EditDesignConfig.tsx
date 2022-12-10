import { useContext, useState } from "react";

import { DesignContext } from "./DesignContext";
import type { DesignDataType } from "../../schema/design";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

type Props = {
  data: DesignDataType;
};

export const EditDesignConfig: React.FC<Props> = ({ data }) => {
  const {
    sampleData,
    setSampleData,
    designDatas,
    setDesignDatas,
    update,
    setUpdata,
  } = useContext(DesignContext);

  const init = "Open this select menu";

  //fileDataのリスト
  const fileDataLists = designDatas.map((designData) => {
    return {
      folder: designData.folder,
      fileData: designData.fileDatas.map((fileData) => fileData.name),
    };
  });

  //コンビとして選ばれたリスト
  const selectedCombiLists = designDatas
    .filter((designData) => designData.combi !== "")
    .map((designData) => designData.folder);

  //コンビリスト
  const combiLists = designDatas
    .filter((designData) => designData.combi !== "")
    .map((designData) => designData.combi);

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

  //ラジオボタンの機能
  const radio = (name: string) => {
    sampleData[data.id] = name;
    setSampleData(sampleData);
  };

  //Option設定
  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.fileDatas[Number(e.target.id)].option = Number(e.target.value);
    setDesignDatas(designDatas);
  };

  //combi設定
  const com = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === init) {
      data.combi = "";
      setDisabled(false);
    } else {
      if (
        designDatas.filter(
          (designData) => designData.folder === e.target.value
        )[0].combi === ""
      ) {
        data.combi = e.target.value;
        combiLists.push(e.target.value);

        setDisabled(true);
      } else {
        alert("参照先が既に参照しています。選びなおしてください");
      }
    }
    setDesignDatas(designDatas);
    setUpdata(update ? false : true);
  };

  const renameFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.rename = e.target.value;
    setDesignDatas(designDatas);
  };

  const propertyFunc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "false") {
      data.property = false;
    } else {
      data.property = true;
    }
    setDesignDatas(designDatas);
  };

  return (
    <>
      <Col className="col-2">{data.folder}</Col>
      <Col className="col-2">
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
        <Form.Control
          type={typeof data.rename}
          name={"rename"}
          onChange={renameFunc}
          defaultValue={data.rename === undefined ? "" : data.rename}
        />
      </Col>
      <Col className="col-1">
        <Form.Select
          onChange={propertyFunc}
          defaultValue={
            data.property === undefined ? "true" : String(data.property)
          }
        >
          <option value={"true"}>必要</option>
          <option value={"false"}>不要</option>
        </Form.Select>
      </Col>
      <Col className="col-4">
        {data.combi !== "" || disabled ? (
          <></>
        ) : (
          data.fileDatas.map((fileData, index) => (
            <InputGroup key={index}>
              <InputGroup.Checkbox
                onClick={() => radio(fileData.name)}
                label={fileData.name}
                name={String(data.id)}
                type="radio"
                id={`inline-radio-${data.id}`}
              />
              <InputGroup.Text className="col-8">
                {fileData.name}
              </InputGroup.Text>
              <Form.Control
                className="col-3"
                defaultValue={fileData.option}
                onChange={changeOption}
                type="number"
                id={String(index)}
              />
            </InputGroup>
          ))
        )}
      </Col>
    </>
  );
};
