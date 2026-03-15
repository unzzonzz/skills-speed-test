let currentPage = 1

async function loadData() {
    const res = await fetch('sample-data.csv')
    const data = await res.text()
    const rows = data.split('\n')
    const cells = rows.map(row => row.split(','))

    render(cells)
}

function render(data) {
    const newData = data.splice((currentPage - 1) * 10, 10)
    tableBody.innerHTML = ''

    newData.forEach(data => {
        const tr = document.createElement('tr')

        data.forEach(cell => {
            const td = document.createElement('td')
            td.textContent = cell
            tr.append(td)
        })

        tableBody.append(tr) 
    })

    prevButton.disabled = currentPage == 1
    nextButton.disabled = currentPage == 5

    document.querySelectorAll('.pageButton').forEach((button, i) => {
        button.classList.remove('active')

        if (currentPage == i + 1) button.classList.add('active')
    })
}

prevButton.onclick = () => {
    currentPage--

    loadData()
}

nextButton.onclick = () => {
    currentPage++

    loadData()
}

document.querySelectorAll('.pageButton').forEach((button, i) => {
    button.onclick = () => {
        currentPage = i + 1

        loadData()
    }
})

loadData()