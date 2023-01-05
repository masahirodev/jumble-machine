import { useContext } from "react";

import { IntricateContext } from "../../IntricateContext";
import type { OptionPart } from "../../../../schema/intricate";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { UpdateDatas } from "./UpdateDatas";
import { SavedInDatas } from "./SavedInDatas";

type Props = {
  mainFolder: string;
  mainPartsName: string;
  optionParts: OptionPart[] | undefined;
  isTotal?: boolean;
};

export const CustomStyle = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
};

export const MainPartsLayout: React.FC<Props> = ({
  mainFolder,
  mainPartsName,
  optionParts,
  isTotal,
}) => {
  const { intricateDatas, setIntricateDatas } = useContext(IntricateContext);

  const addOptionPart = (updateOptionPart: OptionPart) => {
    //updateするメインパーツのデータの抽出
    const updateData = intricateDatas.filter((intricateData) => {
      return intricateData.folder === mainFolder;
    })[0];

    const updateFileData = updateData.fileDatas.map((fileData) => {
      if (fileData.name === mainPartsName) {
        if (fileData.optionParts !== undefined) {
          const index = fileData.optionParts.findIndex((value) => {
            return (
              value.folder === updateOptionPart.folder &&
              value.name === updateOptionPart.name
            );
          });
          if (index === -1) {
            fileData.optionParts.push(updateOptionPart);
          } else {
            fileData.optionParts[index] = updateOptionPart;
          }
        }
        return {
          ...fileData,
          optionParts:
            fileData.optionParts === undefined
              ? [updateOptionPart]
              : fileData.optionParts,
        };
      } else {
        return fileData;
      }
    });

    const updateIntricateDatas = intricateDatas.map((intricateData) => {
      return intricateData.folder === mainFolder
        ? { ...updateData, fileDatas: updateFileData }
        : intricateData;
    });
    setIntricateDatas(updateIntricateDatas);
  };

  const deleteOptionPart = (updateOptionPart: OptionPart) => {
    const updateData = intricateDatas.filter((intricateData) => {
      return intricateData.folder === mainFolder;
    })[0];

    const updateFileData = updateData.fileDatas.map((fileData) => {
      if (fileData.name === mainPartsName) {
        if (fileData.optionParts !== undefined) {
          const index = fileData.optionParts.findIndex((value) => {
            return (
              value.folder === updateOptionPart.folder &&
              value.name === updateOptionPart.name
            );
          });
          fileData.optionParts.splice(index, 1);
        }
        return {
          ...fileData,
          optionParts: fileData.optionParts,
        };
      } else {
        return fileData;
      }
    });

    const updateIntricateDatas = intricateDatas.map((intricateData) => {
      return intricateData.folder === mainFolder
        ? { ...updateData, fileDatas: updateFileData }
        : intricateData;
    });
    setIntricateDatas(updateIntricateDatas);
  };

  return (
    <Row style={{ ...CustomStyle, display: "flex", alignItems: "center" }}>
      <Col className="col-3">{mainPartsName}</Col>
      <Col className="col-9">
        {optionParts !== undefined && (
          <SavedInDatas
            optionParts={optionParts}
            buttonFunc={deleteOptionPart}
          />
        )}
        {!isTotal && (
          <UpdateDatas buttonFunc={addOptionPart} mainFolder={mainFolder} />
        )}
      </Col>
    </Row>
  );
};
