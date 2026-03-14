const pageButton = document.querySelectorAll('.pageButton')
let currentPage = 1

async function loadData() {
    const res = await fetch('sample-data.csv')
    const data = await res.text()
    const rows = data.split('\n')
    const cells = rows.map(row => row.split(','))

    render(cells)
}

function render(datas) {
    const rows = datas.splice((currentPage - 1) * 10, 10)

    tableBody.innerHTML = ''

    prevButton.disabled = currentPage == 1
    nextButton.disabled = currentPage == 5
    
    rows.forEach(row => {
        const tr = document.createElement('tr')

        row.forEach(cell => {
            const td = document.createElement('td')
            td.textContent = cell
            tr.append(td)
        })

        tableBody.append(tr)
    })

    pageButton.forEach((button, i) => {
        button.classList.remove('active')

        if (i == currentPage - 1) button.classList.add('active')
    })
}

pageButton.forEach((button, i) => {
    button.addEventListener('click', () => {
        currentPage = i + 1

        loadData()
    })
})

prevButton.addEventListener('click', () => {
    currentPage--

    loadData()
})

nextButton.addEventListener('click', () => {
    currentPage++

    loadData()
})

loadData()