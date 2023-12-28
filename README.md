# web3-plugin-multicall

[![npm version](https://img.shields.io/badge/npm-0.1.0-brightgreen)](https://www.npmjs.com/package/@rudra-xyz/web3-plugin-multicall)

The Multicall Web3.js Plugin enhances the functionality of the Web3.js library, enabling smooth and efficient interaction with the [Multicall3](https://github.com/mds1/multicall).


## Prerequisites 

-   :gear: [NodeJS](https://nodejs.org/) (LTS/Fermium)
-   :toolbox: [Yarn](https://yarnpkg.com/)

## Installation

> Note: Make sure you have installed the [web3](https://www.npmjs.com/package/web3) version 4.0.3 or above.

```bash
yarn add @rudra-xyz/web3-plugin-chainlink
```

## Basic Usage

```typescript
import { Web3, Web3Eth, core } from "web3";
import { MulticallPlugin } from '@rudra-xyz/web3-plugin-multicall';

const main = async () => {
    const web3 = new Web3("http://127.0.0.1:8545");
    web3.registerPlugin(new MulticallPlugin());

    const erc20 = new web3.eth.Contract(
        ERC20_ABI,
        "0x0000000000000000000000000000000000000000",
    );

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

    const results = await web3.multicall.aggregate(calls).call();

    console.log(results);
};

main();
```

This plugin completely supports the [Multicall3 contract functions](https://github.com/mds1/multicall/blob/main/src/Multicall3.sol).<br>
For detailed instructions on how to use the Multicall3 contract, please refer to [this repo](https://github.com/mds1/multicall?tab=readme-ov-file#usage).


## Reference

- [web3.js plugin](https://docs.web3js.org/guides/web3_plugin_guide/plugin_authors)
- [mds1/multicall](https://github.com/mds1/multicall)


## License

This app is open-source and licensed under the MIT license. For more details, check the [License file](LICENSE).