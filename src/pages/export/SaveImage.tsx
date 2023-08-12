import { ExportData } from "../../schema/exportData";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type Props = {
  handleEditData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  exportData: ExportData;
  handleSelectData: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCheckData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveImage: () => Promise<void>;
};

type Server = {
  name: string;
  uri: string;
  sample?: string;
  domain: string;
};

export const serverSets: Server[] = [
  {
    name: "arweave",
    uri: "dataTxID",
    domain: "ar://",
  },
  {
    name: "ipfs",
    uri: "CID",
    domain: "ipfs://",
  },
  {
    name: "その他",
    uri: "https://",
    domain: "https://",
  },
];

export const SaveImage: React.FC<Props> = ({
  handleEditData,
  exportData,
  handleSelectData,
  handleCheckData,
  saveImage,
}) => {
  return (
    <>
      <Row>
        <Form className="align-items-center">
          <Form.Group as={Row} className="m-2">
            <Form.Label column>
              ①まずは画像データをオンラインサーバーに保存しよう！{" ( "}
              <a
                href="https://eggdragons.com/web3storage-nftstorage/"
                target="_blank"
                rel="noreferrer"
              >
                IPFSへのアップロードの仕方
              </a>
              {" / "}
              <a
                href="https://eggdragons.com/ardrive-tokenuri/"
                target="_blank"
                rel="noreferrer"
              >
                ARWEAVEへのアップロードの仕方
              </a>
              {" ) "}
            </Form.Label>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Form className="align-items-center">
          <Form.Group as={Row} className="m-2">
            <Form.Label column>
              ②保存先のサーバーに合わせてメタデータを書き換えよう！（個別に書き換える場合は、「Blueprint」で行ってね！）
            </Form.Label>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Form className="align-items-center">
          <Form.Group as={Row} className="m-2">
            <Form.Label column className="col-2">
              <Form.Check
                type="checkbox"
                label={"image_url"}
                onChange={handleCheckData}
                checked={exportData.img}
                name={"img"}
              />
            </Form.Label>
            <Col className="col-2">
              <Form.Select
                onChange={handleSelectData}
                defaultValue={exportData.imgServer}
                name={"imgServer"}
              >
                {serverSets.map((serverSet) => (
                  <option key={serverSet.name}>{serverSet.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Form.Label column className="col-1">
              {
                serverSets.filter(
                  (serverSets) => serverSets.name === exportData.imgServer
                )[0].uri
              }
            </Form.Label>
            <Col className="col-3">
              <Form.Control
                type={"string"}
                name={"imgHash"}
                onChange={handleEditData}
                defaultValue={exportData.imgHash}
              />
            </Col>
            <Form.Label column className="col-3">
              {"⇒ "}
              {
                serverSets.filter(
                  (serverSets) => serverSets.name === exportData.imgServer
                )[0].domain
              }
              {exportData.imgHash}/{exportData.name}
              {exportData.startTokenId}.png
            </Form.Label>
            <Col></Col>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Form className="align-items-center">
          <Form.Group as={Row} className="m-2">
            <Form.Label column className="col-2">
              <Form.Check
                type="checkbox"
                label={"animation_url"}
                onChange={handleCheckData}
                checked={exportData.ani}
                name={"ani"}
              />
            </Form.Label>
            <Col className="col-2">
              <Form.Select
                onChange={handleSelectData}
                defaultValue={exportData.aniServer}
                name={"aniServer"}
              >
                {serverSets.map((serverSet) => (
                  <option key={serverSet.name}>{serverSet.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Form.Label column className="col-1">
              {
                serverSets.filter(
                  (serverSets) => serverSets.name === exportData.aniServer
                )[0].uri
              }
            </Form.Label>
            <Col className="col-3">
              <Form.Control
                type={"string"}
                name={"aniHash"}
                onChange={handleEditData}
                defaultValue={exportData.aniHash}
              />
            </Col>
            <Form.Label column className="col-3">
              {"⇒ "}
              {
                serverSets.filter(
                  (serverSets) => serverSets.name === exportData.aniServer
                )[0].domain
              }
              {exportData.aniHash}/{exportData.name}
              {exportData.startTokenId}.png
            </Form.Label>
            <Col>
              <Button onClick={saveImage}>実行</Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </>
  );
};
