import { ReactElement } from "react";
import { CommentHeader } from "./CommentHeader";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

type Props = {
  mainContents: ReactElement | undefined;
  buttonContents: ReactElement | undefined;
};

//TODOcontextベースになっているbuttonをどうしてもprops受けする必要がある
export const GlobalLayoutContext: React.FC<Props> = ({
  mainContents,
  buttonContents,
}) => {
  return (
    <>
      <Row
        style={{
          height: "15vh",
          display: "flex",
          flexDirection: "row",
          margin: "0",
          padding: "0",
        }}
      >
        <Col
          style={{
            alignItems: "center",
            flex: "1",
            display: "flex",
          }}
        >
          <CommentHeader />
        </Col>
        {buttonContents && (
          <Col
            className="col-4"
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Row>
              <Col>{buttonContents}</Col>
            </Row>
          </Col>
        )}
      </Row>
      {mainContents !== undefined && (
        <Row
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "row",
            margin: "0",
            padding: "0",
          }}
        >
          {mainContents}
        </Row>
      )}
    </>
  );
};
