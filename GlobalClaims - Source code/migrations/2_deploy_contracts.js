

var claimtoken = artifacts.require("./Claim_token.sol");
module.exports = function(deployer) {
 deployer.deploy(claimtoken);
 
};
