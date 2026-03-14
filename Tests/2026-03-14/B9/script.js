let datass

async function loadData() {
    const res = await fetch('data.json')
    const datas = await res.json()
    const newDatas = datas.map(data => ({...data, isFavorite: false}))

    datass = getLocalStorage() || newDatas

    render()
}

function setLocalStorage() {
    localStorage.setItem('datass', JSON.stringify(datass))
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('datass'))
}

function render() {
    document.querySelector('ul').innerHTML = ''

    datass.forEach(data => {
        const li = document.createElement('li')
        li.innerHTML = `
            <div>
                <div class="name">${data.name}</div>
                <div class="desc">${data.desc}</div>
            </div>
            <div class="icon">☆</div>
        `
        if (data.isFavorite) {
            li.innerHTML = `
                <div>
                    <div class="name">${data.name}</div>
                    <div class="desc">${data.desc}</div>
                </div>
                <div class="icon">★</div>
            `
        }

        li.addEventListener('click', () => {
            data.isFavorite = !data.isFavorite

            setLocalStorage()
            render()
        })

        document.querySelector('ul').append(li)
    })
}

loadData()