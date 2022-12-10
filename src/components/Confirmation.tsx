import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { confirmable, createConfirmation } from "react-confirm";

type Props = {
  title: string;
  confirmation: string;
  proceedLabel: string;
  proceedVariant: string;
  cancelLabel: string;
  cancelVariant: string;
};

type ConfirmationProps = Props & {
  show: boolean;
  proceed: (value: boolean) => void;
};

const Confirmation = ({
  title,
  confirmation,
  proceedLabel,
  proceedVariant,
  cancelLabel,
  cancelVariant,
  show,
  proceed,
}: ConfirmationProps) => {
  return (
    <Modal show={show} onHide={() => proceed(false)} centered>
      {title !== "" && (
        <Modal.Header
          closeButton
          style={{ borderBottom: confirmation !== "" ? "1" : "none" }}
        >
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      {confirmation !== "" && <Modal.Body>{confirmation}</Modal.Body>}
      <Modal.Footer
        style={{
          borderTop: confirmation !== "" && title !== "" ? "1" : "none",
        }}
      >
        <Button variant={cancelVariant} onClick={() => proceed(false)}>
          {cancelLabel}
        </Button>
        <Button
          variant={proceedVariant}
          style={{ marginLeft: "1rem" }}
          onClick={() => proceed(true)}
        >
          {proceedLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const confirm = (props: Props) => {
  return createConfirmation(confirmable(Confirmation))(props);
};
