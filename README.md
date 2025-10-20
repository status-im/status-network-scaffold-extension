# Status Network Scaffold-ETH 2 Extension

This repository is an extension for Scaffold-ETH 2 that provides pre-configured setups for deploying and interacting with contracts on the Status Network Sepolia testnet. All necessary Foundry and Hardhat configurations to connect to Status Network Sepolia are provided and explained in this extension. 


## What you get

- **Foundry setup** targeting Status Network Sepolia
- **Hardhat setup** targeting Status Network Sepolia
- Minimal example contract `HelloStatusNetwork.sol` and basic deployment scripts for both frameworks
- **NextJS setup** connecting to Status Network Sepolia instead of SE2 default Anvil local chain


### Quickstart

1. Install the extension into a new or existing Scaffold‑ETH 2 workspace:

```bash
npx create-eth@latest -e status-im/status-network-scaffold-extension
```

2. Choose your framework and deploy to Status Network Sepolia:

- Hardhat
  ```bash
  yarn generate            # or: yarn account:import
  yarn deploy --network statusSepolia
  ```
- Foundry
  ```bash
  forge account new        # or: forge account import my-account
  forge script script/DeployHelloStatusNetwork.s.sol \
    --broadcast \
    --rpc-url statusSepolia \
    --private-key <YOUR_PRIVATE_KEY>
  ```


### Pre-configured Status Network Sepolia Setup

This extension includes all necessary configurations to connect to Status Network Sepolia testnet. The key settings are:
- **Network name**: `statusSepolia`
- **Solidity version**: `0.8.24`
- **EVM version**: `Paris`
- **Public RPC endpoint**: `https://public.sepolia.rpc.status.network`

#### Frameworks configuration overview

These settings are pre-configured for you in:
- `extension/packages/foundry/foundry.toml.args.mjs`
- `extension/packages/hardhat/hardhat.config.ts.args.mjs`

#### NextJS configuration

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

### Contracts included

- `HelloStatusNetwork.sol`: a minimal example contract used to validate deployments and wiring for both Foundry and Hardhat.


### Prerequisites

- [Yarn](https://yarnpkg.com/getting-started/install)
- If using the Foundry workflow (`forge`, `cast`, `anvil`), [Foundry](https://getfoundry.sh/) installed
- Note: Hardhat is provided via project dependencies and run with Yarn; no global install is required. Foundry is a separate native toolchain you install locally.
- A deployer account configured, *testnet ETH unnecessary*. 


### Installation

Inside your Scaffold‑ETH 2 project (or a clean workspace), run the `npx` command from Quickstart.

### Using the Extension

Since this extension is pre-configured for Status Network Sepolia testnet, you don't need to run `yarn chain` (which starts a local blockchain). Instead, you'll connect and deploy directly to the Status Network testnet.

#### For Hardhat Users

1. **Set up your deployer account**:
   ```bash
   # Generate a new account or import existing one
   yarn generate
   # OR
   yarn account:import
   ```

2. **Get testnet ETH**:
   - Visit the Status Network faucet to get testnet ETH for your deployer account
   - Check your account balance: `yarn account`

3. **Deploy to Status Network Sepolia**:
   ```bash
   # Deploy all contracts
   yarn deploy --network statusSepolia
   
   # Deploy specific contract (if tagged)
   yarn deploy --tags HelloStatusNetwork --network statusSepolia
   ```

4. **Verify contracts on Blockscout**:
   ```bash
   # Verify all deployed contracts
   yarn verify --network statusSepolia
   
   # Verify specific contract with constructor args
   yarn hardhat verify --network statusSepolia <CONTRACT_ADDRESS> "Hello Status Network!"
   ```

#### For Foundry Users

1. **Set up your deployer account**:
   ```bash
   # Generate a new account
   forge account new
   # OR import existing private key
   forge account import my-account
   ```

2. **Get testnet ETH**:
   - Visit the Status Network faucet to get testnet ETH for your deployer account
   - Check your account balance: `cast balance <YOUR_ADDRESS> --rpc-url statusSepolia`

3. **Deploy to Status Network Sepolia**:
   ```bash
   # Deploy using the pre-configured script
   forge script script/DeployHelloStatusNetwork.s.sol \
     --broadcast \
     --rpc-url statusSepolia \
     --private-key <YOUR_PRIVATE_KEY>
   
   # Deploy specific contract
   forge script script/Deploy.s.sol \
     --broadcast \
     --rpc-url statusSepolia \
     --private-key <YOUR_PRIVATE_KEY>
   ```

4. **Verify contracts on Blockscout**:
   ```bash
   # Verify using Foundry's verification script
   forge script script/VerifyAll.s.sol \
     --rpc-url statusSepolia \
     --private-key <YOUR_PRIVATE_KEY>
   ```

#### Important Notes for Status Network Extension

- **No local chain needed**: Deploy directly to the testnet; you do not need to run `yarn chain`.
- **Always specify network**: Use `--network statusSepolia` for deploy and verify.
- **Verification**: Use Blockscout, not Etherscan, for contract verification.
- **Gasless transactions**: Status Network is natively gasless; testnet ETH is optional. 
- **Faucet**: If you still want testnet ETH, see the faucet in our [docs](https://docs.status.network).


### Troubleshooting

- **Deployment fails**: Ensure you have given the `--network statusSepolia` option
- **Verification fails**: Status Network uses Blockscout, not Etherscan - make sure you're using the correct verification method
- **Network connection issues**: Verify the RPC URL `https://public.sepolia.rpc.status.network` is accessible
- **Private key issues**: Make sure your private key is properly configured in your environment or keystore

For more troubleshooting, consult the [Status Network docs](https://docs.status.network) and [Scaffold-ETH 2 guide](https://docs.scaffoldeth.io).

References:
- Status Network Docs: [`https://docs.status.network`](https://docs.status.network)
- Scaffold-ETH 2 Guide: [`https://docs.scaffoldeth.io`](https://docs.scaffoldeth.io)
- Blockscout Verification: [`https://docs.blockscout.com/devs/verification/hardhat-verification-plugin`](https://docs.blockscout.com/devs/verification/hardhat-verification-plugin)


### License

This project follows the same license as Scaffold‑ETH 2 unless otherwise noted.
