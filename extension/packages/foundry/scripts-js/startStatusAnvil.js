#!/usr/bin/env node
import { spawn } from "child_process";

// Status Testnet (Sepolia) params from official docs.
// Ref: https://docs.status.network/general-info/network-details
const chainId = process.env.STATUS_SEPOLIA_CHAIN_ID || "1660990954"; // 0x6300b5ea
const gasPriceWei = process.env.STATUS_SEPOLIA_GAS_PRICE_WEI || "0"; // gasless
// Set to Linea's typical block gas limit; override via env if needed
const blockGasLimit = process.env.STATUS_SEPOLIA_BLOCK_GAS_LIMIT || "30000000";
const baseFeeWei = process.env.STATUS_SEPOLIA_BASE_FEE_WEI ?? "0"; // gasless

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

