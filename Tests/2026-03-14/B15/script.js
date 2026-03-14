let currentPage = 1

async function loadData() {
    const res = await fetch('sample-data.csv')
    const data = await res.text()
    const rows = data.split('\n')
    const cells = rows.map(row => row.split(','))

    render(cells)
}

function render(datas) {
    const newDatas = datas.splice((currentPage - 1) * 10, 10)

    tableBody.innerHTML = ''

    previousButton.disabled = currentPage == 1
    nextButton.disabled = currentPage == 5

    newDatas.forEach(data => {
        const tr = document.createElement('tr')

        data.forEach(cell => {
            const td = document.createElement('td')
            td.textContent = cell
            tr.append(td)
        })

        tableBody.append(tr)
    })

    document.querySelectorAll('#pageButtons').forEach((button, i) => {
        button.classList.remove('active')

        if (currentPage == i + 1) button.classList.add('active')
    })
}

previousButton.onclick = () => {
    currentPage--

    loadData()
}

nextButton.onclick = () => {
    currentPage++

    loadData()
}

document.querySelectorAll('#pageButtons').forEach((button, i) => {
    button.onclick = () => {
        loadData()
        
        currentPage = i + 1
    }
})

loadData()