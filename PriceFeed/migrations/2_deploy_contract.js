const LivePrice = artifacts.require("livePrice");

module.exports = function (deployer) {
  deployer.deploy(LivePrice);
};
