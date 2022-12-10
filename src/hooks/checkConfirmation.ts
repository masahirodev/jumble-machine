import { confirm } from "../components/Confirmation";

const confirmProps = {
  title: "既にデータがありますが、上書きをしますか？",
  confirmation: "",
  proceedLabel: "OK",
  proceedVariant: "primary",
  cancelLabel: "CANCEL",
  cancelVariant: "outline-secondary",
};

export const checkConfirmation = async (
  projectId: number,
  key: string,
  func: () => Promise<void>
) => {
  const fetch = await window.storeApi.operateStore({
    method: "has",
    arg: {
      name: String(projectId),
      key: key,
    },
  });

  if (fetch.response) {
    const isConfirmed = await confirm(confirmProps);
    if (isConfirmed) {
      func();
    } else {
    }
  } else {
    func();
  }
};
