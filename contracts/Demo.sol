pragma solidity ^0.4.17;

contract Demo {
    string public message;

    function Demo(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
}
