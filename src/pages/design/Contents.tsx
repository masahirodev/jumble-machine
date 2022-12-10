import update from "immutability-helper";
import { useCallback, useContext } from "react";
import type { DesignDataType } from "../../schema/design";

import { Card } from "./Card";
import { DesignContext } from "./DesignContext";

export const Contents: React.FC = () => {
  const { designDatas, setDesignDatas } = useContext(DesignContext);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setDesignDatas((prevCards: DesignDataType[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as DesignDataType],
          ],
        })
      );
    },
    [setDesignDatas]
  );

  const renderCard = useCallback(
    (designData: DesignDataType, index: number) => {
      return (
        <Card
          key={designData.id}
          index={index}
          data={designData}
          moveCard={moveCard}
        />
      );
    },
    [moveCard]
  );

  return <>{designDatas.map((designData, i) => renderCard(designData, i))}</>;
};
