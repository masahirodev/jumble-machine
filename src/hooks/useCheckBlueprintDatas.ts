import { useEffect } from "react";
import { BlueprintData } from "../schema/blueprintData";
import { useComment } from "./useComment";

type Props = {
  blueprintDatas?: BlueprintData[];
  hasBlueprint?: boolean;
};

export const useCheckBlueprintDatas = ({
  blueprintDatas,
  hasBlueprint,
}: Props) => {
  //コメント
  const { selectSetComment } = useComment();
  useEffect(() => {
    if (
      (blueprintDatas !== undefined && blueprintDatas[0]["id"] === -1) ||
      (hasBlueprint !== undefined && hasBlueprint === false)
    ) {
      selectSetComment("noBlueprintDatas");
    }
  }, [blueprintDatas, hasBlueprint, selectSetComment]);
};
