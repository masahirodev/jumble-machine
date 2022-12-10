import { Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

type AlertProps = {
  alertText: string;
  alertShow: boolean;
  setAlertShow: React.Dispatch<React.SetStateAction<boolean>>;
  variant: string;
};

export const AlertModal: React.FC<AlertProps> = ({
  alertText,
  alertShow,
  setAlertShow,
  variant,
}) => {
  const handleClose = () => setAlertShow(false);
  return (
    <Modal show={alertShow} onHide={handleClose} centered>
      <Alert variant={variant} style={{ margin: 0 }}>
        {alertText}
      </Alert>
    </Modal>
  );
};
