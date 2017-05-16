pragma solidity ^0.4.8;
 
contract Claim_token{
    event claimRaised(uint _claimID, uint blockID);
 
    Claim[] public Claims;
 
    struct Claim{   
 
        uint claimAmount;
        bytes32 claimDescription;
        bool HR_st;
        bool RM_st;
        bool ES_App_st;
        uint ClaimID;
 
    }
 
    function addClaim(uint _claimID,  bytes32 _claimDescription, uint _claimAmount ) returns (bool success){
        
        Claim memory newClaim;
        newClaim.claimAmount = _claimAmount;
        newClaim.claimDescription = _claimDescription;
        newClaim.HR_st = false;
        newClaim.RM_st = false;
        newClaim.ES_App_st = false;
        newClaim.ClaimID = _claimID;
        Claims.push(newClaim);
        claimRaised(_claimID,block.number);
        return true;
 
    }
 
    function getClaimsWithStatus() constant returns(uint[], bytes32[], uint[], bool[], bool[], bool[]){
        
        uint length = Claims.length;
        bytes32[] memory claimDescriptions = new bytes32[](length);
        uint[] memory claimAmounts = new uint[](length);
        uint[] memory ClaimIDs = new uint[](length);
        bool[] memory HR_sts = new bool[](length);
        bool[] memory RM_sts = new bool[](length);
        bool[] memory ES_App_sts = new bool[](length);
 
        for (var i = 0; i < length; i++) {
 
            Claim memory currentClaim;
            currentClaim = Claims[i];
            claimAmounts[i] = currentClaim.claimAmount;
            claimDescriptions[i] = currentClaim.claimDescription;
            ClaimIDs[i] = currentClaim.ClaimID;
            HR_sts[i] = currentClaim.HR_st;
            RM_sts[i] = currentClaim.RM_st;
            ES_App_sts[i] = currentClaim.ES_App_st;
        
        }
 
        return(ClaimIDs,claimDescriptions,claimAmounts,HR_sts,RM_sts,ES_App_sts);
 
    }
 
    function getClaimIDs() constant returns (uint[]){
 
        uint length = Claims.length;
        uint[] memory ClaimIDs = new uint[](length);
 
        for (var i = 0; i < length; i++) {
 
          Claim memory currentClaim;
          currentClaim = Claims[i];
          ClaimIDs[i] = currentClaim.ClaimID;
        }
        return ClaimIDs;        
    }
 
    function getClaimDescriptions () constant returns(bytes32[]){
 
        uint length = Claims.length;
       bytes32[] memory claimDescriptions = new bytes32[](length);
        
        for (var i = 0; i < length; i++) {
 
            Claim memory currentClaim;
            currentClaim = Claims[i];
            claimDescriptions[i] = currentClaim.claimDescription;
            
         }
         return claimDescriptions;   
 
    }
 
 function getClaimAmounts () constant returns(uint[]){
 
        uint length = Claims.length;
        uint[] memory claimAmounts = new uint[](length);
        
        for (var i = 0; i < length; i++) {
 
            Claim memory currentClaim;
            currentClaim = Claims[i];
            claimAmounts[i] = currentClaim.claimAmount;
            
         }
         return claimAmounts;   
 
    }
 
 
function getClaimAmountByClaimID (uint _ClaimID) constant returns(uint){
 
        uint length = Claims.length;
        uint claimAmt;
        
        for (var i = 0; i < length; i++) {
 
            Claim memory currentClaim;
            currentClaim = Claims[i];
            
            if (currentClaim.ClaimID == _ClaimID){
            claimAmt = currentClaim.claimAmount;
            
         }
         }
         return (claimAmt);   
 
    }
 
function getClaimDescriptionByClaimID (uint _ClaimID) constant returns(bytes32){
 
        uint length = Claims.length;
        bytes32 claimDesc;
        
        for (var i = 0; i < length; i++) {
 
            Claim memory currentClaim;
            currentClaim = Claims[i];
            
            if (currentClaim.ClaimID == _ClaimID){
            claimDesc = currentClaim.claimDescription;
            
         }
         }
         return (claimDesc);   
 
    }


    function getHRStatusByClaimID(uint _claimID) constant returns(bool HR_status) {
 
        uint length = Claims.length;
             
        for (var i = 0; i < length; i++) {
            
            Claim memory currentClaim;
            currentClaim = Claims[i];
            
            if (currentClaim.ClaimID == _claimID){
                
                HR_status = currentClaim.HR_st;
            }
 
        }
        return(HR_status);
    }
 
function getRMStatusByClaimID(uint _claimID) constant returns(bool RM_status) {
 
        uint length = Claims.length;
             
        for (var i = 0; i < length; i++) {
            
            Claim memory currentClaim;
            currentClaim = Claims[i];
            
            if (currentClaim.ClaimID == _claimID){
                
                RM_status = currentClaim.RM_st;
            }
 
        }
        return(RM_status);
    }
 
    function getESStatusByClaimID(uint _claimID) constant returns(bool ES_status) {
 
        uint length = Claims.length;
            
        for (var i = 0; i < length; i++) {
            
            Claim memory currentClaim;
            currentClaim = Claims[i];
            
            if (currentClaim.ClaimID == _claimID){
                
                ES_status = currentClaim.ES_App_st;
            }
 
        }
        return(ES_status);
    }
 
    function checkClaimIDExistance(uint _claimID) constant returns (bool claimExistance){
 
        uint length = Claims.length;
        
      
        for (var i = 0; i < length; i++) {
 
          Claim memory currentClaim;
          currentClaim = Claims[i];
          
          if (currentClaim.ClaimID == _claimID) { 
              return true;
              }
          
         } return false;
 
    
 
    }
 
}