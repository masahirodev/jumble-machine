import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import type { Data } from "../../schema/data";
import type { OperateIpc, ReturnOperateIpc } from "../../schema/ipc";
import { useHandleForm } from "../../hooks/useHandleForm";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type Props = {
  setComment: React.Dispatch<React.SetStateAction<string | string[]>>;
  operateIpc: ({ ipc, method, arg }: OperateIpc) => Promise<ReturnOperateIpc>;
};

export type ConvertContents = {
  key: string;
  value: string;
  link: string;
  symbol: string;
};

type Convert = ConvertContents & { [key: string]: string };

const convertHeader: Convert = {
  key: "プロパティ名",
  value: "変更後の値",
  link: "リンクさせるプロパティ名",
  symbol: "リンクさせる独自の記号",
};

const initConvertDatas: Convert = {
  key: "name",
  value: "",
  link: "",
  symbol: "",
};

export const ConvertConfig: React.FC<Props> = ({ setComment, operateIpc }) => {
  const [data, projectId] = useLoaderData() as [Data[], number];

  const [convertDatas, setConvertDatas] = useState<Convert>(initConvertDatas);

  const { handleEditData, handleSelectData } = useHandleForm<Convert>({
    updateDatas: convertDatas,
    setUpdateDatas: setConvertDatas,
  });

  //コメント
  const selectComment = (value: string) => {
    switch (value) {
      case "key":
        setComment(["一括変換したいプロパティの名前を書いてね。"]);
        break;
      case "value":
        setComment(["一括変換後の値を書いてね。"]);
        break;
      case "link":
        setComment([
          "一括変換をする際に、リンクさせるプロパティを選択してね。",
        ]);
        break;
      case "symbol":
        setComment([
          "一括変換をする際に、リンクさせる独自の記号を書いてね。",
          "例えば、##idを独自の記号に設定して、変更後の値の中に##idを埋め込むと、その部分が選択したプロパティに変換されるよ。",
        ]);
        break;

      default:
    }
  };

  //プロパティリスト
  const main = data
    .map((data) => {
      return Object.keys(data);
    })
    .flat()
    .filter(function (x, i, self) {
      return self.indexOf(x) === i;
    })
    .filter((value) => {
      return value !== "subDatas";
    });

  const selectList = main.concat(
    data
      .map((data) => {
        return data.subDatas.map((subData) => subData.attribute);
      })
      .flat()
      .filter(function (x, i, self) {
        return self.indexOf(x) === i;
      })
  );

  //コンバート機能
  const convert = async () => {
    await operateIpc({
      ipc: "operateFastApi",
      method: "convert",
      arg: { projectId: projectId, ...convertDatas },
    });
  };

  return (
    <>
      <Container>
        {Object.keys(convertHeader).map((value) => {
          return (
            <Form
              key={value}
              className="align-items-center"
              onMouseEnter={() => selectComment(value)}
            >
              <Form.Group as={Row} className="m-2">
                <Form.Label column className="col-4">
                  {convertHeader[value]}
                </Form.Label>
                <Col className="col-8">
                  {value === "key" || value === "link" ? (
                    <Form.Select
                      onChange={handleSelectData}
                      defaultValue={convertDatas[value]}
                      name={value}
                    >
                      {value === "key" ? (
                        selectList
                          .filter((value) => {
                            return value !== "id";
                          })
                          .map((value) => <option key={value}>{value}</option>)
                      ) : (
                        <>
                          <option>必要に応じて選択してね</option>
                          {selectList.map((value) => (
                            <option key={value}>{value}</option>
                          ))}
                        </>
                      )}
                    </Form.Select>
                  ) : (
                    <Form.Control
                      type={"string"}
                      name={value}
                      onChange={handleEditData}
                      value={convertDatas[value]}
                    />
                  )}
                </Col>
              </Form.Group>
            </Form>
          );
        })}
        <Row className="m-2 py-2">
          {convertDatas.key !== "" && convertDatas.value !== "" && (
            <Col className="py-2 align-items-center">
              {convertDatas.symbol === "" ? (
                <>
                  ※{convertDatas.key}の値を、【{convertDatas.value}】
                  に一括変換するよ。
                </>
              ) : convertDatas.value.includes(convertDatas.symbol) ? (
                <>
                  ※仮に{convertDatas.link}の値が1234だとしたら、
                  {convertDatas.key}
                  の値を、【
                  {convertDatas.value.replace(convertDatas.symbol, "1234")}
                  】に一括変換するよ。
                </>
              ) : (
                <>※リンクさせる設定がうまいこと出来てないよ</>
              )}
            </Col>
          )}
        </Row>
        <Row className="m-2 py-2">
          <Col className="py-2 d-flex justify-content-end">
            <Button onClick={convert}>実行</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
