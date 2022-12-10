import type { OperateIpc, ReturnOperateIpc } from "../schema/ipc";

export declare global {
  interface Window {
    storeApi: {
      getStoreValue: (
        name: string,
        key: string | []
      ) => ConfigDatas | undefined | any;
      setStoreValue: (name: string, key: string, value: any) => void;
      hasStoreValue: (name: string, key: string) => boolean;
      operateStore: ({
        method,
        arg,
      }: Omit<
        Extract<OperateIpc, { ipc: "store" }>,
        "ipc"
      >) => ReturnOperateIpc;
    };
    fastApi: {
      operateFastApi: ({
        method,
        arg,
      }: Omit<
        Extract<OperateIpc, { ipc: "operateFastApi" }>,
        "ipc"
      >) => ReturnOperateIpc;
    };

    electronApi: {
      operateShowSave: ({
        method,
        arg,
      }: Omit<
        Extract<OperateIpc, { ipc: "operateShowSave" }>,
        "ipc"
      >) => ReturnOperateIpc;
      operateShowOpen: ({
        method,
        arg,
      }: Omit<
        Extract<OperateIpc, { ipc: "operateShowOpen" }>,
        "ipc"
      >) => ReturnOperateIpc;
    };
  }
}
