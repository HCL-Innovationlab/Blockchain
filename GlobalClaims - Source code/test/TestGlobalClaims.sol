pragma solidity ^0.4.2;

// Import all necessary files for running test scripts

import "truffle/Assert.sol";
import "../contracts/Claim_token.sol";

/*
Begin the test scripts by using key word "contract" instead of "describe" for solidity tests.
*/

contract TestGlobalClaims {    //contract name should be same as the file name
 
//creating object globally

        Claim_token test = new Claim_token();  
        
  
  /*
  below test script tests the functionality of addClaim().
  On successful raise of claim the function returns true
  */ 
   function testAddClaim() {
      
        Assert.equal(test.addClaim(12500,"Test",500),true,"Claim Raising failed");
    }
  /*
  below test script tests the functionality of ClaimIDExistance().
  If claim exists, function returns true else returns false
  */ 
 function testcheckClaimIDExistance()  {

        Assert.equal(test.checkClaimIDExistance(12500),true,"Test failed: Claim doesn't exists");
        
 }
  function testcheckClaimIDExistanceShouldFail()  {

        Assert.equal(test.checkClaimIDExistance(12345),false,"Test failed: Claim already exists");
        
 }
  /*
  below test script tests the functionality of getClaimAmountByClaimID().
  It fetches the amount of raised claim by passing claimid
  */ 
    function testgetClaimAmountByClaimID() {

    Assert.equal(test.getClaimAmountByClaimID(12500),500,"Test failed: Amount fetching failed");
     }

    function testgetClaimAmountByClaimIDShouldFail() {

    Assert.equal(test.getClaimAmountByClaimID(12345),0,"Test failed: Amount fetching succeeded");
     }

     
  /*
  below test script tests the functionality of getClaimDescriptionByClaimID().
  It fetches the description of raised claim by passing claimid
  */ 

    function testgetClaimDescriptionByClaimID() {

        Assert.equal(test.getClaimDescriptionByClaimID(12500),"Test","Test failed: Description fetching failed");

    }
  
      function testgetClaimDescriptionByClaimIDShouldFail() {

        Assert.equal(test.getClaimDescriptionByClaimID(12345),0,"Test failed: Description fetching succeeded");

    }



  /*
  below test script tests the functionality of getHRStatusByClaimID().
  It checks the HR approval status for current raised claim by passing claimid.
  By default its value is false
  */ 

    function testgetHRStatusByClaimID() {

        Assert.equal(test.getHRStatusByClaimID(12500),false,"Test failed: Fetching HR approval status failed or by default status is 'True'");

    }

      function testgetHRStatusByClaimIDShouldFail() {

        Assert.equal(test.getHRStatusByClaimID(12345),false,"Test failed: Fetching HR approval status succeeded");

    }


  /*
  below test script tests the functionality of getRMStatusByClaimID().
  It checks the RM approval status for current raised claim by passing claimid.
  By default its value is false
  */ 

    function testgetRMStatusByClaimID() {

        Assert.equal(test.getRMStatusByClaimID(12500),false,"Test failed: Fetching RM approval status failed or by default status is 'True'");

    }

    function testgetRMStatusByClaimIDShouldFail() {

        Assert.equal(test.getRMStatusByClaimID(12345),false,"Test failed: Fetching RM approval status succeeded");

    }


  /*
  below test script tests the functionality of getESStatusByClaimID().
  It checks the ES approval status for current raised claim by passing claimid.
  By default its value is false
  */ 


    function testgetESStatusByClaimID() {

        Assert.equal(test.getESStatusByClaimID(12500),false,"Test failed: Fetching ES approval status failed or by default status is 'True'");

    }  
      function testgetESStatusByClaimIDShouldFail() {

        Assert.equal(test.getESStatusByClaimID(12345),false,"Test failed: Fetching ES approval status succeeded");

    }  

   }