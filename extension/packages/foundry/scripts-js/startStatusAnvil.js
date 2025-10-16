#!/usr/bin/env node
import { spawn } from "child_process";

// Status Testnet (Sepolia) params from official docs.
// Ref: https://docs.status.network/general-info/network-details
const chainId = "31337"; // for compatibility with local anvil chain
const gasPriceWei = "0"; // gasless
// Set to Linea's typical block gas limit; override via env if needed
const blockGasLimit = "30000000";
const baseFeeWei = "0"; // gasless

const args = [
  "--chain-id",
  chainId,
  "--gas-price",
  gasPriceWei,
  "--gas-limit",
  blockGasLimit,
  "--base-fee",
  baseFeeWei,
];

console.log(`[anvil] Starting with args: ${args.join(" ")}`);
const child = spawn("anvil", args, { stdio: "inherit" });

child.on("exit", code => {
  process.exit(code ?? 0);
});

