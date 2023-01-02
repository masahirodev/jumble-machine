import { useContext } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { FileData, IntricateDataType } from "../../../../schema/intricate";
import { IntricateContext } from "../../IntricateContext";

type Props = {
  data: IntricateDataType;
};

export const CardData: React.FC<Props> = ({ data }) => {
  const { sampleData, setSampleData } = useContext(IntricateContext);

  //ラジオボタンの機能
  const radio = (name: string) => {
    sampleData[data.id] = name;
    setSampleData(sampleData);
  };

  const Contents = ({ fileData }: { fileData: FileData }) => {
    return (
      <InputGroup>
        <InputGroup.Checkbox
          onChange={() => radio(fileData.name)}
          label={fileData.name}
          name={String(data.id)}
          type="radio"
          id={`inline-radio-${data.id}`}
          defaultChecked={sampleData[data.id] === fileData.name}
        />
        <InputGroup.Text className="col-10">{fileData.name}</InputGroup.Text>
      </InputGroup>
    );
  };

  return (
    <>
      <Col
        className="col-1"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {data.pairing}
      </Col>
      <Col
        className="col-3"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {data.folder}
      </Col>
      <Col
        className="col-7"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Row>
          {data.combi !== "" ? (
            <>{data.combi}とペアリングしています</>
          ) : (
            <>
              {data.fileDatas.map((fileData, index) => (
                <Col className="col-6" key={index}>
                  {index % 2 === 0 ? (
                    <Contents fileData={fileData} />
                  ) : (
                    <Contents fileData={fileData} />
                  )}
                </Col>
              ))}
              {data.pairing === "option" && (
                <Col className="col-6">
                  <Contents fileData={{ name: "なし", option: 0 }} />
                </Col>
              )}
            </>
          )}
        </Row>
      </Col>
    </>
  );
};
