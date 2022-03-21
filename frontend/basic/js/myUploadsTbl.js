function removeAllChildNodes(parent) {
  while (parent.children[1]) {
    parent.removeChild(parent.children[1])
  }
}

async function botlisTblDisplay() {
  const accounts = await ethereum.request({ method: 'eth_accounts' })
  //We take the first address in the array of addresses and display it

  // CHANGE, TEMP ONLY
  const pinataApiKey = 'c10bb764bb9b5827f288';
  const pinataSecretApiKey = 'f9c32ab0a02ee5d05025146f9d8e3f17ce672fc84e9e73283daee07ad0c1ace4';

  let queryString = '?'
  queryString = queryString + `status=pinned&`
  queryString = queryString + `metadata[name]=darkleaf&`
  queryString + `metadata[keyvalues]={"author": ${accounts[0]}}`

  const url = `https://api.pinata.cloud/data/pinList${queryString}`
  axios
    .get(url, {
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then(function (response) {
      //handle response here
      if (response && response.statusText === 'OK') {
        console.log('myuploads display response:', response)

        // set table data
        if (response.data && response.data.rows.length) {
          const myuploadsTabTbl = document.getElementById('myuploads-tbl')
          const rows = response.data.rows
          removeAllChildNodes(myuploadsTabTbl)
          // each row, create tr, then create td with values ,append td

          rows.map(function (row, i) {
            const trnode = document.createElement('tr')

            if (row.metadata?.keyvalues) {
              const keyvalues = row.metadata?.keyvalues

              const tdNameNode = document.createElement('td')
              const namenode = document.createTextNode(keyvalues?.name || '')
              tdNameNode.appendChild(namenode)

              const tdDescNode = document.createElement('td')
              const descnode = document.createTextNode(
                keyvalues?.description || '',
              )
              tdDescNode.appendChild(descnode)

              const tdForGameNode = document.createElement('td')
              const forGameNode = document.createTextNode(
                keyvalues?.forGame || '',
              )
              tdForGameNode.appendChild(forGameNode)

              const tdCodeNode = document.createElement('td')
              const codenode = document.createTextNode(keyvalues?.code || '')
              tdCodeNode.appendChild(codenode)

              const tdHashNode = document.createElement('td')
              const hashNode = document.createTextNode(row.ipfs_pin_hash || '')
              tdHashNode.appendChild(hashNode)

              trnode.insertBefore(tdNameNode, trnode.children[0])
              trnode.insertBefore(tdDescNode, trnode.children[1])
              trnode.insertBefore(tdForGameNode, trnode.children[2])
              trnode.insertBefore(tdCodeNode, trnode.children[3])
              trnode.insertBefore(tdHashNode, trnode.children[4])
            }

            // then append tr to bot list tbl
            myuploadsTabTbl.appendChild(trnode)
          })
        }
      }
    })
    .catch(function (error) {
      //handle error here
      alert(`My uploads display error, ${error}`)
    })
}

const myuploadsTabBtn = document.getElementsByClassName('MYUPLOADS')[0]
if (myuploadsTabBtn) {
  myuploadsTabBtn.addEventListener('click', botlisTblDisplay)
}
