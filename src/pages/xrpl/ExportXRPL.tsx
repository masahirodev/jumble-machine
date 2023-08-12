import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import { ExportXRPLImage } from "./ExportXRPLImage";
import { Step } from "../../components/Step";
import { SaveImage, serverSets } from "./ExportXRPLSaveImage";
import { ExportMetadata } from "./ExportXRPLMetadata";
import {
  initExportData,
  ExportData,
  CollectionData,
  initCollectionData,
} from "../../schema/exportData";
import { GlobalAlert } from "../../components/GlobalAlert";
import { useOperateIpc } from "../../hooks/useOperateIpc";
import { useHandleForm } from "../../hooks/useHandleForm";

import Container from "react-bootstrap/Container";
import { useCheckBlueprintDatas } from "../../hooks/useCheckBlueprintDatas";

export const Export: React.FC = () => {
  const { savedExportData, projectId, hasBlueprint, savedCollectionData } =
    useLoaderData() as {
      savedExportData: ExportData;
      projectId: number;
      hasBlueprint: boolean;
      savedCollectionData: CollectionData;
    };

  const [exportData, setExportData] = useState<ExportData>(
    savedExportData !== undefined ? savedExportData : initExportData
  );

  const { ipcStatus, setIpcStatus, alert, operateIpc } = useOperateIpc();

  //データを保存する
  const saveData = async () => {
    await operateIpc({
      ipc: "store",
      method: "set",
      arg: { name: String(projectId), key: "export", value: exportData },
    });
  };

  const { handleEditData, handleSelectData, handleCheckData, handleSetData } =
    useHandleForm<ExportData>({
      updateDatas: exportData,
      setUpdateDatas: setExportData,
    });

  //画像データ整理
  const adjustImage = async () => {
    const fetch = await operateIpc({
      ipc: "operateShowOpen",
      method: "getFolder",
      arg: {},
    });

    if (fetch.status) {
      const fetchIpc = await operateIpc({
        ipc: "operateFastApi",
        method: "adjustImage",
        arg: {
          projectId: projectId,
          name: exportData.name,
          // tokenId: exportData.startTokenId,
          tokenId: 1,
          exportPath: fetch.response as string,
        },
      });
      if (fetchIpc.status) {
        handleSetData<number>("step", 2);
        saveData();
      }
    }
  };

  //パス取得
  const path = (server: string, hash: string, name: string) => {
    return (
      serverSets.filter((serverSets) => serverSets.name === server)[0].domain +
      hash +
      "/" +
      name
    );
  };

  //メタデータ修正
  const saveImage = async () => {
    const fetch = await operateIpc({
      ipc: "operateFastApi",
      method: "saveImage",
      arg: {
        projectId: projectId,
        img: exportData.img,
        imgPath: path(
          exportData.imgServer,
          exportData.imgHash,
          exportData.name
        ),
        ani: exportData.ani,
        aniPath: path(
          exportData.aniServer,
          exportData.aniHash,
          exportData.name
        ),
      },
    });
    if (fetch.status) {
      handleSetData<number>("step", 3);
      saveData();
    }
  };

  useCheckBlueprintDatas({ hasBlueprint });

  // collection data
  const [collectionData, setCollectionData] = useState<CollectionData>(
    savedCollectionData !== undefined ? savedCollectionData : initCollectionData
  );

  //データを保存する
  const saveCollectionData = async () => {
    await operateIpc({
      ipc: "store",
      method: "set",
      arg: {
        name: String(projectId),
        key: "collection",
        value: collectionData,
      },
    });
  };

  return (
    <>
      {hasBlueprint && (
        <Container className="px-5">
          <Container>
            <Step
              title={"Step1.画像データを整理する"}
              children={<ExportXRPLImage adjustImage={adjustImage} />}
              color={exportData.step === 1 ? "#0d6efd" : ""}
              size={"min"}
            />
          </Container>
          <Container className="py-3">
            <Step
              title={"Step2.サーバーにデータを保存する"}
              children={
                <SaveImage
                  handleEditData={handleEditData}
                  handleSelectData={handleSelectData}
                  handleCheckData={handleCheckData}
                  exportData={exportData}
                  saveImage={saveImage}
                />
              }
              color={exportData.step === 2 ? "#0d6efd" : ""}
              size={"min"}
            />
          </Container>
          <Container>
            <Step
              title={"Step3.メタデータを出力する"}
              children={
                <ExportMetadata
                  projectId={projectId}
                  setCollectionData={setCollectionData}
                  collectionData={collectionData}
                  saveCollectionData={saveCollectionData}
                />
              }
              color={exportData.step === 3 ? "#0d6efd" : ""}
              size={"min"}
            />
          </Container>
        </Container>
      )}
      <GlobalAlert
        ipcStatus={ipcStatus}
        setIpcStatus={setIpcStatus}
        alert={alert}
      />
    </>
  );
};
