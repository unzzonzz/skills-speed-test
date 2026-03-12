const pageButtons = document.querySelectorAll('.pageButton')
let currentPage = 1

async function loadData() {
  const res = await fetch('sample-data.csv')
  const data = await res.text()
  const rows = data.split('\n')
  const cells = rows.map(row => row.split(','))

  render(cells)
}

function render(datas) {
  tableBody.innerHTML = ''
  const rows = datas.splice((currentPage - 1) * 10, 10)

  rows.forEach(row => {
    const tr = document.createElement('tr')

    row.forEach(cell => {
      const td = document.createElement('td')
      td.textContent = cell
      tr.append(td)
    })

    tableBody.append(tr)

    previousButton.disabled = currentPage == 1 ? true : false
    nextButton.disabled = currentPage == 5 ? true : false
  })
  
  pageButtons.forEach((button, i) => {
    button.classList.remove('active')

    if (i == currentPage - 1) button.classList.add('active')
  })
}

pageButtons.forEach((button, i) => {
  button.addEventListener('click', () => {
    currentPage = i + 1

    loadData()
  })
})

previousButton.addEventListener('click', () => {
  currentPage--

  loadData()
})

nextButton.addEventListener('click', () => {
  currentPage++

  loadData()
})

loadData()