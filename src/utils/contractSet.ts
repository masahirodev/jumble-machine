import { AbiItem } from "web3-utils";
import abi from "./abi.json";
import testAbi from "./testAbi.json";

export type ContractSet = {
  abi: AbiItem[];
  contractAddress: string;
  rpcURL: string;
};

export type ChainContractSet = {
  polygon: ContractSet;
  mumbai: ContractSet;
};

export const contractSet: ChainContractSet = {
  polygon: {
    rpcURL: "https://polygon-rpc.com/",
    contractAddress: "0xFD7a46193E2206D0B8076d43c082BA2587fd2631",
    abi: abi as AbiItem[],
  },
  mumbai: {
    rpcURL: "https://matic-mumbai.chainstacklabs.com",
    contractAddress: "0x2D0bF5859b31377a4951c635F5101dEED0E08D12",
    abi: testAbi as AbiItem[],
  },
};
