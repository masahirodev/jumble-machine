import { useEffect, useReducer, useState } from "react";

import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { IpcStatus } from "../schema/ipc";
import { ContractSet } from "../utils/contractSet";
import { AlertProps, alertReducer, initialState } from "./alertReducer";

type ReturnCheckCoinType = {
  checkMembership: boolean | undefined;
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  alert: AlertProps;
};

type Props = {
  account: string;
} & ContractSet;

type Status = IpcStatus;

export const useMembership = ({
  account,
  abi,
  contractAddress,
  rpcURL,
}: Props): ReturnCheckCoinType => {
  const [status, setStatus] = useState<Status>("stop");
  const [alert, dispatch] = useReducer(alertReducer, initialState);

  const web3 = new Web3(rpcURL!!);
  const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);

  //devmodeのとき自動ログイン;
  const [checkMembership, setCheckMembership] = useState<boolean | undefined>(
    process.env.NODE_ENV === "development"
  );

  //TODO useOperateIpcに統合
  useEffect(() => {
    const fetch = async () => {
      setStatus("progress");
      dispatch({
        type: "web3",
        payload: { method: "login", status: "progress" },
      });

      //TODO preopen error処理
      const preopen = await contract.methods.preOpen().call();
      if (preopen === "2") {
        setStatus("success");
        dispatch({
          type: "web3",
          payload: { method: "preopen", status: "success" },
        });
        selectSetComment("preopen");

        return setCheckMembership(true);
      } else {
        try {
          const untilExpiration = await contract.methods
            .untilExpiration(account)
            .call();

          if (untilExpiration > 0) {
            setStatus("success");
            dispatch({
              type: "web3",
              payload: { method: "login", status: "success" },
            });

            return setCheckMembership(true);
          } else {
            setStatus("error");
            dispatch({
              type: "web3",
              payload: {
                method: "login",
                status: "error",
                message: "アドレスが間違っているか、有効期限が過ぎています",
              },
            });
            return setCheckMembership(false);
          }
        } catch (e) {
          console.log(e);
          setStatus("error");
          dispatch({
            type: "web3",
            payload: {
              method: "login",
              status: "error",
              message: "web3に接続できませんでした",
            },
          });
          return setCheckMembership(undefined);
        }
      }
    };
    if (account !== "") {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return { checkMembership, status, setStatus, alert };
};
function selectSetComment(arg0: string) {
  throw new Error("Function not implemented.");
}
