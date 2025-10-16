import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "HelloStatusNetwork" using the deployer account.
 * The contract has no constructor arguments.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployHelloStatusNetwork: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("HelloStatusNetwork", {
    from: deployer,
    // Contract constructor arguments
    args: [],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const hello = await hre.ethers.getContract<Contract>("HelloStatusNetwork", deployer);
  console.log("👋 Initial greet:", await hello.getGreet());
};

export default deployHelloStatusNetwork;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags HelloStatusNetwork
deployHelloStatusNetwork.tags = ["HelloStatusNetwork"];
