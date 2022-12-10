import type { OperateIpc, IpcStatus } from "../schema/ipc";

export type Actions = {
  type: OperateIpc["ipc"] | "web3";
  payload: {
    method: OperateIpc["method"] | "login" | "preopen";
    status: IpcStatus;
    message?: string | undefined;
  };
};

export type AlertProps = {
  text: string;
  variant: string;
};

export const initialState: AlertProps = {
  text: "・・・",
  variant: "primary",
};

//TODO 全体的に整備が必要。useReducerにすべきではない？
const ipcAlertTexts = {
  init: {
    progress: "実行中",
    success: "完了",
    error: "エラーが発生",
    stop: "",
  },
  login: {
    progress: "メンバーシップが有効か確認しています。",
    success: "ウェルカムトゥメンバーシップ！！！",
    error: "エラーが発生しています。",
    stop: "",
  },
  jumble: {
    progress: "画像合成をしています",
    success: "画像合成が完了しました",
    error: "エラーが発生しています。",
    stop: "",
  },
  set: {
    progress: "データを保存しています",
    success: "保存が完了しました",
    error: "エラーが発生しています。",
    stop: "",
  },
  preopen: {
    progress: "メンバーシップが有効か確認しています。",
    success: "ベータ版なのでメンバーシップは不要です。",
    error: "エラーが発生しています。",
    stop: "",
  },
};

const variants = {
  progress: "light",
  success: "success",
  error: "danger",
  stop: "light",
};

export const alertReducer = (
  alert = initialState,
  { type, payload }: Actions
) => {
  switch (payload.method) {
    case "login":
      return {
        ...alert,
        ...{
          text:
            payload.message !== undefined && payload.status === "error"
              ? payload.message
              : ipcAlertTexts[payload.method][payload.status],
          variant: variants[payload.status],
        },
      };

    case "preopen":
      return {
        ...alert,
        ...{
          text:
            payload.message !== undefined && payload.status === "error"
              ? payload.message
              : ipcAlertTexts[payload.method][payload.status],
          variant: variants[payload.status],
        },
      };

    case "jumble":
      return {
        ...alert,
        ...{
          text:
            payload.message !== undefined && payload.status === "error"
              ? payload.message
              : ipcAlertTexts[payload.method][payload.status],
          variant: variants[payload.status],
        },
      };

    case "set":
      return {
        ...alert,
        ...{
          text:
            payload.message !== undefined && payload.status === "error"
              ? payload.message
              : ipcAlertTexts[payload.method][payload.status],
          variant: variants[payload.status],
        },
      };

    default:
      return {
        ...alert,
        ...{
          text:
            payload.message !== undefined && payload.status === "error"
              ? payload.message
              : ipcAlertTexts["init"][payload.status],
          variant: variants[payload.status],
        },
      };
  }
};
