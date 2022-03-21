function removeAllChildNodes(parent) {
  while (parent.children[1]) {
    parent.removeChild(parent.children[1])
  }
}

function botlisTblDisplay() {
  // CHANGE, TEMP ONLY
  const pinataApiKey = 'e343c37d19cba01ca415';
  const pinataSecretApiKey = '372afc550d3d292c2163324e134a3a8b05f2635793e2804d1723909a4eca3c8d';
  let queryString = '?'
  queryString = queryString + `status=pinned&`
  queryString = queryString + `metadata[name]=darkleaf`

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
        // set table data
        if (response.data && response.data.rows.length) {
          const botlistTabTbl = document.getElementById('botlist-tbl')
          const rows = response.data.rows
          removeAllChildNodes(botlistTabTbl)
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

              const tdAuthorNode = document.createElement('td')
              const authorNode = document.createTextNode(
                keyvalues?.author || '',
              )
              tdAuthorNode.appendChild(authorNode)

              trnode.insertBefore(tdNameNode, trnode.children[0])
              trnode.insertBefore(tdDescNode, trnode.children[1])
              trnode.insertBefore(tdForGameNode, trnode.children[2])
              trnode.insertBefore(tdCodeNode, trnode.children[3])
              trnode.insertBefore(tdHashNode, trnode.children[4])
              trnode.insertBefore(tdAuthorNode, trnode.children[6])
            }

            // then append tr to bot list tbl
            botlistTabTbl.appendChild(trnode)
          })
        }
      }
    })
    .catch(function (error) {
      //handle error here
      alert(`Bot list display error, ${error}`)
    })
}

const botlistTabBtn = document.getElementsByClassName('BOTLIST')[0]
if (botlistTabBtn) {
  botlistTabBtn.addEventListener('click', botlisTblDisplay)
}
