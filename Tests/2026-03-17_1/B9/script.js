let datas
const ul = document.querySelector('ul')

async function loadData() {
    const newDatas = await fetch('data.json').then(s => s.json())
    datas = JSON.parse(localStorage.getItem('datas')) || newDatas.map(data => ({...data, isCompleted: false}))

    render()
}

function render() {
    ul.innerHTML = ''

    datas.forEach(data => {
        const li = document.createElement('li')
        li.innerHTML = `
            <div class="content-1">
                <div class="name">${data.name}</div>
                <div class="desc">${data.desc}</div>
            </div>
            <div class="icon">☆</div>
        `
        if (data.isCompleted) {
            li.innerHTML = `
                <div class="content-1">
                    <div class="name">${data.name}</div>
                    <div class="desc">${data.desc}</div>
                </div>
                <div class="icon">★</div>
            `
        }

        li.onclick = () => {
            data.isCompleted = !data.isCompleted
            localStorage.setItem('datas', JSON.stringify(datas))

            render()
        }

        ul.append(li)
    })
}

loadData()