// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./DeployHelpers.s.sol";
import "../contracts/HelloStatusNetwork.sol";

contract DeployHelloStatusNetwork is ScaffoldETHDeploy {
    function run() external ScaffoldEthDeployerRunner {
        new HelloStatusNetwork();
    }
}
