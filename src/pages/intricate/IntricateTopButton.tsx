import Button from "react-bootstrap/Button";
import { LoadIntricateData } from "./LoadIntricateData";
import { useContext, useState } from "react";
import { IntricateContext } from "./IntricateContext";
import { useOperateIpc } from "../../hooks/useOperateIpc";
import { linkTo } from "../../hooks/linkTo";
import { Sample } from "../../schema/intricate";
import { SampleModal } from "../design/SampleModal";

export const IntricateTopButton: React.FC = () => {
  const { intricateDatas, projectId, sampleData, setComment } =
    useContext(IntricateContext);
  const { setIpcStatus, operateIpc } = useOperateIpc();

  //サンプルのモーダル機能
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>("");

  //サンプル機能
  const sampleFunc = async () => {
    const sampleFile = intricateDatas.map((intricateData) => {
      const targetFolder =
        intricateData.combi !== "" ? intricateData.combi : intricateData.folder;
      const targetId = intricateDatas.filter(
        (intricateData) => intricateData.folder === targetFolder
      )[0].id;
      if (sampleData[targetId] !== undefined && sampleData[targetId] !== "") {
        return sampleData[targetId];
      } else {
        return intricateDatas.filter(
          (intricateData) => intricateData.id === targetId
        )[0].fileDatas[0].name;
      }
    });
    const sample: Sample = intricateDatas.map((intricateData, index) => {
      return { folder: intricateData.folder, file: sampleFile[index] };
    });
    const fetch = await operateIpc({
      ipc: "store",
      method: "set",
      arg: {
        name: String(projectId),
        key: "sample",
        value: sample,
      },
    });
    if (fetch.status) {
      const fetch = await operateIpc({
        ipc: "operateFastApi",
        method: "makeSample",
        arg: {
          projectId: projectId,
        },
      });
      if (fetch.status) {
        const imagePath = fetch.response as string;
        setImagePath(imagePath);
        setModalShow(true);
        setIpcStatus("stop");
      }
    }
  };

  //データを保存する
  const saveData = async () => {
    await operateIpc({
      ipc: "store",
      method: "set",
      arg: {
        name: String(projectId),
        key: "intricateDatas",
        value: intricateDatas,
      },
    });
    await operateIpc({
      ipc: "store",
      method: "set",
      arg: {
        name: String(projectId),
        key: "maxQuantity",
        value: calculationMaxQuantity(),
      },
    });
  };

  //組合せ総数の計算
  const calculationMaxQuantity = () => {
    const maxQuantity = intricateDatas
      .map((intricateData) => {
        return intricateData.combi === "" ? intricateData.fileDatas.length : 1;
      })
      .reduce((result, value) => {
        return result * value;
      }, 1);
    return maxQuantity;
  };

  //次へ
  const next = async (e: React.MouseEvent<HTMLButtonElement>) => {
    saveData();
    linkTo("prep");
  };

  return (
    <>
      <LoadIntricateData />
      {intricateDatas !== undefined && (
        <>
          <Button
            variant="success"
            type="button"
            onClick={sampleFunc}
            className={"me-3"}
            onMouseEnter={() =>
              setComment([
                "このボタンを押すと、ジェネラティブしたときのサンプルを表示させることが出来るよ。",
                "どの組み合わせ・どの順番でジェネラティブするかは、下の表で設定してね。",
              ])
            }
          >
            サンプル
          </Button>
          <Button
            variant="success"
            type="button"
            onClick={saveData}
            className={"me-3"}
            onMouseEnter={() =>
              setComment([
                "編集が終わったら、必ず保存ボタンを押してね。",
                "今は、あえて、自動保存には対応してないんだ。",
              ])
            }
          >
            データを保存
          </Button>
          <Button
            onClick={next}
            onMouseEnter={() =>
              setComment([
                "ジェネラティブの設定が終わったら、次へを押してね。",
                "次へを押すと、ここで設定したデータが保存されて、次のステップに進むよ。",
              ])
            }
          >
            次へ
          </Button>
        </>
      )}
      <SampleModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        image={imagePath}
      />
    </>
  );
};
