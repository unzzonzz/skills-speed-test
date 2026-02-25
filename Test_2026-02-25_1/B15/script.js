let rows
let currentPage = 1

async function loadData() {
  let data = await fetch('./sample-data.csv')
  data = await data.text()
  rows = data.split('\r\n').map(row => row.split(','))
  
  render()
}

loadData()

function render() {
  const start = (currentPage - 1) * 10
  const end = start + 10
  const pageData = rows.slice(start + 1, end + 1)

  document.querySelector('tbody').innerHTML = ''

  pageData.forEach(row => {
    const tr = document.createElement('tr')
    row.forEach(cell => {
      const td = document.createElement('td')
      td.textContent = cell
      tr.append(td)
    })
    document.querySelector('tbody').append(tr)
  })
  renderPagination()
}

function renderPagination() {
  document.querySelector('.previous-btn').disabled = (currentPage == 1)
  document.querySelector('.next-btn').disabled = (currentPage == 5)

  document.querySelector('.previous-btn').onclick = () => {
    currentPage--
    render()
  }

  document.querySelector('.next-btn').onclick = () => {
    currentPage++
    render()
  }
  
  document.querySelectorAll('.page-btn').forEach((button, index) => {
    button.onclick = () => {
      currentPage = index + 1
      render()
    }

    button.classList.remove('active')
    if (index == currentPage - 1) button.classList.add('active')
  })
}
