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


    //sign transaction

    let signedTxn = txn.signTxn(myAccount.sk);
    let txId = txn.txID().toString();
    console.log("Signed transaction with txID: %s", txId);

    //submit

    await algodClient.sendRawTransaction(signedTxn).do();


    // Wait for confirmation
    let confirmedTxn = await waitForConfirmation(algodClient, txId, 4);
    //Get the completed Transaction
    console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
    let mytxinfo = JSON.stringify(confirmedTxn.txn.txn, undefined, 2);
    console.log("Transaction information: %o", mytxinfo);
    var string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
    console.log("Note field: ", string);
}

const checkStatus = async () => {
    let status = (await algodClient.status().do());
    console.log("Algorand network status: %o", status);
}

const checkSuggestedTransaction = async () => {

    let params = await algodClient.getTransactionParams().do();
    console.log("Algorand suggested parameters: %o", params)
}


/**
 * Wait until the transaction is confirmed or rejected, or until 'timeout'
 * number of rounds have passed.
 * @param {algosdk.Algodv2} algodClient the Algod V2 client
 * @param {string} txId the transaction ID to wait for
 * @param {number} timeout maximum number of rounds to wait
 * @return {Promise<*>} pending transaction information
 * @throws Throws an error if the transaction is not confirmed or rejected in the next timeout rounds
 */
const waitForConfirmation = async function (algodClient, txId, timeout) {
    if (algodClient == null || txId == null || timeout < 0) {
        throw new Error("Bad arguments");
    }

    const status = (await algodClient.status().do());
    if (status === undefined) {
        throw new Error("Unable to get node status");
    }

    const startround = status["last-round"] + 1;
    let currentround = startround;

    while (currentround < (startround + timeout)) {
        const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
        if (pendingInfo !== undefined) {
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                //Got the completed Transaction
                return pendingInfo;
            } else {
                if (pendingInfo["pool-error"] != null && pendingInfo["pool-error"].length > 0) {
                    // If there was a pool error, then the transaction has been rejected!
                    throw new Error("Transaction " + txId + " rejected - pool error: " + pendingInfo["pool-error"]);
                }
            }
        }
        await algodClient.statusAfterBlock(currentround).do();
        currentround++;
    }

    throw new Error("Transaction " + txId + " not confirmed after " + timeout + " rounds!");
};





// checkStatus()
// checkSuggestedTransaction()

// createAccount()

//checkAccountBalance()

constructTransaction()
//console.log(algodClient)