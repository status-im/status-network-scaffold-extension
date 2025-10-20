export const recipes = `# Verify contracts on Status Network Sepolia
verify-status:
	forge script script/VerifyStatusNetwork.s.sol --ffi --rpc-url $(RPC_URL)
`;

export const postDeployRecipeToRun = "";