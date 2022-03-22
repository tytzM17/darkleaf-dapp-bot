function removeAllChildNodes(parent) {
  while (parent.children[1]) {
    parent.removeChild(parent.children[1])
  }
}

function botlisTblDisplay() {
  // CHANGE, TEMP ONLY
  const pinataApiKey = 'c10bb764bb9b5827f288';
  const pinataSecretApiKey = 'f9c32ab0a02ee5d05025146f9d8e3f17ce672fc84e9e73283daee07ad0c1ace4';

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

              // support button
              const tdSupportNode = document.createElement('td')
              const supportBtn = document.createElement("div");
              supportBtn.setAttribute("id", "support-btn");
              supportBtn.setAttribute("data-support", JSON.stringify(keyvalues))
              supportBtn.setAttribute("onclick", `supportOkBtn(event)`)
              const supportTextNode = document.createTextNode('OK')
              supportBtn.appendChild(supportTextNode)
              tdSupportNode.appendChild(supportBtn)

              trnode.insertBefore(tdNameNode, trnode.children[0])
              trnode.insertBefore(tdDescNode, trnode.children[1])
              trnode.insertBefore(tdForGameNode, trnode.children[2])
              trnode.insertBefore(tdCodeNode, trnode.children[3])
              trnode.insertBefore(tdHashNode, trnode.children[4])
              trnode.insertBefore(tdAuthorNode, trnode.children[6])
              trnode.insertBefore(tdSupportNode, trnode.children[7])
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


// support function onclick
function supportOkBtn(event) {
  document.getElementById('submit-support-spinner').style.display='none';
  document.getElementById('support-ok-modal').style.display='flex';
  
  console.log(event.currentTarget?.dataset?.support);
  const rowData = event.currentTarget?.dataset?.support || null
  if (!rowData) {
    return
  }
  const row = JSON.parse(rowData)
  document.getElementById('support-name-label').innerText = row.name
  document.getElementById('support-author-label').innerText = row.author

  // support ok, dlc function
  const supportAmount = document.getElementById('support-amount').innerText
  approveTx(supportAmount).then(result => {
    alert(result ? 'Approved': '')
    // supportAuthor(_author, _authorID, _amount)
    supportAuthor(row.author, row.authorID, supportAmount)
  })
  .catch(console.error)
  // document.getElementById('submit-support-spinner').style.display='flex';

}
