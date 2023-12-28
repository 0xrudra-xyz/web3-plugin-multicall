export const AGGREGATE_FUNCTION_FRAGMENT = {
  inputs: [
    {
      components: [
        { internalType: "address", name: "target", type: "address" },
        { internalType: "bytes", name: "callData", type: "bytes" },
      ],
      internalType: "struct Multicall3.Call[]",
      name: "calls",
      type: "tuple[]",
    },
  ],
  name: "aggregate",
  outputs: [
    { internalType: "uint256", name: "blockNumber", type: "uint256" },
    { internalType: "bytes[]", name: "returnData", type: "bytes[]" },
  ],
  stateMutability: "payable",
  type: "function",
} as const;

export const AGGREGATE3_FUNCTION_FRAGMENT = {
  inputs: [
    {
      components: [
        { internalType: "address", name: "target", type: "address" },
        { internalType: "bool", name: "allowFailure", type: "bool" },
        { internalType: "bytes", name: "callData", type: "bytes" },
      ],
      internalType: "struct Multicall3.Call3[]",
      name: "calls",
      type: "tuple[]",
    },
  ],
  name: "aggregate3",
  outputs: [
    {
      components: [
        { internalType: "bool", name: "success", type: "bool" },
        { internalType: "bytes", name: "returnData", type: "bytes" },
      ],
      internalType: "struct Multicall3.Result[]",
      name: "returnData",
      type: "tuple[]",
    },
  ],
  stateMutability: "payable",
  type: "function",
} as const;

export const AGGREGATE3_VALUE_FUNCTION_FRAGMENT = {
  inputs: [
    {
      components: [
        { internalType: "address", name: "target", type: "address" },
        { internalType: "bool", name: "allowFailure", type: "bool" },
        { internalType: "uint256", name: "value", type: "uint256" },
        { internalType: "bytes", name: "callData", type: "bytes" },
      ],
      internalType: "struct Multicall3.Call3Value[]",
      name: "calls",
      type: "tuple[]",
    },
  ],
  name: "aggregate3Value",
  outputs: [
    {
      components: [
        { internalType: "bool", name: "success", type: "bool" },
        { internalType: "bytes", name: "returnData", type: "bytes" },
      ],
      internalType: "struct Multicall3.Result[]",
      name: "returnData",
      type: "tuple[]",
    },
  ],
  stateMutability: "payable",
  type: "function",
} as const;

export const BLOCK_AND_AGGREGATE_FUNCTION_FRAGMENT = {
  inputs: [
    {
      components: [
        { internalType: "address", name: "target", type: "address" },
        { internalType: "bytes", name: "callData", type: "bytes" },
      ],
      internalType: "struct Multicall3.Call[]",
      name: "calls",
      type: "tuple[]",
    },
  ],
  name: "blockAndAggregate",
  outputs: [
    { internalType: "uint256", name: "blockNumber", type: "uint256" },
    { internalType: "bytes32", name: "blockHash", type: "bytes32" },
    {
      components: [
        { internalType: "bool", name: "success", type: "bool" },
        { internalType: "bytes", name: "returnData", type: "bytes" },
      ],
      internalType: "struct Multicall3.Result[]",
      name: "returnData",
      type: "tuple[]",
    },
  ],
  stateMutability: "payable",
  type: "function",
} as const;

export const GET_BASEFEE_FUNCTION_FRAGMENT = {
  inputs: [],
  name: "getBasefee",
  outputs: [{ internalType: "uint256", name: "basefee", type: "uint256" }],
  stateMutability: "view",
  type: "function",
} as const;

export const GET_BLOCK_HASH_FUNCTION_FRAGMENT = {
  inputs: [{ internalType: "uint256", name: "blockNumber", type: "uint256" }],
  name: "getBlockHash",
  outputs: [{ internalType: "bytes32", name: "blockHash", type: "bytes32" }],
  stateMutability: "view",
  type: "function",
} as const;

export const GET_BLOCK_NUMBER_FUNCTION_FRAGMENT = {
  inputs: [],
  name: "getBlockNumber",
  outputs: [{ internalType: "uint256", name: "blockNumber", type: "uint256" }],
  stateMutability: "view",
  type: "function",
} as const;

export const GET_CHAIN_ID_FUNCTION_FRAGMENT = {
  inputs: [],
  name: "getChainId",
  outputs: [{ internalType: "uint256", name: "chainid", type: "uint256" }],
  stateMutability: "view",
  type: "function",
} as const;

export const GET_CURRENT_BLOCK_COINBASE_FUNCTION_FRAGMENT = {
  inputs: [],
  name: "getCurrentBlockCoinbase",
  outputs: [{ internalType: "address", name: "coinbase", type: "address" }],
  stateMutability: "view",
  type: "function",
} as const;

