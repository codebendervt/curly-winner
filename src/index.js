// import 'components/nav'

const algosdk = require('algosdk');
const algodToken = {
    'X-API-Key': "6unHRRccDh6g0guYKDODv5CtVyXrCzcn5zllVGOK"
}

const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
const algodPort = "";

let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

const passphrase = "consider notable either list liar moment bachelor near doll method cool vast motion draft issue vivid rare youth candy gown leaf audit gap above sure";

let myAccount = algosdk.mnemonicToSecretKey(passphrase)



const createAccount = () => {
    //creating account
    var account = algosdk.generateAccount();
    var passphrase = algosdk.secretKeyToMnemonic(account.sk);
    console.log("My address: " + account.addr);
    console.log("My passphrase: " + passphrase);
}

const checkAccountBalance = async () => {

    console.log("My address: %s", myAccount.addr)

    let accountInfo = await algodClient.accountInformation(myAccount.addr).do();
    console.log("Account balance: %d microAlgos", accountInfo.amount);

}

const constructTransaction = async () => {

    let params = await algodClient.getTransactionParams().do();
    console.log(params)
    // comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;
    const receiver = "SOOGSYLGQBNTSFYZX7UX5ETQGZ5524WNTYYYPLLNPOXL3MBMMEYUIWH4UM";
    let note = algosdk.encodeObj("Hello World");

    let txn = algosdk.makePaymentTxnWithSuggestedParams(myAccount.addr, receiver, 1000000, undefined, note, params);

    console.log(txn)
}

const checkStatus = async () => {
    let status = (await algodClient.status().do());
    console.log("Algorand network status: %o", status);
}

const checkSuggestedTransaction = async () => {

    let params = await algodClient.getTransactionParams().do();
    console.log("Algorand suggested parameters: %o", params)
}

// checkStatus()
// checkSuggestedTransaction()

// createAccount()

//checkAccountBalance()

constructTransaction()
//console.log(algodClient)