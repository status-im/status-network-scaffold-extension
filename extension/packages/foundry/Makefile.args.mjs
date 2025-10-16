export const recipes = `
# Deploy the contracts with explicit zero gas price on EIP-1559 chains (Status/Linea/etc.)
deploy-status:
	@if [ ! -f "$(DEPLOY_SCRIPT)" ]; then 		echo "Error: Deploy script '$(DEPLOY_SCRIPT)' not found"; 		exit 1; 	fi
	@if [ "$(RPC_URL)" = "localhost" ]; then \
		if [ "$(ETH_KEYSTORE_ACCOUNT)" = "scaffold-eth-default" ]; then \
			forge script $(DEPLOY_SCRIPT) --rpc-url localhost --password localhost --broadcast --ffi --evm-version paris --with-gas-price 0 --priority-gas-price 0; \
		else \
			forge script $(DEPLOY_SCRIPT) --rpc-url localhost --broadcast --ffi --evm-version paris --with-gas-price 0 --priority-gas-price 0; \
		fi \
	else \
		forge script $(DEPLOY_SCRIPT) --rpc-url $(RPC_URL) --broadcast --ffi --evm-version paris --with-gas-price 0 --priority-gas-price 0; \
	fi

# Deploy (status mode) and generate ABIs
deploy-status-and-generate-abis: deploy-status generate-abis
`;

export const postDeployRecipeToRun = "";