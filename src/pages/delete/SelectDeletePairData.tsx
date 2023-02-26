import { useContext, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { DeletePairData } from "../../schema/deleteData";
import { DeleteContext, DeleteData } from "./DeleteContext";

type Props = {
  deletePairData: DeletePairData;
  setDeletePairData: React.Dispatch<React.SetStateAction<DeletePairData>>;
  i: 1 | 2;
};

export const SeletcDeletePairDatas: React.FC<Props> = ({
  deletePairData,
  setDeletePairData,
  i,
}) => {
  const { exDatas, bundleSubDatas } = useContext(DeleteContext);

  const init = "選択する";

  const [selectDeleteDatas, setSelectDeleteDatas] = useState<DeleteData[]>();

  const selectAttribute = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectDeleteDatas = bundleSubDatas.filter((bundleSubData) => {
      return bundleSubData.attribute === e.target.value;
    });
    setSelectDeleteDatas(selectDeleteDatas);
    setDeletePairData({
      ...deletePairData,
      ...{ ["attribute" + i]: e.target.value },
    });
  };

  const selectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeletePairData({
      ...deletePairData,
      ...{ ["value" + i]: e.target.value },
    });
  };

  return (
    <>
      <Col className="col-3">
        <Form.Select onChange={selectAttribute}>
          <option>{init}</option>
          {exDatas.map((attribute, i) => (
            <option key={i}>{attribute}</option>
          ))}
        </Form.Select>
      </Col>
      <Col className="col-3">
        <Form.Select
          onChange={selectValue}
          disabled={selectDeleteDatas === undefined}
        >
          <option>{init}</option>
          {selectDeleteDatas &&
            selectDeleteDatas.map((selectDeleteData, i) => (
              <option key={i}>{selectDeleteData.value}</option>
            ))}
        </Form.Select>
      </Col>
    </>
  );
};
