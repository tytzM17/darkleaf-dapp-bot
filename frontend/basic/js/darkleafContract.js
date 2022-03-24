import { signer, ethersjs } from "./darkleaf.js";

// dl functions
const CONTRACT_ADDRESS = '0x9Ce7209453604a09FCe278c94667038D34B9D56A'

const abi =[
	{
		"inputs": [
			{
				"internalType": "contract ERC20",
				"name": "dlc",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "authors",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "rewards",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "hasInitReward",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "_cid",
				"type": "bytes"
			}
		],
		"name": "createAuthor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_author",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_authorID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "giveToAuthor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manager",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalAuthors",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];


async function supportAuthor(_author, _authorID, _amount) {
    if (!signer || !_author || !_authorID | !_amount) 
    {
        alert('Missing fields for support author')
        return
      }
      const contr = new ethersjs.Contract(CONTRACT_ADDRESS, abi, signer)
      const tx = await contr.giveToAuthor(_author, _authorID, _amount)
      const recpt = await tx.wait()

      if (!recpt) {
        alert(`No receipt from tx: ${tx}`)  
        return
      }

      if (recpt.status === 1) {
        alert(`Success, Tx hash: ${recpt.transactionHash}`)
      }

      if (recpt.status === 0) {
        alert(`Error, Tx hash: ${recpt.transactionHash}`)
      }

    }



async function createAuthor(_cid) {
    if (!signer || !_cid) {
        alert('Missing fields for create author')
        return
      }
      const contr = new ethersjs.Contract(CONTRACT_ADDRESS, abi, signer)
      const tx = await contr.createAuthor(`${_cid}`)
      const recpt = await tx.wait()

      if (!recpt) {
        alert(`No receipt from tx: ${tx}`)  
        return
      }

      if (recpt.status === 1) {
        alert(`Success, Tx hash: ${recpt.transactionHash}`)
      }

      if (recpt.status === 0) {
        alert(`Error, Tx hash: ${recpt.transactionHash}`)
      }

    }

 window.darkLeafCreateAuthor = createAuthor   
 window.darkLeafSupportAuthor = supportAuthor 


