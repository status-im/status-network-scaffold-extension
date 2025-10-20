// Reference the example args file: https://github.com/scaffold-eth/create-eth-extensions/blob/example/extension/packages/nextjs/scaffold.config.ts.args.mjs
// Reference the template file that will use this file: https://github.com/scaffold-eth/create-eth/blob/main/templates/base/packages/nextjs/scaffold.config.ts.template.mjs

// Default args:
export const preContent = "";
export const extraConfigTypeName = "";
export const configOverrides = {
     // `viem.chains` provides the `statusSepolia` chain object with all the necessary chain information
    targetNetworks: ["$$chains.statusSepolia$$"],
    rpcOverrides: {
        "$$[chains.statusSepolia.id]$$": "https://public.sepolia.rpc.status.network",
    },
    onlyLocalBurnerWallet: false,   // to allow Burner Wallets usage on Status Network Sepolia
};
export const skipLocalChainInTargetNetworks = true;     // to enforce connection to Status Network Sepolia
