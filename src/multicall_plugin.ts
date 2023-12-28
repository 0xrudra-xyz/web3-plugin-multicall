import { Address, Web3PluginBase, Contract } from "web3";

import { Multicall3_ABI } from "./multicall3_abi";
import { MULTICALL3_ADDRESS } from "./constants";
import {
  Call,
  Multicall3ContractMethodObjects as MethodObjects,
} from "./types";

export class MulticallPlugin extends Web3PluginBase {
  public pluginNamespace: string;
  public contractAddress: Address;

  private _multicallContract?: Contract<typeof Multicall3_ABI>;

  public constructor(options?: {
    contractAddress?: Address;
    pluginNamespace?: string;
  }) {
    super();

    this.pluginNamespace = options?.pluginNamespace ?? "multicall";
    this.contractAddress = options?.contractAddress ?? MULTICALL3_ADDRESS;
  }

  public aggregate(calls: Call[]): MethodObjects["aggregate"] {
    return this._getMulticallContract().methods.aggregate(
      calls
    ) as unknown as MethodObjects["aggregate"];
  }

  public getBasefee(): MethodObjects["getBasefee"] {
    return this._getMulticallContract().methods.getBasefee() as unknown as MethodObjects["getBasefee"];
  }

  private _getMulticallContract(): Contract<typeof Multicall3_ABI> {
    if (this._multicallContract === undefined) {
      this._multicallContract = new Contract(
        Multicall3_ABI,
        this.contractAddress
      );

      this._multicallContract.link(this);
    }

    return this._multicallContract;
  }
}

// Module Augmentation
declare module "web3" {
  interface Web3Context {
    multicall: MulticallPlugin;
  }
}
