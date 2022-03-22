import { ethers } from './ethersv5.2.esm.min.js'
// import "./dotenv/config";
export const ethersjs = ethers
// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
export const provider = new ethers.providers.Web3Provider(window.ethereum)

const noteElement = document.getElementsByClassName('akaproject-dapp-bot')[0]
const metamaskLink = document.getElementById('metamask-link')

if (!provider) {
  noteElement.innerText = '* MetaMask is not found, visit '
  metamaskLink.style.visibility = 'visible'
  noteElement.append(metamaskLink)

  alert(`MetaMask is not found, visit https://metamask.io`)
} else {
  metamaskLink.style.visibility = 'hidden'
}

// MetaMask requires requesting permission to connect users accounts
await provider.send('eth_requestAccounts', [])

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
export const signer = provider.getSigner()

const connectBtn = document.getElementsByClassName('ConnectButton')[0]

//we use eth_accounts because it returns a list of addresses owned by us.
const accounts = await ethereum.request({ method: 'eth_accounts' })
//We take the first address in the array of addresses and display it
connectBtn.innerText = formatWallet(accounts[0]);

const authorInput = document.getElementById('botauthor');
authorInput.value = accounts[0];

export const userAccount = accounts[0];



