import { OptionPartsLayout } from "./OptionPartsLayout";
import type { OptionPart } from "../../../../schema/intricate";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

type Props = {
  optionParts: OptionPart[];
  buttonFunc: (updateOptionPart: OptionPart) => void;
};

export const SavedInDatas: React.FC<Props> = ({ optionParts, buttonFunc }) => {
  const optionPartsFolderList = optionParts.map((optionPart) => {
    return optionPart.folder;
  });
  const folderList = optionPartsFolderList.filter(
    (element, index) => optionPartsFolderList.indexOf(element) === index
  );

  return (
    <>
      {folderList.map((folder, index) => {
        return (
          <Row key={index} className="align-items-center my-3">
            <Col className="col-4">{folder}</Col>
            <Col className="col-8">
              <OptionPartsLayout
                optionParts={optionParts.filter((optionPart) => {
                  return optionPart.folder === folder;
                })}
                isUpdate={false}
                funcOptionParts={buttonFunc}
              />
            </Col>
          </Row>
        );
      })}
    </>
  );
};
