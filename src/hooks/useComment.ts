import { atom, useRecoilState } from "recoil";
import { commentLists } from "../utils/commentLists";
import { RECOIL_KEYS } from "../utils/recoilKey";

export type CommentList = typeof commentLists[number]["target"];

const commentState = atom<string | string[]>({
  key: RECOIL_KEYS.COMMENT_STATE,
  default: "・・・",
});

export const useComment = () => {
  const [comment, setComment] = useRecoilState(commentState);
  const selectSetComment = (target: string) => {
    const newComment = commentLists.filter(
      (commentList) => commentList.target === target
    )[0]?.comment;

    if (newComment !== undefined) {
      setComment(newComment);
    } else {
      setComment("・・・");
    }
  };
  return { comment, setComment, selectSetComment };
};
