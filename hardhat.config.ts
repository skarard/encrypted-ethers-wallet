/** @type import('hardhat/config').HardhatUserConfig */
import "@nomicfoundation/hardhat-toolbox";

module.exports = {
  solidity: "0.8.17",
  mocha: {
    timeout: 40000,
  },
};
