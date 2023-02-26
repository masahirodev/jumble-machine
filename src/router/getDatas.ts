import { BlueprintData, initBlueprintData } from "../schema/blueprintData";
import { DeleteDatas, initDeleteDatas } from "../schema/deleteData";
import { ExportData, initExportData } from "../schema/exportData";

export const initDatas: {
  [key: string]: DeleteDatas | BlueprintData[] | ExportData | number | string;
} = {
  blueprint: [initBlueprintData],
  deleteDatas: initDeleteDatas,
  export: initExportData,
  pagination: 100,
  exportPath: "",
};

type ReturnType<T> = [datas: T, projectId: number];

export const getDatas = async <T>(
  target: "deleteDatas" | "blueprint" | "export" | "pagination" | "exportPath"
): Promise<ReturnType<T>> => {
  const init = initDatas[target] as T;
  const projectId: number = await window.storeApi.getStoreValue(
    "config",
    "edit"
  );
  const datas: T | undefined = await window.storeApi.getStoreValue(
    String(projectId),
    target
  );
  return [datas !== undefined ? datas : init, projectId];
};
