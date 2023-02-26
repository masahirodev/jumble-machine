import { useContext, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { HiPlusCircle } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";
import { DeletePairData, initDeletePairData } from "../../schema/deleteData";
import { CardStyle } from "../design/Card";
import { DeleteContext } from "./DeleteContext";
import { SeletcDeletePairDatas } from "./SelectDeletePairData";

export const DeletePairDatas = () => {
  const { deletePairDatas } = useContext(DeleteContext);

  const [deletePairData, setDeletePairData] =
    useState<DeletePairData>(initDeletePairData);

  /////////////////////////
  const updateOptionPart = "";
  const funcOptionParts = (updateOptionPart: any) => {};

  return (
    <>
      <Container className="py-3">
        <Container>
          {deletePairDatas[0]["attribute1"] === "aaa" && (
            <Row
              style={{ ...CardStyle, display: "flex", alignItems: "center" }}
            >
              {deletePairDatas.map((deletePairData, index) => {
                return (
                  <Row
                    key={index}
                    className="m-0 p-0"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col className="col-11">
                      <Row>
                        {Object.keys(deletePairData).map((key, i) => {
                          return (
                            <Col
                              className="col-3"
                              style={{ textAlign: "center" }}
                              key={i}
                            >
                              {deletePairData[key]}
                            </Col>
                          );
                        })}
                      </Row>
                    </Col>
                    <Col
                      className="col-1"
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        placeItems: "center",
                      }}
                    >
                      <TiDelete
                        size={36}
                        color={"#dc3545"}
                        onClick={() => funcOptionParts(updateOptionPart)}
                      />
                    </Col>
                  </Row>
                );
              })}
            </Row>
          )}
          <Row style={{ ...CardStyle, display: "flex", alignItems: "center" }}>
            <Col className="col-11">
              <Row>
                <SeletcDeletePairDatas
                  deletePairData={deletePairData}
                  setDeletePairData={setDeletePairData}
                  i={1}
                />
                <SeletcDeletePairDatas
                  deletePairData={deletePairData}
                  setDeletePairData={setDeletePairData}
                  i={2}
                />
              </Row>
            </Col>
            <Col
              className="col-1"
              style={{
                display: "grid",
                justifyContent: "center",
                placeItems: "center",
              }}
            >
              <HiPlusCircle
                size={30}
                color={"#198754"}
                onClick={() => funcOptionParts(updateOptionPart)}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};
