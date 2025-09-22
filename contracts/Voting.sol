// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    address public admin;
    bool public electionActive;

    event votedEvent(uint indexed candidateId);
    event electionStarted();
    event electionEnded();

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    modifier whenElectionActive() {
        require(electionActive, "Election is not active.");
        _;
    }

    constructor() {
        admin = msg.sender;
        electionActive = false;
        addCandidate("Candidate A");
        addCandidate("Candidate B");
        addCandidate("Candidate C");
    }

    function addCandidate(string memory _name) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function startElection() public onlyAdmin {
        electionActive = true;
        emit electionStarted();
    }

    function endElection() public onlyAdmin {
        electionActive = false;
        emit electionEnded();
    }

    function vote(uint _candidateId) public whenElectionActive {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate.");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit votedEvent(_candidateId);
    }
}
