import { ReactNode } from "react";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom";
import { Data } from "../schema/data";
import { IntricateDataType } from "../schema/intricate";

type Props = {
  datas: IntricateDataType[] | Data[];
  Sidebar: ReactNode;
};

export const SubLayout: React.FC<Props> = ({ datas, Sidebar }) => {
  return (
    <>
      {datas !== undefined && (
        <>
          <Col
            className="col-2"
            style={{
              background: "#b2cbe4",
              overflowY: "auto",
              maxHeight: `calc(100vh - 48px - 15vh)`,
            }}
          >
            {Sidebar}
          </Col>
          <Col
            style={{
              background: "#E6F7FF",
              flex: "1",
              overflowY: "auto",
              maxHeight: `calc(100vh - 48px - 15vh)`,
            }}
          >
            <Outlet />
          </Col>
        </>
      )}
    </>
  );
};
