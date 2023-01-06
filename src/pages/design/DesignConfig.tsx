import { useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Contents } from "./Contents";
import { DesignContext } from "./DesignContext";
import { CardHeader } from "./CardHeader";
import Container from "react-bootstrap/Container";

export type Sample = {
  folder: string;
  file: string;
}[];

export const DesignConfig: React.FC = () => {
  const { designDatas } = useContext(DesignContext);

  return (
    <>
      {designDatas !== undefined && (
        <div style={{ height: "80vh", overflowY: "scroll" }}>
          <CardHeader />
          <Container fluid className="px-5">
            <DndProvider backend={HTML5Backend}>
              <Contents />
            </DndProvider>
          </Container>
        </div>
      )}
    </>
  );
};
