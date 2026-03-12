let currentPage = 1

async function loadData() {
  const res = await fetch('sample-data.csv')
  const data = await res.text()
  const rows = data.split('\n')
  const cells = rows.map(row => row.split(','))

  render(cells)
}

function render(data) {
  const rows = data.splice((currentPage - 0) * 10, 10)

  rows.forEach(row => {
    const tr = document.createElement('tr')

    row.forEach(cell => {
      const td = document.createElement('td')
      td.textContent = cell
      tr.append(td)
    })

    tableBody.append(tr)
  })
}

loadData()