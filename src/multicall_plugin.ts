import { Web3PluginBase, Contract } from "web3";
import type { Address } from "web3";

import { Multicall3_ABI } from "./multicall3_abi";
import { MULTICALL3_ADDRESS } from "./constants";
import {
  Call,
  Call3,
  Call3Value,
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

  public aggregate3(_calls: Call3[]): MethodObjects["aggregate3"] {
    const calls = _calls.map((call) => ({
      ...call,
      allowFailure: call.allowFailure ?? false,
    }));

    return this._getMulticallContract().methods.aggregate3(
      calls
    ) as unknown as MethodObjects["aggregate3"];
  }

  public aggregate3Value(
    _calls: Call3Value[]
  ): MethodObjects["aggregate3Value"] {
    const calls = _calls.map((call) => ({
      ...call,
      allowFailure: call.allowFailure ?? false,
      value: call.value ?? "0",
    }));

    return this._getMulticallContract().methods.aggregate3Value(
      calls
    ) as unknown as MethodObjects["aggregate3Value"];
  }

  public blockAndAggregate(calls: Call[]): MethodObjects["blockAndAggregate"] {
    return this._getMulticallContract().methods.blockAndAggregate(
      calls
    ) as unknown as MethodObjects["blockAndAggregate"];
  }

  public tryAggregate(
    requireSuccess: boolean,
    calls: Call[]
  ): MethodObjects["tryAggregate"] {
    return this._getMulticallContract().methods.tryAggregate(
      requireSuccess,
      calls
    ) as unknown as MethodObjects["tryAggregate"];
  }

  public tryBlockAndAggregate(
    requireSuccess: boolean,
    calls: Call[]
  ): MethodObjects["tryBlockAndAggregate"] {
    return this._getMulticallContract().methods.tryBlockAndAggregate(
      requireSuccess,
      calls
    ) as unknown as MethodObjects["tryBlockAndAggregate"];
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