export const GET_CURRENT_BLOCK_DIFFICULTY_FUNCTION_FRAGMENT = {
  inputs: [],
  name: "getCurrentBlockDifficulty",
  outputs: [{ internalType: "uint256", name: "difficulty", type: "uint256" }],
  stateMutability: "view",
  type: "function",
} as const;

export const GET_CURRENT_BLOCK_GAS_LIMIT_FUNCTION_FRAGMENT = {
  inputs: [],
  name: "getCurrentBlockGasLimit",
  outputs: [{ internalType: "uint256", name: "gaslimit", type: "uint256" }],
  stateMutability: "view",
  type: "function",
} as const;

export const GET_CURRENT_BLOCK_TIMESTAMP_FUNCTION_FRAGMENT = {
  inputs: [],
  name: "getCurrentBlockTimestamp",
  outputs: [{ internalType: "uint256", name: "timestamp", type: "uint256" }],
  stateMutability: "view",
  type: "function",
} as const;

export const GET_ETH_BALANCE_FUNCTION_FRAGMENT = {
  inputs: [{ internalType: "address", name: "addr", type: "address" }],
  name: "getEthBalance",
  outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
  stateMutability: "view",
  type: "function",
} as const;

export const GET_LAST_BLOCK_HASH_FUNCTION_FRAGMENT = {
  inputs: [],
  name: "getLastBlockHash",
  outputs: [{ internalType: "bytes32", name: "blockHash", type: "bytes32" }],
  stateMutability: "view",
  type: "function",
} as const;

export const TRY_AGGREGATE_FUNCTION_FRAGMENT = {
  inputs: [
    { internalType: "bool", name: "requireSuccess", type: "bool" },
    {
      components: [
        { internalType: "address", name: "target", type: "address" },
        { internalType: "bytes", name: "callData", type: "bytes" },
      ],
      internalType: "struct Multicall3.Call[]",
      name: "calls",
      type: "tuple[]",
    },
  ],
  name: "tryAggregate",
  outputs: [
    {
      components: [
        { internalType: "bool", name: "success", type: "bool" },
        { internalType: "bytes", name: "returnData", type: "bytes" },
      ],
      internalType: "struct Multicall3.Result[]",
      name: "returnData",
      type: "tuple[]",
    },
  ],
  stateMutability: "payable",
  type: "function",
} as const;

export const TRY_BLOCK_AND_AGGREGATE_FUNCTION_FRAGMENT = {
  inputs: [
    { internalType: "bool", name: "requireSuccess", type: "bool" },
    {
      components: [
        { internalType: "address", name: "target", type: "address" },
        { internalType: "bytes", name: "callData", type: "bytes" },
      ],
      internalType: "struct Multicall3.Call[]",
      name: "calls",
      type: "tuple[]",
    },
  ],
  name: "tryBlockAndAggregate",
  outputs: [
    { internalType: "uint256", name: "blockNumber", type: "uint256" },
    { internalType: "bytes32", name: "blockHash", type: "bytes32" },
    {
      components: [
        { internalType: "bool", name: "success", type: "bool" },
        { internalType: "bytes", name: "returnData", type: "bytes" },
      ],
      internalType: "struct Multicall3.Result[]",
      name: "returnData",
      type: "tuple[]",
    },
  ],
  stateMutability: "payable",
  type: "function",
} as const;

// the ABI of the Multicall3 contract which is deployed on over 70+ chains
// ref: https://www.multicall3.com/
export const Multicall3_ABI = [
  AGGREGATE_FUNCTION_FRAGMENT,
  AGGREGATE3_FUNCTION_FRAGMENT,
  AGGREGATE3_VALUE_FUNCTION_FRAGMENT,
  BLOCK_AND_AGGREGATE_FUNCTION_FRAGMENT,
  GET_BASEFEE_FUNCTION_FRAGMENT,
  GET_BLOCK_HASH_FUNCTION_FRAGMENT,
  GET_BLOCK_NUMBER_FUNCTION_FRAGMENT,
  GET_CHAIN_ID_FUNCTION_FRAGMENT,
  GET_CURRENT_BLOCK_COINBASE_FUNCTION_FRAGMENT,
  GET_CURRENT_BLOCK_DIFFICULTY_FUNCTION_FRAGMENT,
  GET_CURRENT_BLOCK_GAS_LIMIT_FUNCTION_FRAGMENT,
  GET_CURRENT_BLOCK_TIMESTAMP_FUNCTION_FRAGMENT,
  GET_ETH_BALANCE_FUNCTION_FRAGMENT,
  GET_LAST_BLOCK_HASH_FUNCTION_FRAGMENT,
  TRY_AGGREGATE_FUNCTION_FRAGMENT,
  TRY_BLOCK_AND_AGGREGATE_FUNCTION_FRAGMENT,
] as const;
