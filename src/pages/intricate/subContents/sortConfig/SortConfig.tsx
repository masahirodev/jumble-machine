import { useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Contents } from "./Contents";
import { CardHeader } from "./CardHeader";
import Container from "react-bootstrap/Container";
import { IntricateContext } from "../../IntricateContext";

export type Sample = {
  folder: string;
  file: string;
}[];

export const SortConfig: React.FC = () => {
  const { intricateDatas } = useContext(IntricateContext);

  return (
    <>
      {intricateDatas !== undefined && (
        <Container className="p-3">
          <CardHeader />
          <DndProvider backend={HTML5Backend}>
            <Contents />
          </DndProvider>
        </Container>
      )}
    </>
  );
};
