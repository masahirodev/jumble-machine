import { useContext } from "react";

import { IntricateContext } from "../intricate/IntricateContext";
import type { IntricateDataType } from "../../schema/intricate";
import Button from "react-bootstrap/Button";
import { useOperateIpc } from "../../hooks/useOperateIpc";
import { checkConfirmation } from "../../hooks/checkConfirmation";

type Props = {};

export type FolderContents = {
  path: string;
  pathList: { [key: string]: string[] };
};

export const LoadIntricateData: React.FC<Props> = () => {
  const { projectId, setIntricateDatas, setComment } =
    useContext(IntricateContext);
  const { operateIpc } = useOperateIpc();

  const readParts = () => {
    checkConfirmation(projectId, "intricateDatas", () => getFolderContents());
  };

  //パーツデータの読み込み
  const getFolderContents = async () => {
    const fetch = (await operateIpc({
      ipc: "operateShowOpen",
      method: "getFolderContents",
      arg: {},
    })) as { status: boolean; response: FolderContents };

    if (fetch.status) {
      const path = fetch.response.path;
      await window.storeApi.setStoreValue(
        String(projectId),
        "importPath",
        path
      );

      const intricateDatas = Object.keys(fetch.response.pathList).map(
        (value, index) => {
          const intricateData: IntricateDataType = {
            id: index,
            folder: value,
            combi: "",
            fileDatas: fetch.response.pathList[value].map((value) => {
              return { name: value, option: 1 };
            }),
            pairing: "main",
          };
          return intricateData;
        }
      );
      await window.storeApi.setStoreValue(
        String(projectId),
        "intricateDatas",
        intricateDatas
      );

      setIntricateDatas(intricateDatas);
      setComment("次は、ジェネラティブの設定を行っていこう！");
    }
  };

  return (
    <>
      <Button
        className={"me-3"}
        onClick={() => {
          readParts();
        }}
        onMouseEnter={() =>
          setComment([
            "このボタンを押すと、読み込むパーツを変更することが出来るよ。",
            "ただし、データが上書きになってしまうので注意してね。",
          ])
        }
      >
        パーツを読み込む
      </Button>
    </>
  );
};
