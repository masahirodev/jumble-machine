import { AlertProps } from "../hooks/alertReducer";
import type { IpcStatus } from "../schema/ipc";

import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

type Props = {
  ipcStatus: IpcStatus;
  setIpcStatus: React.Dispatch<React.SetStateAction<IpcStatus>>;
  alert: AlertProps;
};

export const GlobalAlert: React.FC<Props> = ({
  ipcStatus,
  setIpcStatus,
  alert,
}) => {
  const onHide = () => {
    if (ipcStatus !== "progress") {
      setIpcStatus("stop");
    }
  };
  return (
    <Modal show={ipcStatus !== "stop"} onHide={onHide} centered>
      <Alert
        variant={alert.variant}
        style={{ margin: 0 }}
        className={"d-flex align-items-center justify-content-center"}
      >
        <h2 className="m-0 me-3">{alert.text}</h2>
        {ipcStatus === "progress" && (
          <Spinner animation="border" variant="primary" />
        )}
      </Alert>
    </Modal>
  );
};
