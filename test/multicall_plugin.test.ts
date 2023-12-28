import { Web3, Web3Eth, core } from "web3";
import {
  AGGREGATE_FUNCTION_FRAGMENT,
  MULTICALL3_ADDRESS,
  MulticallPlugin,
} from "../src";

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

    beforeAll(() => {
      web3 = new Web3("http://127.0.0.1:8545");
      web3.registerPlugin(new MulticallPlugin());
      web3.multicall.requestManager.send = requestManagerSendSpy;
    });

    afterAll(() => {
      requestManagerSendSpy.mockRestore();
    });

    describe("aggregate", () => {
      it("should call eth_call with zero call args", async () => {
        await web3.multicall.aggregate([]).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                AGGREGATE_FUNCTION_FRAGMENT,
                [[]]
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });

      it("should call eth_call with one call args", async () => {
        const calls = [
          {
            target: web3.multicall.contractAddress,
            callData: web3.multicall.getBasefee().encodeABI(),
          },
        ];

        await web3.multicall.aggregate(calls).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                AGGREGATE_FUNCTION_FRAGMENT,
                [[calls[0]]]
              ),
              to: MULTICALL3_ADDRESS,
            },
            "latest",
          ],
        });
      });

      it("should call eth_call with two call args", async () => {
        const calls = [
          {
            target: web3.multicall.contractAddress,
            callData: web3.multicall.getBasefee().encodeABI(),
          },
          {
            target: web3.multicall.contractAddress,
            callData: web3.multicall.getBasefee().encodeABI(),
          },
        ];

        await web3.multicall.aggregate(calls).call();

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
          method: "eth_call",
          params: [
            {
              data: web3.eth.abi.encodeFunctionCall(
                AGGREGATE_FUNCTION_FRAGMENT,
                [[calls[0], calls[1]]]
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
  });
});
