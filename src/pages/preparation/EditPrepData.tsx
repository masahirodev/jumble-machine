import { initPrepData, PrepData } from "../../schema/prepData";
import { useHandleForm } from "../../hooks/useHandleForm";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

type Props = {
  prepData: PrepData;
  setPrepData: React.Dispatch<React.SetStateAction<PrepData>>;
  setComment: React.Dispatch<React.SetStateAction<string | string[]>>;
  maxQuantity: number;
};

export const EditPrepData: React.FC<Props> = ({
  prepData,
  setPrepData,
  setComment,
  maxQuantity,
}) => {
  //フォーム
  const { handleEditData } = useHandleForm<PrepData>({
    updateDatas: prepData,
    setUpdateDatas: setPrepData,
  });

  //TODO コメント
  const selectComment = (value: string) => {
    switch (value) {
      case "quantity":
        setComment([
          "quantityには、ジェネラティブして出力するデータの数を入力してね。",
          "※必ずパーツの組合せ総数よりも少なくなるように設定してね。",
        ]);
        break;
      case "name":
        setComment(["nameには、NFTの名前を入力してね。自動的に連番になるよ。"]);
        break;
      case "description":
        setComment(["descriptionには、NFTの説明を入力してね。"]);
        break;
      case "background_color":
        setComment([
          "OpenSeaにおけるNFTの背景色を入力してね。先頭に#を付けない6文字の16進数で記入する必要があるよ。",
        ]);
        break;
      case "image":
        setComment([
          "imageには、NFTの画像のURLを入力してね。",
          "ここは、再度一括で設定できる画面があるから、後から設定することをお勧めするよ。",
        ]);
        break;
      case "animation_url":
        setComment([
          "animation_urlには、 GLTF、GLB、WEBM、MP4、M4V、OGVなどのマルチメディアのURLを入力してね。",
          "ここは、再度一括で設定できる画面があるから、後から設定することをお勧めするよ。",
        ]);
        break;
      case "external_url":
        setComment([
          "external_urlには、OpenSeaにおける画像の下に外部のURLを表示したいときに、URLを入力してね。",
        ]);
        break;
      case "youtube_url":
        setComment(["youtube_urlには、YouTube 動画への URLを入力してね。"]);
        break;
      default:
    }
  };

  return (
    <>
      <Container>
        {Object.keys(initPrepData).map((value) => {
          return (
            <Form
              key={value}
              className="align-items-center"
              onMouseEnter={() => selectComment(value)}
            >
              <Form.Group as={Row} className="m-2">
                <Form.Label column className="col-4">
                  {value}
                </Form.Label>
                <Col className="col-8">
                  {value === "quantity" ? (
                    <Form.Control
                      type={"number"}
                      name={value}
                      onChange={handleEditData}
                      value={prepData[value]}
                      max={maxQuantity}
                      min={1}
                    />
                  ) : value === "description" ? (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name={value}
                      onChange={handleEditData}
                      value={prepData[value]}
                    />
                  ) : (
                    <Form.Control
                      type={"string"}
                      name={value}
                      onChange={handleEditData}
                      value={prepData[value]}
                    />
                  )}
                </Col>
              </Form.Group>
            </Form>
          );
        })}
      </Container>
    </>
  );
};
