// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DarkLeafCoin is ERC20 {
    // 10 billion coins just like matic
    constructor() ERC20("DarkLeafCoin", "DLC") {
        _mint(msg.sender, 10000000000 * 10 ** decimals());
    }
}
