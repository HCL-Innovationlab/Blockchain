var web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var account_claim = 'ab1ae7fa14794716d8ca20bc4171ce11c78446dc';
var add_claim = '0x502be5e204d40973cfefb622020bc81772a89920';
var abi_claim = [{ "constant": true, "inputs": [], "name": "getClaimIDs", "outputs": [{ "name": "", "type": "uint256[]" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_ClaimID", "type": "uint256" }], "name": "getClaimAmountByClaimID", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_claimID", "type": "uint256" }], "name": "checkClaimIDExistance", "outputs": [{ "name": "claimExistance", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_claimID", "type": "uint256" }], "name": "getHRStatusByClaimID", "outputs": [{ "name": "HR_status", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_ClaimID", "type": "uint256" }], "name": "getClaimDescriptionByClaimID", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_claimID", "type": "uint256" }], "name": "getESStatusByClaimID", "outputs": [{ "name": "ES_status", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getClaimsWithStatus", "outputs": [{ "name": "", "type": "uint256[]" }, { "name": "", "type": "bytes32[]" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "bool[]" }, { "name": "", "type": "bool[]" }, { "name": "", "type": "bool[]" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_claimID", "type": "uint256" }, { "name": "_claimDescription", "type": "bytes32" }, { "name": "_claimAmount", "type": "uint256" }], "name": "addClaim", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_claimID", "type": "uint256" }], "name": "getRMStatusByClaimID", "outputs": [{ "name": "RM_status", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "Claims", "outputs": [{ "name": "claimAmount", "type": "uint256" }, { "name": "claimDescription", "type": "bytes32" }, { "name": "HR_st", "type": "bool" }, { "name": "RM_st", "type": "bool" }, { "name": "ES_App_st", "type": "bool" }, { "name": "ClaimID", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getClaimDescriptions", "outputs": [{ "name": "", "type": "bytes32[]" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getClaimAmounts", "outputs": [{ "name": "", "type": "uint256[]" }], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_claimID", "type": "uint256" }, { "indexed": false, "name": "blockID", "type": "uint256" }], "name": "claimRaised", "type": "event" }];

var noFirstZeroCid = document.getElementById("claimIDHelp"),
    noFirstZeroAmt = document.getElementById("amountHelp"),
    cIdField = document.getElementById("claimID"),
    amtField = document.getElementById("amount"),
    descField = document.getElementById("description"),
    subButtonStatus = document.getElementById("submitButton"),
    overlay = document.getElementById("overlay"),
    msg = document.getElementById("msgs");
    if(msg){
        msg.innerHTML = "";
    }
var viewFlag = false;
if (!localStorage.getItem('ClaimTxnKey')) {
    localStorage.setItem('ClaimTxnKey', []);
}

if (!localStorage.getItem('txnId')) {
    localStorage.setItem('txnId', []);
}
function setLocalStorage(claims) {
    localStorage.setItem('ClaimTxnKey', claims)
}
function getLocalStorage() {
    return JSON.parse(localStorage.getItem('ClaimTxnKey'));

}
function generateRows() {
    var htmlString = "";
    var claimtoken = web3.eth.contract(abi_claim).at(add_claim);
    claimtoken.getClaimsWithStatus(function (error, result) {
        if (!error) {
            console.log("Result", result);
        }
        var claimIdArray = result[0], claimIdLength = claimIdArray.length;
        for (var i = 0; i < claimIdLength; i++) {
            htmlString += '<tr><td>' + (i + 1) + '<td id="linkTD' + i + '">' + result[0][i]['c'][0] + '</td><td class="hidden-sm">' + result[2][i]['c'] + '</td><td>' + web3.toAscii(result[1][i]) +
                '</td><td id="statusTD' + i + '"><span class="label label-info">Pending</span></td></tr>';

        }
        document.getElementById("tableBodyContainer").innerHTML = htmlString;
        for (var i = 0; i < claimIdLength; i++) {
            var newIntervalForLinks = new TDView(claimIdArray[i].c[0], i)
        }
    });

}
function viewClaimsOnLoad() {
    watchClaims();
    generateRows();
}


function TDView(tblClaimId, i) {
    var ClaimTxnKeyVar = getLocalStorage();
    var getMatchedObj = _.filter(ClaimTxnKeyVar, function (lsObj) {
        if (lsObj.claimIDVal === tblClaimId) {
            return lsObj;
        }

    });
    console.log('getMatchedObj value', getMatchedObj);
    if (getMatchedObj.length > 0) {
        web3.eth.getTransactionReceipt(getMatchedObj[0].transactionhashVal, function (err, opt) {
            if (!err) {
                console.log(getMatchedObj[0].claimIDVal, opt);
                document.getElementById('linkTD' + i).innerHTML = '<a  href="#." onclick="transactionDetails(\'' + getMatchedObj[0].transactionhashVal + '\')">'
                    + getMatchedObj[0].claimIDVal + '</a>';
                document.getElementById('statusTD' + i).innerHTML = '<span class="label label-success">Success</span>';
            }
        });
    }
    viewFlag = true;
    if (viewFlag === true) {
    }
}
var flagOnLoad=false;
function setFlag(){
flagOnLoad=true;
}
var setTime =0;
function watchClaims(flag) {
    clearTimeout(setTime);
    var claimtoken = web3.eth.contract(abi_claim).at(add_claim);
    var eventClaimRaised = claimtoken.claimRaised({ _from: add_claim });
    eventClaimRaised.watch(function (err, result) {
        if (err) {
            console.log(err)
            return;
        }
        console.log('transactionhashVal', result.transactionHash);
        console.log('claimIDVal', result.args._claimID.c[0]);
        if (result.args._claimID.c[0]) {
            if(overlay){
                overlay.style.display = "none";
            }
        }
        var obj = { claimIDVal: result.args._claimID.c[0], transactionhashVal: result.transactionHash }
        var singleObj = [];
        if (localStorage.getItem('ClaimTxnKey') == '' || localStorage.getItem('ClaimTxnKey') == "[]") {
            singleObj.push(obj);
            localStorage.setItem('ClaimTxnKey', singleObj);
        }
        else {
            singleObj = getLocalStorage();
            singleObj.push(obj);
        }
        var finalClaimList = _.map(_.groupBy(singleObj, function (doc) {
            return doc.claimIDVal;
        }), function (grouped) {
            return grouped[0];
        });
        setLocalStorage(JSON.stringify(finalClaimList));
        if(flagOnLoad){
           //  alert();
              msg.innerHTML="";
              msg.style.color="";
              flagOnLoad=false;
         }
         else{
             if(msg){
             if(document.getElementById("claimID") && (parseInt(document.getElementById("claimID").value) === result.args._claimID.c[0])){
                    msg.innerHTML="Transaction generated successfully";
                    msg.style.color="#5fb611";
                    document.getElementById("claimID").value='';
                    document.getElementById("amount").value='';
                     document.getElementById("description").value='';
             }
             
             setTime = setTimeout(function(){
                  msg.innerHTML="";
                 // document.getElementById("submitButton").disabled = false;

             },3000)
             }
         }
        
         

    });
    if (flag === true) {
    }
}
function submitClick() {
  
    var claimId = document.getElementById("claimID").value;
    var amount = document.getElementById("amount").value;
    var description = document.getElementById("description").value;
    document.getElementById("submitButton").disabled = true;
    if (!claimId || !amount || !description) {
        document.getElementById("submitButton").disabled = true;
    }
    var claimtoken = web3.eth.contract(abi_claim).at(add_claim);
    claimtoken.checkClaimIDExistance(claimId, function (_erro, _respo) {
        if (!_respo) {
            var tx = claimtoken.addClaim(claimId, description, amount, { from: account_claim, gas: 200000 });
             msg.innerHTML="";
        }
        else {
            msg.innerHTML="Claim already exists";
             msg.style.color="red";
            overlay.style.display = "none";
        }
    });
    //overlay.style.display = "block";
}
function transactionDetails(id) {
    localStorage.setItem('txnId', id.toString());
    document.location.href = 'transactionDetails.html';
}

var blockInfoStart = `<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"> `;
var blockInfoHtmlPanel = `<div class="panel-body"><div class="row"><div class="col-md-12">`;
var blockInfoEnd = `</div></div></div></div></div>`;

var accordionArrows = `<i class="fa fa-arrow-right" aria-hidden="true" title="Click To Expand"></i>
                    <i class="fa fa-arrow-down" aria-hidden="true" title="Click To Collapse"></i>`;
function getBlockID() {
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    var claimtoken = web3.eth.contract(abi_claim).at(add_claim);
    var accordionPanel = '';

    for (j = 1; j <= web3.eth.getBlock('latest').number; j++) {
        //console.log(j);
        var transactionDetails
        if (web3.eth.getBlock(j).transactions.length > 0) {
            transactionDetails = '';
            for (var k = 0; k < web3.eth.getBlock(j).transactions.length; k++) {
                transactionDetails = transactionDetails + '<a target="_blank" onclick="transactionDetails(\'' + web3.eth.getBlock(j).transactions[k] + '\')" class="form-control">' + web3.eth.getBlock(j).transactions[k] + '</a>';
            }
            //console.log(transactionDetails);
            //console.log(web3.eth.getBlock(j).transactions);
        }
        else {
            transactionDetails = '';
        }
        var time = web3.eth.getBlock(j).timestamp;
        var time1 = new Date(time * 1000);
        accordionPanel = accordionPanel +
            blockInfoStart +
            `<a class="accordion-toggle collapsed col-md-4" data-toggle="collapse" data-parent="#accordion-1" ` + 'href="#collapse-' + j + '" aria-expanded="false">' +
            accordionArrows + Number(web3.eth.getBlock(j).number) + '</a>' +
            '<p class="col-md-2  txtRight small">No. of Txn :' + web3.eth.getBlock(j).transactions.length + '</p>' +
            '<p class="col-md-2  txtRight small">Time:'+time1.toLocaleString()+ '</p>' +
            '</div></h4><div id="collapse-' + j + '" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">' +
            transactionDetails + blockInfoEnd;
    }
    document.getElementById('accordion-1').innerHTML = accordionPanel;
      overlay.style.display = "none";
}
function transactionDetailOnLoad() {
    var txnHash = localStorage.getItem('txnId');
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    var claimtoken = web3.eth.contract(abi_claim).at(add_claim);
    document.getElementById("TxHash").innerHTML = txnHash;
    var txnReceipt = web3.eth.getTransactionReceipt(txnHash);
    var blockDetails = web3.eth.getBlock(txnReceipt.blockNumber);
    console.log(web3.eth.getTransactionReceipt(txnHash));
    document.getElementById("blockNumber").innerHTML = txnReceipt.blockNumber;
    document.getElementById("from").innerHTML = txnReceipt.from;
    document.getElementById("to").innerHTML = txnReceipt.to;
    document.getElementById("gasUsed").innerHTML = txnReceipt.gasUsed;
    document.getElementById("cumulativeGasUsed").innerHTML = txnReceipt.cumulativeGasUsed;
    document.getElementById("blockHash").innerHTML = blockDetails.hash;
    document.getElementById("blockDifficulty").innerHTML = blockDetails.difficulty;
    document.getElementById("blockGasUsed").innerHTML = blockDetails.gasUsed;
    document.getElementById("gasLimit").innerHTML = blockDetails.gasLimit;
    document.getElementById("nonce").innerHTML = blockDetails.nonce;
    document.getElementById("blockSize").innerHTML = blockDetails.size;
    document.getElementById("parentHash").innerHTML = blockDetails.parentHash;
    document.getElementById("miner").innerHTML = blockDetails.miner;
    overlay.style.display = "none";
}
function transactionViewPage() {
    var claimtoken = web3.eth.contract(abi_claim).at(add_claim);

    var tx = claimtoken.addClaim(100, "Transaction view", 999, { from: account_claim, gas: 200000 });
    var getter = web3.eth.getTransactionReceipt('0xef3b8fe44d50c64d761e018cdc2dd7846236af26ae8d57b2bd7e4f970e760ff6');
    console.log(getter);
}

/////*************************VALIDATIONS********************** */////


function noFirstZero() {
    var firstZeroI1 = document.getElementById("claimID").value.charAt(0);
    if (firstZeroI1 == '0') {
        noFirstZeroCid.innerHTML = 'Cannot start with zero!!';
        noFirstZeroCid.style.color = "red";
        document.getElementById("claimID").style.border = "1px solid #d9534f";
        return
    }
    else {
        document.getElementById("claimID").innerHTML = '';
        document.getElementById("claimID").style.border = "1px solid #3c763d";
        noFirstZeroCid.innerHTML = '';
    }
    checkAllFields();
}
function noFirstZeroA() {
    var firstZeroI2 = document.getElementById("amount").value.charAt(0);
    if (firstZeroI2 == '0') {

        noFirstZeroAmt.innerHTML = 'Cannot start with zero!!';
        noFirstZeroAmt.style.color = "red";
        document.getElementById("amount").style.border = "1px solid #d9534f";
        return
    }
    else if(firstZeroI2 == '-' || firstZeroI2 == '+' || firstZeroI2 == '.'){
alert("wrkng");
    }
    else {
        document.getElementById("amount").innerHTML = '';
        document.getElementById("amount").style.border = "1px solid #3c763d";
        noFirstZeroAmt.innerHTML = '';
    }
    checkAllFields();
}
function isNumberCid(evt) {
    noFirstZeroCid = document.getElementById('claimIDHelp');
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode, numberCheck = cIdField.value;
    if (!noFirstZero()) {
        return
    } else {
        checkAllFields();
    };
}

function isNumberAmt(evt) {
    noFirstZeroAmt = document.getElementById('amountHelp');
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode, numberCheck = amtField.value;
    if (!noFirstZeroA()) {
        return
    } else {
        checkAllFields();
    };
}
function isDescription(evt) {
    checkAllFields();
}
function checkAllFields() {
    if (!(cIdField.value && amtField.value && descField.value)) {
        subButtonStatus.disabled = true;
    }
    else {
        subButtonStatus.disabled = false;
    }
}



            /////*************************VALIDATIONS-END********************** */////