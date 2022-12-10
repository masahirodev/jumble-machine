import { useContext } from "react";

import { DesignContext } from "../design/DesignContext";
import type { DesignDataType } from "../../schema/design";
import Button from "react-bootstrap/Button";
import { useOperateIpc } from "../../hooks/useOperateIpc";

type Props = {
  setComment: React.Dispatch<React.SetStateAction<string | string[]>>;
};

export type FolderContents = {
  path: string;
  pathList: { [key: string]: string[] };
};

export const LoadDesignData: React.FC<Props> = ({ setComment }) => {
  const { projectId, setDesignDatas } = useContext(DesignContext);
  const { operateIpc } = useOperateIpc();

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

      const designDatas = Object.keys(fetch.response.pathList).map(
        (value, index) => {
          const designData: DesignDataType = {
            id: index,
            folder: value,
            combi: "",
            fileDatas: fetch.response.pathList[value].map((value) => {
              return { name: value, option: 1 };
            }),
          };
          return designData;
        }
      );
      await window.storeApi.setStoreValue(
        String(projectId),
        "designDatas",
        designDatas
      );
      setDesignDatas(designDatas);
      setComment("次は、ジェネラティブの設定を行っていこう！");
    }
  };

  return (
    <>
      <Button
        className={"me-3"}
        onClick={() => {
          getFolderContents();
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
