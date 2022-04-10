var web3
Moralis.initialize("bvWDkF2SPUcpBOxbmEfoLopuz1HOH5lS9D2spYWY"); // Application id from moralis.io
Moralis.serverURL = "https://qwy4i8eo6pzs.usemoralis.com:2053/server"; //Server url from moralis.io
window.userWalletAddress = null
const loginButton = document.getElementById('loginButton')
const userWallet = document.getElementById('userWallet')

async function getOpenseaItems() {
    if (!window.userAddress) { return }
    const osContainer = document.getElementById('openseaItems')
    console.log(window.userAddress)
    const items = await fetch(`https://api.opensea.io/api/v1/collections?asset_owner=0xe9Fd7F0C7A239CF5e4998F79cF47f698Ba55cfC1&offset=0&limit=200`)
      .then(reponse => reponse.json())
      .then(reponse => console.log(reponse))
      .catch((e) => {
        console.error(e)
        console.error('Could not talk to OpenSea')
        return null
      })
    console.log(['items'][1]["primary_asset_contracts"][1])
    }