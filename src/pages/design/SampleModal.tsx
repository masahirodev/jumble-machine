import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

type Props = {
  show: boolean;
  onHide: () => void;
  image: string;
};

export const SampleModal: React.FC<Props> = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">サンプル</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image
          src={"file:///" + props.image + `?${new Date().getTime()}`}
          width="100%"
          height="100%"
        ></Image>
      </Modal.Body>
    </Modal>
  );
};
