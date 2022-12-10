import { useContext, useEffect, useState } from "react";
import { BlueprintContext } from "./BlueprintContext";
import { useDatasPerPage } from "../../hooks/useDatasPerPage";
import { SelectPerPage } from "./SelectPerPage";

import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const PaginationComponents = () => {
  const {
    blueprintDatas,
    setBlueprintDatas,
    NumberDataPerPage,
    totalData,
    setTotalData,
    page,
    setPage,
    projectId,
  } = useContext(BlueprintContext);

  const pageList = [];
  for (let i = 1; i <= Math.ceil(totalData / NumberDataPerPage); i++) {
    pageList.push(i);
  }

  const { data } = useDatasPerPage(projectId, NumberDataPerPage, page);

  useEffect(() => {
    if (data !== undefined) {
      setBlueprintDatas(data);
      setCurrentPerPage(data.length);
    }
  }, [data, setBlueprintDatas]);

  const ChangePage = (selectPage: number) => {
    setTotalData(totalData - currentPerPage + blueprintDatas.length);
    setPage(selectPage);
  };

  const [currentPerPage, setCurrentPerPage] = useState<number>(
    data !== undefined ? data.length : 0
  );

  return (
    <>
      <Container
        fluid
        className="px-5 d-flex justify-content-center align-content-center"
        style={{ height: "5vh" }}
      >
        <Row style={{ display: "contents" }}>
          <Col className={"col-3 align-self-center"}>
            <Row className={"align-items-center"} style={{ color: "#0d6efd" }}>
              Total Item:
              {totalData - currentPerPage + blueprintDatas.length}
            </Row>
          </Col>

          <Col className={"col-6 align-self-center"}>
            <Pagination className="my-2 justify-content-center">
              <Pagination.First onClick={() => ChangePage(1)} />
              <Pagination.Prev
                onClick={() => ChangePage(Math.max(page - 1, 1))}
              />
              <Pagination.Ellipsis />

              {[-2, -1, 0, 1, 2].map((v) => {
                return (
                  page + v >= 1 &&
                  page + v <= pageList.length && (
                    <Pagination.Item
                      key={`page${v}`}
                      active={v === 0}
                      onClick={() => ChangePage(page + v)}
                    >
                      {page + v}
                    </Pagination.Item>
                  )
                );
              })}

              <Pagination.Ellipsis />
              <Pagination.Next
                onClick={() => ChangePage(Math.min(page + 1, pageList.length))}
              />
              <Pagination.Last onClick={() => ChangePage(pageList.length)} />
            </Pagination>
          </Col>
          <Col className={"col-3 align-self-center"}>
            <SelectPerPage />
          </Col>
        </Row>
      </Container>
    </>
  );
};
