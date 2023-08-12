import { ConfigDatas } from "../schema/config";
import { BlueprintData } from "../schema/blueprintData";
import { DeleteDatas } from "../schema/deleteData";
import { DesignDataType } from "../schema/design";
import { ExportData } from "../schema/exportData";
import { PrepData } from "../schema/prepData";
import { getDatas } from "./getDatas";

//TODO ProjectIdは、Context統一後に移行。
//loader promise型になってないけど、この形が必須
export const topLoader = async () => {
  const projectLists: ConfigDatas | undefined =
    await window.storeApi.getStoreValue("config", []);
  return projectLists;
};

export const designLoader = async () => {
  const projectId: number = await window.storeApi.getStoreValue(
    "config",
    "edit"
  );
  const data: DesignDataType[] = await window.storeApi.getStoreValue(
    String(projectId),
    "designDatas"
  );
  return [data, projectId];
};

export const intricateLoader = async () => {
  const projectId: number = await window.storeApi.getStoreValue(
    "config",
    "edit"
  );
  const data: DesignDataType[] = await window.storeApi.getStoreValue(
    String(projectId),
    "intricateDatas"
  );
  return [data, projectId];
};

export const prepLoader = async () => {
  const projectId: number = await window.storeApi.getStoreValue(
    "config",
    "edit"
  );

  const prepData: PrepData | undefined = await window.storeApi.getStoreValue(
    String(projectId),
    "prep"
  );

  const maxQuantity: number | undefined = await window.storeApi.getStoreValue(
    String(projectId),
    "maxQuantity"
  );

  const hasIntricateDatas: boolean = await window.storeApi.hasStoreValue(
    String(projectId),
    "intricateDatas"
  );

  return [
    prepData,
    maxQuantity !== undefined ? maxQuantity : 1,
    projectId,
    hasIntricateDatas,
  ];
};

export const blueprintLoader = async () => {
  const [dbBlueprintDatas, projectId] = await getDatas<BlueprintData[]>(
    "blueprint"
  );
  const [userNumberDataPerPage] = await getDatas<BlueprintData[]>("pagination");
  const [exportPath] = await getDatas<BlueprintData[]>("exportPath");

  return {
    dbBlueprintDatas,
    projectId,
    userNumberDataPerPage,
    exportPath,
  };
};

export const convertLoader = async () => {
  const [blueprintDatas, projectId] = await getDatas<BlueprintData[]>(
    "blueprint"
  );
  return { blueprintDatas, projectId };
};

export const exportLoader = async () => {
  const [savedExportData, projectId] = await getDatas<ExportData>("export");

  const hasBlueprint: boolean = await window.storeApi.hasStoreValue(
    String(projectId),
    "blueprint"
  );

  return { savedExportData, projectId, hasBlueprint };
};

export const exportXRPLLoader = async () => {
  const [savedExportData, projectId] = await getDatas<ExportData>("export");
  const [savedCollectionData] = await getDatas<ExportData>("collection");

  const hasBlueprint: boolean = await window.storeApi.hasStoreValue(
    String(projectId),
    "blueprint"
  );

  return { savedExportData, projectId, hasBlueprint, savedCollectionData };
};

export const importLoader = async () => {
  const projectId: number = await window.storeApi.getStoreValue(
    "config",
    "edit"
  );

  return [projectId];
};

export const analysisLoader = async () => {
  const [blueprintDatas] = await getDatas<BlueprintData[]>("blueprint");
  return { blueprintDatas };
};

export const deleteLoader = async () => {
  const [blueprintDatas, projectId] = await getDatas<BlueprintData[]>(
    "blueprint"
  );
  const [deleteDatas] = await getDatas<DeleteDatas>("deleteDatas");

  return { blueprintDatas, deleteDatas, projectId };
};
