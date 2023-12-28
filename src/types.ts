import { ContractMethodsInterface } from "web3-eth-contract";
import { Address } from "web3";

import { Multicall3_ABI } from "./multicall3_abi";

export type Multicall3ContractMethodsInterface = ContractMethodsInterface<
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
