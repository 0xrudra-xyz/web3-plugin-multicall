import { Web3, Web3Eth, core } from "web3";
import type { Contract } from "web3";

import {
  AGGREGATE3_FUNCTION_FRAGMENT,
  AGGREGATE3_VALUE_FUNCTION_FRAGMENT,
  AGGREGATE_FUNCTION_FRAGMENT,
  BLOCK_AND_AGGREGATE_FUNCTION_FRAGMENT,
  GET_BLOCK_HASH_FUNCTION_FRAGMENT,
  GET_ETH_BALANCE_FUNCTION_FRAGMENT,
  MULTICALL3_ADDRESS,
  MulticallPlugin,
  TRY_AGGREGATE_FUNCTION_FRAGMENT,
  TRY_BLOCK_AND_AGGREGATE_FUNCTION_FRAGMENT,
} from "../src";
import { ERC20_ABI } from "./abis/erc20";

describe("MulticallPlugin Tests", () => {
  it("should register MulticallPlugin plugin on Web3Context instance", () => {
    const web3Context = new core.Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new MulticallPlugin());
    expect(web3Context.multicall).toBeDefined();
  });

  it("should register MulticallPlugin plugin on Web3Eth instance", () => {
    const web3Eth = new Web3Eth("http://127.0.0.1:8545");
    web3Eth.registerPlugin(new MulticallPlugin());
    expect(web3Eth.multicall).toBeDefined();
  });

  describe("MulticallPlugin method tests", () => {
    const requestManagerSendSpy = jest.fn();
    let web3: Web3;
    let erc20: Contract<typeof ERC20_ABI>;

    beforeAll(() => {
      web3 = new Web3("http://127.0.0.1:8545");
      web3.registerPlugin(new MulticallPlugin());
      web3.multicall.requestManager.send = requestManagerSendSpy;

      erc20 = new web3.eth.Contract(
        ERC20_ABI,
        "0x0000000000000000000000000000000000000000",
      );
    });

    afterAll(() => {
      requestManagerSendSpy.mockRestore();
    });

    describe("aggregate", () => {
      it("should call eth_call with empty calls args", async () => {
        await web3.multicall.aggregate([]).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                AGGREGATE_FUNCTION_FRAGMENT,
                [[]],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });

      it("should call eth_call with some calls args", async () => {
        const calls = [
          {
            target: web3.multicall.contractAddress,
            callData: web3.multicall.getBasefee().encodeABI(),
          },
          {
            target: erc20.options.address!,
            callData: erc20.methods.symbol().encodeABI(),
          },
        ];

        await web3.multicall.aggregate(calls).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                AGGREGATE_FUNCTION_FRAGMENT,
                [[calls[0], calls[1]]],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("aggregate3", () => {
      it("should call eth_call with empty calls args", async () => {
        await web3.multicall.aggregate3([]).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                AGGREGATE3_FUNCTION_FRAGMENT,
                [[]],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });

      it("should call eth_call with some calls args", async () => {
        const calls = [
          {
            target: web3.multicall.contractAddress,
            callData: web3.multicall.getBasefee().encodeABI(),
          },
          {
            target: erc20.options.address!,
            allowFailure: true,
            callData: erc20.methods.symbol().encodeABI(),
          },
        ];

        await web3.multicall.aggregate3(calls).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                AGGREGATE3_FUNCTION_FRAGMENT,
                [
                  [
                    {
                      ...calls[0],
                      allowFailure: false,
                    },
                    {
                      ...calls[1],
                      allowFailure: true,
                    },
                  ],
                ],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("aggregate3Value", () => {
      it("should call eth_call with empty calls args", async () => {
        await web3.multicall.aggregate3Value([]).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                AGGREGATE3_VALUE_FUNCTION_FRAGMENT,
                [[]],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });

      it("should call eth_call with some calls args", async () => {
        const calls = [
          {
            target: web3.multicall.contractAddress,
            callData: web3.multicall.getBasefee().encodeABI(),
          },
          {
            target: erc20.options.address!,
            allowFailure: true,
            value: "1",
            callData: erc20.methods.symbol().encodeABI(),
          },
        ];

        await web3.multicall.aggregate3Value(calls).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                AGGREGATE3_VALUE_FUNCTION_FRAGMENT,
                [
                  [
                    {
                      ...calls[0],
                      allowFailure: false,
                      value: "0",
                    },
                    {
                      ...calls[1],
                      allowFailure: true,
                      value: "1",
                    },
                  ],
                ],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("blockAndAggregate", () => {
      it("should call eth_call with empty calls args", async () => {
        await web3.multicall.blockAndAggregate([]).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                BLOCK_AND_AGGREGATE_FUNCTION_FRAGMENT,
                [[]],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });

      it("should call eth_call with some calls args", async () => {
        const calls = [
          {
            target: web3.multicall.contractAddress,
            callData: web3.multicall.getBasefee().encodeABI(),
          },
          {
            target: erc20.options.address!,
            callData: erc20.methods.symbol().encodeABI(),
          },
        ];

        await web3.multicall.blockAndAggregate(calls).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                BLOCK_AND_AGGREGATE_FUNCTION_FRAGMENT,
                [[calls[0], calls[1]]],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("tryAggregate", () => {
      it("should call eth_call with empty calls args", async () => {
        await web3.multicall.tryAggregate(false, []).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                TRY_AGGREGATE_FUNCTION_FRAGMENT,
                [false, []],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });

      it("should call eth_call with some calls args", async () => {
        const calls = [
          {
            target: web3.multicall.contractAddress,
            callData: web3.multicall.getBasefee().encodeABI(),
          },
          {
            target: erc20.options.address!,
            callData: erc20.methods.symbol().encodeABI(),
          },
        ];

        await web3.multicall.tryAggregate(true, calls).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                TRY_AGGREGATE_FUNCTION_FRAGMENT,
                [true, [calls[0], calls[1]]],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("tryBlockAndAggregate", () => {
      it("should call eth_call with empty calls args", async () => {
        await web3.multicall.tryBlockAndAggregate(false, []).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                TRY_BLOCK_AND_AGGREGATE_FUNCTION_FRAGMENT,
                [false, []],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });

      it("should call eth_call with some calls args", async () => {
        const calls = [
          {
            target: web3.multicall.contractAddress,
            callData: web3.multicall.getBasefee().encodeABI(),
          },
          {
            target: erc20.options.address!,
            callData: erc20.methods.symbol().encodeABI(),
          },
        ];

        await web3.multicall.tryBlockAndAggregate(true, calls).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                TRY_BLOCK_AND_AGGREGATE_FUNCTION_FRAGMENT,
                [true, [calls[0], calls[1]]],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("getBasefee", () => {
      it("should call eth_call with getBasefee function", async () => {
        await web3.multicall.getBasefee().call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionSignature("getBasefee()"),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("getBlockHash", () => {
      it("should call eth_call with getBlockHash function", async () => {
        await web3.multicall.getBlockHash("1").call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                GET_BLOCK_HASH_FUNCTION_FRAGMENT,
                ["1"],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("getBlockNumber", () => {
      it("should call eth_call with getBlockNumber function", async () => {
        await web3.multicall.getBlockNumber().call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionSignature("getBlockNumber()"),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("getChainId", () => {
      it("should call eth_call with getChainId function", async () => {
        await web3.multicall.getChainId().call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionSignature("getChainId()"),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("getCurrentBlockCoinbase", () => {
      it("should call eth_call with getCurrentBlockCoinbase function", async () => {
        await web3.multicall.getCurrentBlockCoinbase().call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionSignature(
                "getCurrentBlockCoinbase()",
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("getCurrentBlockDifficulty", () => {
      it("should call eth_call with getCurrentBlockDifficulty function", async () => {
        await web3.multicall.getCurrentBlockDifficulty().call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionSignature(
                "getCurrentBlockDifficulty()",
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("getCurrentBlockGasLimit", () => {
      it("should call eth_call with getCurrentBlockGasLimit function", async () => {
        await web3.multicall.getCurrentBlockGasLimit().call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionSignature(
                "getCurrentBlockGasLimit()",
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("getCurrentBlockTimestamp", () => {
      it("should call eth_call with getCurrentBlockTimestamp function", async () => {
        await web3.multicall.getCurrentBlockTimestamp().call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionSignature(
                "getCurrentBlockTimestamp()",
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("getEthBalance", () => {
      it("should call eth_call with getEthBalance function", async () => {
        await web3.multicall
          .getEthBalance("0x0000000000000000000000000000000000000000")
          .call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                GET_ETH_BALANCE_FUNCTION_FRAGMENT,
                ["0x0000000000000000000000000000000000000000"],
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });

    describe("getLastBlockHash", () => {
      it("should call eth_call with getLastBlockHash function", async () => {
        await web3.multicall.getLastBlockHash().call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionSignature("getLastBlockHash()"),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });
    });
  });
});
