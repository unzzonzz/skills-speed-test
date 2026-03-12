const ul = document.querySelector('ul')

function createState(initialState) {
    let state = initialState

    return {
        getState: () => state,
        setState: (newState) => {
            state = { ...state, ...newState }
        }
    }
}

async function loadData() {
    const res = await fetch('data.json')
    const datas = await res.json()
    const newDatas = datas.map(data => ({ ...data, isFavorite: false }))

    store.setState({ datas: getLocalStorageData() || newDatas })
    render(store.getState())
}

function setLocalStorageData() {
    localStorage.setItem('datas', JSON.stringify(store.getState().datas))
}

function getLocalStorageData() {
    return JSON.parse(localStorage.getItem('datas'))
}

function render(state) {
    ul.innerHTML = ''

    state.datas.forEach(data => {
        const li = document.createElement('li')
        if (data.isFavorite) {
            li.innerHTML = `
                <div class="group vertical">
                    <div class="title">${data.name}</div>
                    <div class="desc">${data.desc}</div>
                </div>
                <div class="icon">
                    ★
                </div>
            `
            
            li.classList.add('active')
        } else {
            li.innerHTML = `
                <div class="group vertical">
                    <div class="title">${data.name}</div>
                    <div class="desc">${data.desc}</div>
                </div>
                <div class="icon">
                    ☆
                </div>
            `
        }

        li.addEventListener('click', () => {
            data.isFavorite = !data.isFavorite
            store.setState({ datas: [...state.datas] })
            render(store.getState())
            setLocalStorageData()
        })
        
        ul.append(li)
    })
}

const store = createState({
    datas: []
})

loadData()