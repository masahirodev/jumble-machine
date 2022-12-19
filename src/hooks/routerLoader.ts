import { ConfigDatas } from "../schema/config";
import { Data } from "../schema/data";
import { DesignDataType } from "../schema/design";
import { ExportData } from "../schema/exportData";
import { PrepData } from "../schema/prepData";

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

  return [prepData, maxQuantity !== undefined ? maxQuantity : 1, projectId];
};

export const blueprintLoader = async () => {
  const projectId: number = await window.storeApi.getStoreValue(
    "config",
    "edit"
  );
  const preData: Data[] | undefined = await window.storeApi.getStoreValue(
    String(projectId),
    "blueprint"
  );

  const totalData = preData === undefined ? 1 : preData.length;

  const userNumberDataPerPage: number | undefined =
    await window.storeApi.getStoreValue(String(projectId), "pagination");

  const NumberDataPerPage =
    userNumberDataPerPage === undefined ? 100 : userNumberDataPerPage;

  const data: Data[] | undefined =
    preData === undefined
      ? undefined
      : preData.filter((value, index) => {
          return NumberDataPerPage > index; //value.id;
        });

  const exportPath: string | undefined = await window.storeApi.getStoreValue(
    String(projectId),
    "exportPath"
  );

  return [data, projectId, exportPath, NumberDataPerPage, totalData];
};

export const convertLoader = async () => {
  const projectId: number = await window.storeApi.getStoreValue(
    "config",
    "edit"
  );
  const data: Data[] | undefined = await window.storeApi.getStoreValue(
    String(projectId),
    "blueprint"
  );
  return [data, projectId];
};

export const exportLoader = async () => {
  const projectId: number = await window.storeApi.getStoreValue(
    "config",
    "edit"
  );
  const data: ExportData | undefined = await window.storeApi.getStoreValue(
    String(projectId),
    "export"
  );

  const check: boolean = await window.storeApi.hasStoreValue(
    String(projectId),
    "blueprint"
  );

  return [data, projectId, check];
};

export const importLoader = async () => {
  const projectId: number = await window.storeApi.getStoreValue(
    "config",
    "edit"
  );

  return [projectId];
};
