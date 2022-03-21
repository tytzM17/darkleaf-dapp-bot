// submit bot form
function submitBot() {
  document.getElementsByClassName('SubmitButton')[0].style.pointerEvents = 'none'; 
  //background: #656E85; rgba(130, 71, 229, 1);
  document.getElementsByClassName('SubmitButton')[0].style.backgroundColor = '#656E85';
  document.getElementById('submit-spinner').style.visibility = 'visible';


  const botName = document.getElementById('botname').value
  const botDesc = document.getElementById('botdesc').value
  const botCode = document.getElementById('botcode').value
  const botForGame = document.getElementById('botforgame').value
  const botAuthor = document.getElementById('botauthor').value

  if (!botName || !botDesc || !botCode || !botForGame || !botAuthor) {
      alert('Some fields are missing')
      return
  }

  const JSONBody = {
    pinataMetadata: {
        name: `darkleaf`,
        keyvalues: {
            id: `${botName}-${Date.now()}`,
            author: `${botAuthor}`,
            name: `${botName}`,
            description: `${botDesc}`,
            code: `${botCode}`,
            forGame: `${botForGame}`,
        }
    },
    pinataContent: {
        name: botName,
        description: botDesc,
        code: botCode,
        forGame: botForGame,
        author: botAuthor
    }

}

  // CHANGE, TEMP ONLY
//   const pinataApiKey = process?.env?.PINATA_API_KEY;
//   const pinataSecretApiKey = process?.env?.PINATA_SECRET_API_KEY;

  // CHANGE, TEMP ONLY
  const pinataApiKey = 'e343c37d19cba01ca415';
  const pinataSecretApiKey = '372afc550d3d292c2163324e134a3a8b05f2635793e2804d1723909a4eca3c8d';
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  
  axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then(function (response) {
      //handle response here
      if (response && response.statusText === 'OK') {
        console.log('submit response:', response)
        alert(`${botName} was submitted successfully, with hash ${response.data?.IpfsHash}`)
      
      }
      document.getElementsByClassName('SubmitButton')[0].style.pointerEvents = 'auto'; 
      document.getElementsByClassName('SubmitButton')[0].style.backgroundColor = 'rgba(130, 71, 229, 1)';
      document.getElementById('submit-spinner').style.visibility = 'hidden';
    })
    .catch(function (error) {
      //handle error here
      alert(`Submit error, ${error}`)
      document.getElementsByClassName('SubmitButton')[0].style.pointerEvents = 'auto'; 
      document.getElementsByClassName('SubmitButton')[0].style.backgroundColor = 'rgba(130, 71, 229, 1)';
      document.getElementById('submit-spinner').style.visibility = 'hidden';
    })
}
