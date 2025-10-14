// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import "../contracts/HelloStatusNetwork.sol";

/**
 * @notice Deploy script for HelloStatusNetwork contract
 * @dev Inherits ScaffoldETHDeploy which:
 *      - Includes forge-std/Script.sol for deployment
 *      - Includes ScaffoldEthDeployerRunner modifier
 * Example:
 * yarn deploy --file DeployHelloStatusNetwork.s.sol  # local anvil chain
 * yarn deploy --file DeployHelloStatusNetwork.s.sol --network optimism # live network (requires keystore)
 */
contract DeployHelloStatusNetwork is ScaffoldETHDeploy {
    /**
     * @dev Deployer setup based on `ETH_KEYSTORE_ACCOUNT` in `.env`:
     *      - "scaffold-eth-default": Uses Anvil's account #9 (0xa0Ee7A142d267C1f36714E4a8F75612F20a79720), no password prompt
     *      - "scaffold-eth-custom": requires password used while creating keystore
     *
     * Note: Must use ScaffoldEthDeployerRunner modifier to:
     *      - Export contract addresses & ABIs to `nextjs` packages
     */
    function run() external ScaffoldEthDeployerRunner {
        new HelloStatusNetwork();
    }
}
