import { Address, ContractAbi, Web3PluginBase } from "web3";
import { Multicall3ABI } from "./multicall3_abi";
import { MULTICALL3_ADDRESS } from "./constants";

export class MulticallPlugin extends Web3PluginBase {
  public multicallAddress: Address;
  public pluginNamespace: string;
  public defaultMulticallAbi: ContractAbi;

  public constructor(options?: {
    mulitcallAddress?: Address;
    pluginNamespace?: string;
    defaultMulticallAbi?: ContractAbi;
  }) {
    super();

    this.multicallAddress = options?.mulitcallAddress ?? MULTICALL3_ADDRESS;
    this.pluginNamespace = options?.pluginNamespace ?? "multicall";
    this.defaultMulticallAbi = options?.defaultMulticallAbi ?? Multicall3ABI;
  }

  public test(param: string): void {
    console.log(param);
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    multicall: MulticallPlugin;
  }
}
