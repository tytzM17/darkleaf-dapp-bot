// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// v1.0, bare bones, no staking, no governance yet
contract DarkLeaf {
    ERC20 private _dlc;

    struct Author {
        uint256 rewards;
        bytes32[] cids;
        address payable account;
        bool hasInitReward;
    }

    address public manager; // Manager of the contract
    mapping(uint256 => Author) public authors; // Holds all created Authors
    uint256 public totalAuthors = 0; // Number of created Authors

    constructor(ERC20 dlc) {
        manager = msg.sender;
        _dlc = dlc;
    }

    modifier onlyManager() {
        // Modifier
        require(msg.sender == manager, "Only manager can call this.");
        _;
    }

    // erc20 functions
    function deposit(uint256 amount) public onlyManager {
        uint256 allowance = _dlc.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check your token allowance");
        _dlc.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint256 amount) public onlyManager {
        uint256 balance = _dlc.balanceOf(address(this));
        require(amount <= balance, "Not enough tokens in the reserve");
        _dlc.transfer(msg.sender, amount);
    }

    // when user has a first upload, create user as author
    function createAuthor(bytes32 _cid) public {
        require(_cid != "" || _cid[0] != 0, "CID not found");

        Author storage author = authors[totalAuthors];
        author.cids.push(_cid);
        author.account = payable(msg.sender);
        author.rewards = 0;
        totalAuthors++;
    }

    // user reward to author
    function giveToAuthor(
        address _author,
        uint256 _authorID,
        uint256 _amount
    ) public {
        require(_author != msg.sender, "Cannot reward self");
        require(_authorID < totalAuthors, "Author ID not found");
        require(_amount > 0, "Reward cannot be zero");

        // approve then
        uint256 allowance = _dlc.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Check your token allowance");
        _dlc.transferFrom(msg.sender, _author, _amount);

        authors[_authorID].rewards += _amount;
    }  
}
