import { useContext } from "react";
import { BlueprintContext } from "./BlueprintContext";

import Modal from "react-bootstrap/Modal";
import { EditComponents } from "./EditComponents";

type Props = {
  show: boolean;
  onHide: () => void;
};

export const EditModal: React.FC<Props> = ({ show, onHide }) => {
  const { editData } = useContext(BlueprintContext);
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>ID No.{editData.id}を編集中</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditComponents onHide={onHide} />
      </Modal.Body>
    </Modal>
  );
};
