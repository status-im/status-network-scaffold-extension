# Status Network Scaffold-ETH 2 Extension

This repository is an extension for Scaffold-ETH 2 that provides pre-configured setups for deploying and interacting with contracts on the Status Network Sepolia testnet. All necessary Foundry and Hardhat configurations to connect to Status Network Sepolia are provided and explained. 


## What you get

- 🔨 **Foundry setup** targeting Status Network Sepolia
- ⚡ **Hardhat setup** targeting Status Network Sepolia
- 📄 Minimal example contract `HelloStatusNetwork.sol` and basic deployment scripts for both frameworks
- 🌐 **NextJS setup** connecting to Status Network Sepolia instead of SE2 default Anvil local chain


## 📋 Prerequisites

- 📦 [Node (>= v20.18.3)](https://nodejs.org/en/download/), [Yarn](https://yarnpkg.com/getting-started/install) and [Git](https://git-scm.com/downloads)
- 🔨 If using the Foundry workflow (`forge`, `cast`, `anvil`), [Foundry](https://getfoundry.sh/)
- 💡 Note: Hardhat is provided via project dependencies and run with Yarn; no global install is required. Foundry is a separate native toolchain you install locally.
- 🔑 An EVM wallet to use as the deployer account, *testnet ETH unnecessary*. 


## 🚀 Quickstart

### 1. Install the extension

```bash
npx create-eth@latest -e status-im/status-network-scaffold-extension
```

Choose your preferred framework when prompted: Hardhat or Foundry. 

### 2. Configure Your Account

```bash
yarn generate 
# or
yarn account:import
```

Refer to [Scaffold-ETH 2 docs](https://docs.scaffoldeth.io/deploying/deploy-smart-contracts#2-generate-a-new-account-or-add-one-to-deploy-the-contracts-from) for more details.

### 3. Deploy to Status Network Sepolia

```bash
yarn deploy --network statusSepolia
```

### 4. Verify Your Contract

```bash
# For Hardhat workflow
yarn hardhat:hardhat-verify --network statusSepolia <YourDeployedContractAddress>

# For Foundry workflow
yarn status:verify --network statusSepolia
```

### 5. Launch the Frontend

Start the NextJS frontend to interact with your deployed contract:

```bash
yarn start
```

Visit http://localhost:3000 to see your contract in action. The frontend is pre-configured to connect to Status Network Sepolia.

## ⚙️ Pre-configured Status Network Sepolia Setup

This extension includes all necessary configurations to connect to Status Network Sepolia testnet. The key settings are:
- 🌐 **Network name**: `statusSepolia`
- 📦 **Solidity version**: `0.8.24`
- ⚡ **EVM version**: `Paris`
- 🔗 **Public RPC endpoint**: `https://public.sepolia.rpc.status.network`

### 🔧 Frameworks configuration overview

The above settings are pre-configured for you in:
- 🔨Foundry: `extension/packages/foundry/foundry.toml.args.mjs`
- ⚡ Hardhat: `extension/packages/hardhat/hardhat.config.ts.args.mjs`

These are Scaffold-ETH 2 extension template files that will merge into the corresponding configs when the extension is installed. 

### 🌐 NextJS configuration overview

The Scaffold config for NextJS is overridden to have the frontend connect to Status Network Sepolia instead of the local Anvil chain, as is the case normally with Scaffold‑ETH 2 projects.

```typescript
// extension/packages/nextjs/scaffold.config.ts.args.mjs

export const configOverrides = {
   // `viem.chains` provides the `statusSepolia` chain object with all the necessary chain information
    targetNetworks: ["$$chains.statusSepolia$$"], 
    rpcOverrides: {
        "$$[chains.statusSepolia.id]$$": "https://public.sepolia.rpc.status.network",
    },
    onlyLocalBurnerWallet: false,   // to allow Burner Wallets usage on Status Network Sepolia
};
export const skipLocalChainInTargetNetworks = true;     // to enforce connection to Status Network Sepolia
```

Through the above configuration, the NextJS will automatically connect to Status Network Sepolia when you run your frontend.

### 📄 Contracts included

- `HelloStatusNetwork.sol`: a minimal example contract used to validate deployments and wiring for both Foundry and Hardhat.


### ⚠️ Important Notes for Status Network Extension

- 🚫 **No local chain needed**: Deploy directly to the testnet; you do not need to run `yarn chain`.
- 🌐 **Always specify network**: Use `--network statusSepolia` for deploy and verify.
- ✅ **Verification**: *Use Blockscout*, not Etherscan, for contract verification.
- ⛽ **Gasless transactions**: Status Network is natively gasless; testnet ETH is optional. 
- 💧 **Faucet**: If you still want testnet ETH, see the faucet in our [docs](https://docs.status.network).


### 🔧 Troubleshooting

- 🌐 **Network connection issues**: Verify the RPC URL `https://public.sepolia.rpc.status.network` is accessible.
- 🔑 **Account issues**: Make sure your account is properly configured through keystore or account import.

For more troubleshooting, consult the references below.

📚 **References:**
- 📖 Status Network Docs: [`https://docs.status.network`](https://docs.status.network)
- 📖 Scaffold-ETH 2 Guide: [`https://docs.scaffoldeth.io`](https://docs.scaffoldeth.io)
- 📖 Blockscout Verification: [`https://docs.blockscout.com/devs/verification/hardhat-verification-plugin`](https://docs.blockscout.com/devs/verification/hardhat-verification-plugin)


### 📄 License

This project follows the same license as Scaffold‑ETH 2 unless otherwise noted.
