//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "forge-std/Vm.sol";
import "solidity-bytes-utils/BytesLib.sol";

/**
 * @dev Temp Vm implementation
 * @notice calls the tryffi function on the Vm contract
 * @notice will be deleted once the forge/std is updated
 */
struct FfiResult {
    int32 exit_code;
    bytes stdout;
    bytes stderr;
}

interface tempVm {
    function tryFfi(string[] calldata) external returns (FfiResult memory);
}

contract VerifyStatusNetwork is Script {
    uint96 currTransactionIdx;

    function run() external {
        string memory root = vm.projectRoot();
        string memory path =
            string.concat(root, "/broadcast/Deploy.s.sol/", vm.toString(block.chainid), "/run-latest.json");
        string memory content = vm.readFile(path);

        while (nextTransaction(content)) {
            _verifyIfContractDeployment(content);
            currTransactionIdx++;
        }
    }

    function _verifyIfContractDeployment(string memory content) internal {
        string memory txType =
            abi.decode(vm.parseJson(content, searchStr(currTransactionIdx, "transactionType")), (string));
        if (keccak256(bytes(txType)) == keccak256(bytes("CREATE"))) {
            _verifyContract(content);
        }
    }

    function _verifyContract(string memory content) internal {
        string memory contractName =
            abi.decode(vm.parseJson(content, searchStr(currTransactionIdx, "contractName")), (string));
        address contractAddr =
            abi.decode(vm.parseJson(content, searchStr(currTransactionIdx, "contractAddress")), (address));
        bytes memory deployedBytecode =
            abi.decode(vm.parseJson(content, searchStr(currTransactionIdx, "transaction.input")), (bytes));
        bytes memory compiledBytecode =
            abi.decode(vm.parseJson(_getCompiledBytecode(contractName), ".bytecode.object"), (bytes));
        bytes memory constructorArgs = BytesLib.slice(
            deployedBytecode, compiledBytecode.length, deployedBytecode.length - compiledBytecode.length
        );

        // Build the forge verify command with Blockscout for Status Network
        string[] memory inputs;
        if (block.chainid == 1660990954) {
            // Status Network Sepolia - use Blockscout
            inputs = new string[](11);
            inputs[0] = "forge";
            inputs[1] = "verify-contract";
            inputs[2] = vm.toString(contractAddr);
            inputs[3] = contractName;
            inputs[4] = "--chain";
            inputs[5] = vm.toString(block.chainid);
            inputs[6] = "--verifier";
            inputs[7] = "blockscout";
            inputs[8] = "--verifier-url";
            inputs[9] = "https://sepoliascan.status.network/api";
            inputs[10] = "--watch";
        } else {
            // Other networks - use default verification
            inputs = new string[](9);
            inputs[0] = "forge";
            inputs[1] = "verify-contract";
            inputs[2] = vm.toString(contractAddr);
            inputs[3] = contractName;
            inputs[4] = "--chain";
            inputs[5] = vm.toString(block.chainid);
            inputs[6] = "--constructor-args";
            inputs[7] = vm.toString(constructorArgs);
            inputs[8] = "--watch";
        }

        FfiResult memory f = tempVm(address(vm)).tryFfi(inputs);

        if (f.stderr.length != 0) {
            console.logString(string.concat("Submitting verification for contract: ", vm.toString(contractAddr)));
            console.logString(string(f.stderr));
        } else {
            console.logString(string(f.stdout));
        }
        return;
    }

    function nextTransaction(string memory content) internal view returns (bool) {
        string memory hashPath = searchStr(currTransactionIdx, "hash");

        try vm.parseJson(content, hashPath) returns (bytes memory hashBytes) {
            if (hashBytes.length == 0) {
                return false;
            }
            return true;
        } catch {
            return false;
        }
    }

    function _getCompiledBytecode(string memory contractName) internal view returns (string memory compiledBytecode) {
        string memory root = vm.projectRoot();
        string memory path = string.concat(root, "/out/", contractName, ".sol/", contractName, ".json");
        compiledBytecode = vm.readFile(path);
    }

    function searchStr(uint96 idx, string memory searchKey) internal pure returns (string memory) {
        return string.concat(".transactions[", vm.toString(idx), "].", searchKey);
    }
}
