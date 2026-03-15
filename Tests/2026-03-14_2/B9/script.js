let allData

async function loadData() {
    const res = await fetch('data.json')
    const datas = await res.json()
    const newDatas = datas.map(data => ({ ...data, isFavorite: false }))
    allData = getLocalStorage() || newDatas
    
    render()
}

function setLocalStorage() {
    localStorage.setItem('datas', JSON.stringify(allData))
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('datas'))
}

function render() {
    document.querySelector('ul').innerHTML = ''

    allData.forEach(data => {
        const li = document.createElement('li')
        li.innerHTML = `
            <div>
                <div>${data.name}</div>
                <div>${data.desc}</div>
            </div>
            <div class="icon">☆</div>
        `
        if (data.isFavorite) {
            li.innerHTML = `
                <div>
                    <div>${data.name}</div>
                    <div>${data.desc}</div>
                </div>
                <div class="icon">★</div>
            `
        }

        li.onclick = () => {
            data.isFavorite = !data.isFavorite

            setLocalStorage()
            render()
        }

        document.querySelector('ul').append(li)
    })
}

loadData()