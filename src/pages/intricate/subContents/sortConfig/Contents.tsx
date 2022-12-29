import update from "immutability-helper";
import { useCallback, useContext } from "react";
import { IntricateDataType } from "../../../../schema/intricate";
import { IntricateContext } from "../../IntricateContext";

import { Card } from "./Card";

export const Contents: React.FC = () => {
  const { intricateDatas, setIntricateDatas } = useContext(IntricateContext);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setIntricateDatas((prevCards: IntricateDataType[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as IntricateDataType],
          ],
        })
      );
    },
    [setIntricateDatas]
  );

  const renderCard = useCallback(
    (intricateData: IntricateDataType, index: number) => {
      return (
        <Card
          key={intricateData.id}
          index={index}
          data={intricateData}
          moveCard={moveCard}
        />
      );
    },
    [moveCard]
  );

  return (
    <>
      {intricateDatas.map((intricateData, i) => renderCard(intricateData, i))}
    </>
  );
};
