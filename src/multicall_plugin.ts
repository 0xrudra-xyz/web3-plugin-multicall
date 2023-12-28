import { Web3PluginBase, Contract } from "web3";
import type { Address } from "web3";

import { Multicall3_ABI } from "./abis/multicall3";
import { MULTICALL3_ADDRESS } from "./constants";
import type {
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
    pluginNamespace?: string;
    contractAddress?: Address;
  }) {
    super();

    this.pluginNamespace = options?.pluginNamespace ?? "multicall";
    this.contractAddress = options?.contractAddress ?? MULTICALL3_ADDRESS;
  }

  public aggregate(calls: Call[]): MethodObjects["aggregate"] {
    return this._getMulticallContract().methods.aggregate(
      calls,
    ) as unknown as MethodObjects["aggregate"];
  }

  public aggregate3(_calls: Call3[]): MethodObjects["aggregate3"] {
    const calls = _calls.map((call) => ({
      ...call,
      allowFailure: call.allowFailure ?? false,
    }));

    return this._getMulticallContract().methods.aggregate3(
      calls,
    ) as unknown as MethodObjects["aggregate3"];
  }

  public aggregate3Value(
    _calls: Call3Value[],
  ): MethodObjects["aggregate3Value"] {
    const calls = _calls.map((call) => ({
      ...call,
      allowFailure: call.allowFailure ?? false,
      value: call.value ?? "0",
    }));

    return this._getMulticallContract().methods.aggregate3Value(
      calls,
    ) as unknown as MethodObjects["aggregate3Value"];
  }

  public blockAndAggregate(calls: Call[]): MethodObjects["blockAndAggregate"] {
    return this._getMulticallContract().methods.blockAndAggregate(
      calls,
    ) as unknown as MethodObjects["blockAndAggregate"];
  }

  public tryAggregate(
    requireSuccess: boolean,
    calls: Call[],
  ): MethodObjects["tryAggregate"] {
    return this._getMulticallContract().methods.tryAggregate(
      requireSuccess,
      calls,
    ) as unknown as MethodObjects["tryAggregate"];
  }

  public tryBlockAndAggregate(
    requireSuccess: boolean,
    calls: Call[],
  ): MethodObjects["tryBlockAndAggregate"] {
    return this._getMulticallContract().methods.tryBlockAndAggregate(
      requireSuccess,
      calls,
    ) as unknown as MethodObjects["tryBlockAndAggregate"];
  }

  public getBasefee(): MethodObjects["getBasefee"] {
    return this._getMulticallContract().methods.getBasefee() as unknown as MethodObjects["getBasefee"];
  }

  public getBlockHash(blockNumber: string): MethodObjects["getBlockHash"] {
    return this._getMulticallContract().methods.getBlockHash(
      blockNumber,
    ) as unknown as MethodObjects["getBlockHash"];
  }

  public getBlockNumber(): MethodObjects["getBlockNumber"] {
    return this._getMulticallContract().methods.getBlockNumber() as unknown as MethodObjects["getBlockNumber"];
  }

  public getChainId(): MethodObjects["getChainId"] {
    return this._getMulticallContract().methods.getChainId() as unknown as MethodObjects["getChainId"];
  }

  public getCurrentBlockCoinbase(): MethodObjects["getCurrentBlockCoinbase"] {
    return this._getMulticallContract().methods.getCurrentBlockCoinbase() as unknown as MethodObjects["getCurrentBlockCoinbase"];
  }

  public getCurrentBlockDifficulty(): MethodObjects["getCurrentBlockDifficulty"] {
    return this._getMulticallContract().methods.getCurrentBlockDifficulty() as unknown as MethodObjects["getCurrentBlockDifficulty"];
  }

  public getCurrentBlockGasLimit(): MethodObjects["getCurrentBlockGasLimit"] {
    return this._getMulticallContract().methods.getCurrentBlockGasLimit() as unknown as MethodObjects["getCurrentBlockGasLimit"];
  }

  public getCurrentBlockTimestamp(): MethodObjects["getCurrentBlockTimestamp"] {
    return this._getMulticallContract().methods.getCurrentBlockTimestamp() as unknown as MethodObjects["getCurrentBlockTimestamp"];
  }

  public getEthBalance(address: string): MethodObjects["getEthBalance"] {
    return this._getMulticallContract().methods.getEthBalance(
      address,
    ) as unknown as MethodObjects["getEthBalance"];
  }

  public getLastBlockHash(): MethodObjects["getLastBlockHash"] {
    return this._getMulticallContract().methods.getLastBlockHash() as unknown as MethodObjects["getLastBlockHash"];
  }

  private _getMulticallContract(): Contract<typeof Multicall3_ABI> {
    if (this._multicallContract === undefined) {
      this._multicallContract = new Contract(
        Multicall3_ABI,
        this.contractAddress,
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
