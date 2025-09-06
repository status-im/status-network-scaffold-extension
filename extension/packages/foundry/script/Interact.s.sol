// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../contracts/HelloStatusNetwork.sol";

contract InteractScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Get contract address from command line arguments
        address contractAddress = vm.parseAddress(vm.envString("CONTRACT_ADDRESS"));

        vm.startBroadcast(deployerPrivateKey);

        HelloStatusNetwork hello = HelloStatusNetwork(contractAddress);

        // Read current greeting
        string memory currentGreeting = hello.getGreet();
        console.log("Current greeting:", currentGreeting);

        // Update greeting
        hello.setGreet("Hello from Foundry!");

        vm.stopBroadcast();
    }
}
