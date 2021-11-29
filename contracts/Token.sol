// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor () ERC20("Token", "TOK"){

    }

    function mint(address _to, uint _amount) public {
        _mint(_to, _amount);
    }

    function transfer(address _to, uint _amount) public override returns(bool) {
        _transfer(msg.sender, _to, _amount);
        return (true);
    }

    function burn(address _burnFrom, uint _amount) public returns(bool) {
        _burn(_burnFrom, _amount);
        return (true);
    }
}