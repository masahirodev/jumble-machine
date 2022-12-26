import { useLocation } from "react-router-dom";
import { DesignButton } from "../pages/design/DesignButton";
import { TopButton } from "../pages/top/TopButton";

//TODO GlobalLayoutと同様の問題で使用せず
export const ButtonHeader = () => {
  const location = useLocation();
  const path = location.pathname;

  switch (path) {
    case "/":
      return <TopButton />;
    case "/design":
      return <DesignButton />;
    default:
      return null;
  }
};
