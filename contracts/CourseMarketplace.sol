// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract CourseMarketPlace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint id;
        uint price;
        bytes32 proof;
        address owner;
        State state;
    }

    // mapping of courseHash to Course data
    mapping(bytes32 => Course) private ownedCourses;

    // mapping of courseID to courseHash
    mapping(uint => bytes32) private ownedCourseHash;

    //number of all courses + id of the course
    uint private totalOwnedCourses;

    address payable private owner;

    constructor () {
        setContractOwner(msg.sender);
    }

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert("only owner has an accesss!");
        }
        _;
    }

    function purchaseCourse (
        bytes16 courseId,
        bytes32 proof
    )
        external
        payable
    {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

        if (hasCourseOwnership(courseHash)){
            revert("Course has already a Owner!");
        }

        uint id = totalOwnedCourses++;
        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id : id,
            price : msg.value,
            proof : proof,
            state : State.Purchased,
            owner : msg.sender
        });
    }

    function tansferOwnership (address newOwner)
        external
        onlyOwner
    {
        setContractOwner(newOwner);
    }

    function getCourseCount()
        external
        view
        returns (uint)
        {
            return totalOwnedCourses;
        }

    function getCourseHashAtIndex(uint index) 
        external
        view 
        returns (bytes32)
        {
            return ownedCourseHash[index];
        }

    function getCourseByHash(bytes32 courseHash)
        external
        view
        returns (Course memory)
        {
            return ownedCourses[courseHash];
        }

    function getContractOwner()
        public
        view
        returns (address)
        {
            return owner;
        }

    function setContractOwner(address newOwner) 
        private 
        {
            owner = payable(newOwner);
        }
    
    function hasCourseOwnership (bytes32 courseHash)
        private
        view
        returns (bool)
        {
            return ownedCourses[courseHash].owner == msg.sender;
        }
}