let datas

async function loadData() {
    const res = await fetch('data.json')
    datas = getLocalStorage() || await res.json().map(data => ({ ...data, isFavorite: false }))

    render()
}

function setLocalStorage() {
    localStorage.setItem('datas', JSON.stringify(datas))
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('datas'))
}

function render() {
    document.querySelector('ul').innerHTML = ''

    datas.forEach(data => {
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

        li.onclick = () => {
            data.isFavorite = !data.isFavorite

            setLocalStorage()
            render()
        }

        document.querySelector('ul').append(li)
    })
}

loadData()