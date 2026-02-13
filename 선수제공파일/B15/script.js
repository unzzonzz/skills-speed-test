const $ = e => document.querySelector(e)
const $$ = e => [...document.querySelectorAll(e)]

let currentPage = 1, rows

async function loadData() {
  const res = await fetch('sample-data.csv')
  const text = await res.text()
  rows = text.split(/\r?\n/).slice(1)

  render(rows)
}

function render(data) {
  $$('.page-btn').forEach(button => {
    button.classList.remove('active')
    $$('.page-btn')[currentPage - 1].classList.add('active')
  })

  $('tbody').innerHTML = ''

  const rows = data.slice((currentPage - 1) * 10, currentPage * 10)

  rows.forEach(row => {
    const data = row.split(',')
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${data[0]}</td>
      <td>${data[1]}</td>
      <td>${data[2]}</td>
      <td>${data[3]}</td>
      <td>${data[4]}</td>
    `

    $('tbody').append(tr)
  })
}

$$('.page-btn').forEach((button, index) => {
  button.addEventListener('click', (e) => {
    if (currentPage == index + 1) return alert('이미 현재 페이지입니다!')

    currentPage = index + 1
    render(rows)
  })
})

$('.previous-btn').addEventListener('click', () => {
  if (currentPage <= 1) return alert('첫번째 페이지입니다!')
  
  currentPage--
  render(rows)
})

$('.next-btn').addEventListener('click', () => {
  if (currentPage >= 5) return alert('마지막 페이지입니다!')

  currentPage++
  render(rows)
})

loadData()