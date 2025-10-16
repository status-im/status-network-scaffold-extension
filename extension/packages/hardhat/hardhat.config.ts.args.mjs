// Reference the example args file: https://github.com/scaffold-eth/create-eth-extensions/blob/example/extension/packages/hardhat/hardhat.config.ts.args.mjs
// Reference the template file that will use this file: https://github.com/scaffold-eth/create-eth/blob/main/templates/solidity-frameworks/hardhat/packages/hardhat/hardhat.config.ts.template.mjs

// Default args:
export const preContent = "";

export const configOverrides = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          evmVersion: "paris",
          optimizer: {
            enabled: true,
            // https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    statusSepolia: {
      chainId: 1_660_990_954,
      gas: 0,
      gasPrice: 0,
      url: "https://public.sepolia.rpc.status.network",
      accounts: ["$$deployerPrivateKey$$"],
    }
  },
};