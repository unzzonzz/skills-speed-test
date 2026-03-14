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
    const newDatas = datas.map(data => ({...data, isFavorite: false}))

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
    console.log(state);
    document.querySelector('ul').innerHTML = ''

    state.datas.forEach(data => {
        const li = document.createElement('li')
        if (data.isFavorite) {
            li.classList.add('favorite')
            li.innerHTML = `
                <div>
                    <h3>${data.name}</h3>
                    <div class="desc">${data.desc}</div>
                </div>
                <div class="icon">★</div>
            `
        } else {
        
        li.innerHTML = `
            <div>
                <h3>${data.name}</h3>
                <div class="desc">${data.desc}</div>
            </div>
            <div class="icon">☆</div>
        `
        }

        li.onclick = () => {
            data.isFavorite = !data.isFavorite

            setLocalStorageData()
            render(state)
        }

        document.querySelector('ul').append(li)
    })
}

const store = createState({ datas: [] })

loadData()