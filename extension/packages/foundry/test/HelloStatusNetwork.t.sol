// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../contracts/HelloStatusNetwork.sol";

contract HelloStatusNetworkTest is Test {
    HelloStatusNetwork hello;

    function setUp() public {
        hello = new HelloStatusNetwork();
    }

    function testGreeting() public {
        assertEq(hello.getGreet(), "Hello, Status Network!");

        hello.setGreet("New greeting");
        assertEq(hello.getGreet(), "New greeting");
    }
}
