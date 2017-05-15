var Claimtoken = artifacts.require("./Claim_token.sol");

/*
Begin the test scripts by using key word "contract" instead of "describe" for solidity tests.
*/

contract('Global Claims',function(accounts){

  /*
  declaring variables globally
  */
     var claim;               //variable to hold instance of a claim         
     var cid = 12500;             //variable that holds claimId of a claim
     var cdesc = "Test";      //variable that holds description of a claim
     var camt = 500;          // variable that holds amount of a claim


/////********below tests will check for any raised claims are available********/////

it("should return false when raised claims are not available", function() {  //test should return 0 when there are no raised claims
    
    return Claimtoken.deployed().then(function(instance) {
      claim = instance;
     return claim.getClaimIDs();         //returning claimIds with out adding claims   
    }).then(function(count){             // function to check the claimIds count
      if(count != 0){
       return true;
      }
      else {
        return false;
      }
    }).then(function(fin_count) {              
      assert.equal(fin_count,false, "Test failed:Claims are available, returned true");    //comparing count of claimIds to expected value(0)
    });
  });

it("should return true when raised claims are available", function() {    //test should return 1 when there are raised claims
    return Claimtoken.deployed().then(function(instance) {
      claim = instance;    
     return claim.addClaim(cid,cdesc,camt);          //adding a claim
     then(function(){
    return claim.getClaimIDs();              //returning claimIds, one claim is available  
     }).then(function(count){                   // function to check the claimIds count
      if(count != 0){
       return true;
      }
      else {
        return false;
      }
    }).then(function(fin_count) {
      assert.equal(fin_count,true,"Test failed: No claims available, returned false");      //comparing count of claimIds to expected value(1)
    });
  });
});
  /*
  below test script tests the functionality of addClaim().
  */ 


   it("Should raise Claim successfully",function(){
      return Claimtoken.deployed().then(function(instance){
      claim = instance;
      return claim.checkClaimIDExistance(12500);    
              
    }).then(function(conf) {
      assert.equal(conf,true, "Test failed: ClaimId:12500 is already raised or not found in raised claims");    //comparing the result with expected value(true)
    });
    });


  /*
  below test scripts checks the existance of a claim
  */ 


it("Should return true if claim exists",function(){    
    return Claimtoken.deployed().then(function(instance){
    var claim = instance;
    return claim.checkClaimIDExistance(12500);              //checking the claim existance by passing raised claimId
    }).then(function(conf) {
    assert.equal(conf,true, "Test failed: Claims doesn't exist with claimId:12500");      //comparing the result with expected value(true)
    });
});


it("Should return false if claim doesn't exists",function(){    
     return Claimtoken.deployed().then(function(instance){
    var claim = instance;
     return claim.checkClaimIDExistance(12345);           //checking the claim existance by passing unraised claimId
    }).then(function(conf) {
      assert.equal(conf,false, "Test failed: Claims exists with claimId:12345");   //comparing the result with expected value(false)
    });
});




  /*
  below test scripts are to fetch the details of raised claim.
  */ 
 it("Should fetch the Amount of raised claim",function(){
     return Claimtoken.deployed().then(function(instance){
     claim = instance;
     return claim.getClaimAmountByClaimID(12500);                  //passing the claimId of raised claim to fetch amount
        }).then(function(amount){
          assert.equal(amount,500,"Test failed: Amount for claimid:12500 is not 500");  //comparing amount to expected value(500)
        
});
});
it("Should fetch the Description of raised claim",function(){
     return Claimtoken.deployed().then(function(instance){
     claim = instance;
     return claim.getClaimDescriptionByClaimID(12500);         //passing the claimId of raised claim to fetch description
        }).then(function(description){
            
            function myFunction() {                        //function to get required string and omit the unwanted byte value
            compare = description.split("\d+[\+-")[0];     //splitting the required string and unwanted byte values
          assert.equal(compare,"Test","Test failed: Description for claimId:12500 is not -Test");
           //comparing description to expected value(Test)  
          } 
});
});

  /*
  below test scripts are to fetch the details of unraised claim.
  These values should be 0.
  */

 it("Should return 0 when trying to fetch the Amount of unraised claim",function(){
     return Claimtoken.deployed().then(function(instance){
     claim = instance;
     return claim.getClaimAmountByClaimID(12345);               //passing unraised claim id to fetch amount
        }).then(function(amount){
          assert.equal(amount,0,"Test failed: Fetching amount for claimId:12345");  //comparing amount to expected value(0)
});
});
 it("Should return 0 when trying to fetch the description of unraised claim",function(){
     return Claimtoken.deployed().then(function(instance){
     claim = instance;
     return claim.getClaimDescriptionByClaimID(12345);          //passing unraised claim id to fetch description
        }).then(function(description){
          assert.equal(description,0,"Test failed: Fetching Description for claimId:12345"); 
          //comparing description to expected value(0)
});
});


/*
below test script should fetch the HR, RM and ES approval status.
By default these values should be false.
*/

 it("Should check the default HR approval status of a raised claim",function(){
     return Claimtoken.deployed().then(function(instance){
        claim = instance;
        return claim.getHRStatusByClaimID(12500);                //passing the claimId of a raised claim
        }).then(function(status){
          assert.equal(status,false,"Test failed:HR approval status of claimId:12500 is not false");
          // comparing HR's approval status to false
        });
});


  it("Should check the default RM approval status of a raised claim",function(){
     return Claimtoken.deployed().then(function(instance){
        claim = instance;
        return claim.getRMStatusByClaimID(12500);                 //passing the claimId of a raised claim
        }).then(function(status){
          assert.equal(status,false,"Test failed:RM approval status of claimId:12500 is not false"); // comparing RM's approval status to false
        });
});


  it("Should check the default ES approval status of a raised claim",function(){
     return Claimtoken.deployed().then(function(instance){
        claim = instance;
        return claim.getESStatusByClaimID(12500);                 //passing the claimId of a raised claim
        }).then(function(status){
          assert.equal(status,false,"Test failed:ES approval status of claimId:12500 is not false"); // ccomparing ES's approval status to false
        });
});



/*
below test scripts are to fetch the HR, RM and ES approval status of an unraised claim.
These values should be be 0.
*/

 it("Should return 0 when trying to fetch the HR approval status of unraised claim",function(){
     return Claimtoken.deployed().then(function(instance){
        claim = instance;
        return claim.getHRStatusByClaimID(12345);                //passing the claimId of an uraised claim
        }).then(function(status){
          assert.equal(status,0,"Test failed: HR status of claimId:12345 is available"); 
        });


});
 it("Should return 0 when trying to fetch the RM approval status of unraised claim",function(){
     return Claimtoken.deployed().then(function(instance){
        claim = instance;
        return claim.getRMStatusByClaimID(12345);                //passing the claimId of a unraised claim
        }).then(function(status){
          assert.equal(status,0,"Test failed: RM status of claimId:12345 is available"); 
        });


});
 it("Should return 0 when trying to fetch the ES approval status of unraised claim",function(){
     return Claimtoken.deployed().then(function(instance){
        claim = instance;
        return claim.getESStatusByClaimID(12345);                //passing the claimId of a unraised claim
        }).then(function(status){
          assert.equal(status,0,"Test failed: ES status of claimId:12345 is available");  
        });
});

});
