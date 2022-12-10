import { useCallback, useReducer, useState } from "react";
import { AlertProps, alertReducer, initialState } from "./alertReducer";
import type { OperateIpc, IpcStatus, ReturnOperateIpc } from "../schema/ipc";

export type ReturnUseOperateIpc = {
  result: any;
  ipcStatus: IpcStatus;
  setIpcStatus: React.Dispatch<React.SetStateAction<IpcStatus>>;
  alert: AlertProps;
  operateIpc: ({ ipc, method, arg }: OperateIpc) => Promise<ReturnOperateIpc>;
};

export const useOperateIpc = (): ReturnUseOperateIpc => {
  const [ipcStatus, setIpcStatus] = useState<IpcStatus>("stop");

  //TODO returnの型をしぼる
  const [result, setResult] = useState<any>("");
  const [alert, dispatch] = useReducer(alertReducer, initialState);

  const operateIpc = useCallback(({ ipc, method, arg }: OperateIpc) => {
    const fetch = async (): Promise<ReturnOperateIpc> => {
      setIpcStatus("progress");
      dispatch({
        type: ipc,
        payload: { method: method, status: "progress" },
      });

      const res =
        ipc === "store"
          ? await window.storeApi.operateStore({ method, arg })
          : ipc === "operateFastApi"
          ? await window.fastApi.operateFastApi({ method, arg })
          : ipc === "operateShowOpen"
          ? await window.electronApi.operateShowOpen({ method, arg })
          : ipc === "operateShowSave"
          ? await window.electronApi.operateShowSave({ method, arg })
          : { status: "error", response: "Not exist API" };

      if (res.status) {
        setIpcStatus("success");
        setResult(res.response);

        dispatch({
          type: ipc,
          payload: { method: method, status: "success" },
        });
        return { status: true, response: res.response };
      } else {
        setIpcStatus("error");
        setResult(res.response);

        dispatch({
          type: ipc,
          payload: {
            method: method,
            status: "error",
            message: res.response as string,
          },
        });
        return { status: false, response: res.response };
      }
    };
    return fetch();
  }, []);

  return { result, ipcStatus, setIpcStatus, alert, operateIpc };
};
