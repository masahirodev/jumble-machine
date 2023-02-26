import { useContext } from "react";

import { IntricateContext } from "../intricate/IntricateContext";
import type { IntricateDataType } from "../../schema/intricate";
import { useOperateIpc } from "../../hooks/useOperateIpc";
import { checkConfirmation } from "../../hooks/checkConfirmation";

import Button from "react-bootstrap/Button";
import { useComment } from "../../hooks/useComment";

type Props = {};

export type FolderContents = {
  path: string;
  pathList: { [key: string]: string[] };
};

export const LoadIntricateData: React.FC<Props> = () => {
  const { projectId, setIntricateDatas } = useContext(IntricateContext);
  const { operateIpc } = useOperateIpc();
  const { selectSetComment } = useComment();
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
      selectSetComment("intricateImportDatas");
    }
  };

  return (
    <>
      <Button
        className={"me-3"}
        onClick={() => {
          readParts();
        }}
        onMouseEnter={() => selectSetComment("intricateImportButton")}
      >
        パーツを読み込む
      </Button>
    </>
  );
};
