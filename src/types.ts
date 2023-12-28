import type { ContractMethodsInterface } from "web3-eth-contract";
import type { Address } from "web3";

import type { Multicall3_ABI } from "./abis/multicall3";

type Multicall3ContractMethodsInterface = ContractMethodsInterface<
  typeof Multicall3_ABI
>;
export type Multicall3ContractMethodObjects = {
  [K in keyof Multicall3ContractMethodsInterface]: ReturnType<
    Multicall3ContractMethodsInterface[K]
  >;
};

export type Call = {
  target: Address;
  callData: string;
};

export type Call3 = {
  target: Address;
  allowFailure?: boolean;
  callData: string;
};

export type Call3Value = {
  target: Address;
  allowFailure?: boolean;
  value?: string;
  callData: string;
};
