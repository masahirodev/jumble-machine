import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useComment } from "../hooks/useComment";
import { SpeechBalloons } from "./SpeechBalloons";

export const CommentHeader = () => {
  const { comment, selectSetComment } = useComment();
  const location = useLocation();

  useEffect(() => {
    selectSetComment(location.pathname);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <SpeechBalloons comment={comment} />
    </>
  );
};
