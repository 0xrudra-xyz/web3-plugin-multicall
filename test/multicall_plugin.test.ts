import { Web3, core } from "web3";
import { MulticallPlugin } from "../src";

describe("MulticallPlugin Tests", () => {
  it("should register MulticallPlugin plugin on Web3Context instance", () => {
    const web3Context = new core.Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new MulticallPlugin());
    expect(web3Context.multicall).toBeDefined();
  });

  describe("MulticallPlugin method tests", () => {
    let consoleSpy: jest.SpiedFunction<typeof global.console.log>;

    let web3: Web3;

    beforeAll(() => {
      web3 = new Web3("http://127.0.0.1:8545");
      web3.registerPlugin(new MulticallPlugin());
      consoleSpy = jest.spyOn(global.console, "log").mockImplementation();
    });

    afterAll(() => {
      consoleSpy.mockRestore();
    });

    it("should call MulticallPlugin test method with expected param", () => {
      web3.multicall.test("test-param");
      expect(consoleSpy).toHaveBeenCalledWith("test-param");
    });
  });
});
