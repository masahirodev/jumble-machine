import { useNavigate } from "react-router-dom";

export const useReload = () => {
  //リロード
  const navigate = useNavigate();
  const refreshPage = () => {
    navigate(0);
  };

  return refreshPage;
};
