// Reference the example args file: https://github.com/scaffold-eth/create-eth-extensions/blob/example/extension/packages/foundry/foundry.toml.args.mjs
// Reference the template file that will use this file: https://github.com/scaffold-eth/create-eth/blob/main/templates/solidity-frameworks/foundry/packages/foundry/foundry.toml.template.mjs

// Default args:
export const extraProfileDefaults = `solc = "0.8.24"
evm_version = "paris"`;
export const extraRpcEndpoints = `statusSepolia = "https://public.sepolia.rpc.status.network"`;
export const extraEthercsanConfig = `statusSepolia = { key = "abc", url = "https://sepoliascan.status.network/api" }`;
export const extraFormattingConfig = "";
export const extraConfig = "";
