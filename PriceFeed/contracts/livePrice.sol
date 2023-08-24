// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract livePrice {
    AggregatorV3Interface internal ethPriceFeed;
    AggregatorV3Interface internal ethARPThirty;
    AggregatorV3Interface internal ethARPNinty;
    AggregatorV3Interface internal ethTwentyFourVolatility;
    AggregatorV3Interface internal linkPriceFeed;
    AggregatorV3Interface internal linkTwentyFourVolatility;

    constructor() {
        ethPriceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306); // ETH / USD
        ethARPThirty = AggregatorV3Interface(0xceA6Aa74E6A86a7f85B571Ce1C34f1A60B77CD29); // 30-Day ETH APR
        ethARPNinty = AggregatorV3Interface(0x7422A64372f95F172962e2C0f371E0D9531DF276); // 90-Day ETH APR
        ethTwentyFourVolatility = AggregatorV3Interface(0x31D04174D0e1643963b38d87f26b0675Bb7dC96e); // ETH-USD 24hr Realized Volatility
        linkPriceFeed = AggregatorV3Interface(0xc59E3633BAAC79493d908e63626716e204A45EdF); // LINK / USD
        linkTwentyFourVolatility = AggregatorV3Interface(0xfD59B51F25E0Ab790a4F0c483BaC194FA0479D29); // LINK-USD 24hr Realized Volatility
    }

    function getEthPrice() public view returns (int) {
        (, int price,,,) = ethPriceFeed.latestRoundData();
        return price;
    }

    function getEthAPR30Day() public view returns (int) { 
        (, int price,,,) = ethARPThirty.latestRoundData();
        return price;
    }

    function getEthAPR90Day() public view returns (int) {
        (, int price,,,) = ethARPNinty.latestRoundData();
        return price;
    }

    function getEthAPR24Volatility() public view returns (int) {
        (, int price,,,) = ethTwentyFourVolatility.latestRoundData();
        return price;
    }

    function getLinkPrice() public view returns (int) {
        (, int price,,,) = linkPriceFeed.latestRoundData();
        return price;
    }

    function getLinkAPR24Volatility() public view returns (int) {
        (, int price,,,) = linkTwentyFourVolatility.latestRoundData();
        return price;
    }
}
