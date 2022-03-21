const { ethereum } = window;


const formatWallet = (account) => {
    if (!account) {
        return 'Not able to get accounts'
    }
    return `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
  };
  


const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
    }
  };

  const connectBtn = document.getElementsByClassName('ConnectButton')[0];

  connectBtn.addEventListener('click', async() => {
    connectBtn.disabled = true;
    onClickConnect();
    connectBtn.disabled = false;

    //we use eth_accounts because it returns a list of addresses owned by us.
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    //We take the first address in the array of addresses and display it
    connectBtn.innerText = formatWallet(accounts[0]);
  })

ethereum.on('accountsChanged', async () => {
    // Time to reload your interface with accounts[0]!
        //we use eth_accounts because it returns a list of addresses owned by us.
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        //We take the first address in the array of addresses and display it
        connectBtn.innerText = formatWallet(accounts[0]);
  })
  
ethereum.on('networkChanged', function () {
    // Time to reload your interface with the new networkId
    const networkId = ethereum.networkVersion;
    console.log(networkId, typeof networkId);
    if (!networkId) {
        alert(`!Missing network ${networkId}`)
        return
    }
    // polygon is 137, mumbai is 80001
    const networks = ['80001','137']
    if (!networks.includes(networkId)) {
        alert('Network not supported, please connect to Polygon or Mumbai networks')
    }
  })

