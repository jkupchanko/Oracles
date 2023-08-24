const LivePrice = artifacts.require("livePrice");

contract("LivePrice", (accounts) => {
  let livePrice = null;
  before(async () => {
    livePrice = await LivePrice.deployed();
  });

  it("Display Latest ETH/USD Prices", async () => {
    try {
      const EthPrice = await livePrice.getEthPrice();
      console.log(EthPrice.toString(10));
    } catch (error) {
      console.log("Amount not displaying here is why:", error);
    }
  });

  // AND ""... same process for all.
});
