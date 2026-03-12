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
    const datasWidthNewKey = datas.map(data => ({
        ...data,
        isCompleted: false
    }))

    store.setState({ datas: getLocalStorageData() || datasWidthNewKey })
    render(store.getState())
}

function setLocalStorageData() {
    localStorage.setItem('datas', JSON.stringify(store.getState().datas))
}

function getLocalStorageData() {
    return JSON.parse(localStorage.getItem('datas'))
}

function render(state) {
    document.querySelector('ul').innerHTML = ''

    state.datas.forEach(data => {
        const li = document.createElement('li')
        if (data.isCompleted) {
            li.classList.add('active')
            li.innerHTML = `
                <div class="group vertical">
                    <b>${data.name}</b>
                    <small>${data.desc}</small>
                </div>
                <div class="icon">★</div>
            `
        } else {
            li.innerHTML = `
                <div class="group vertical">
                    <b>${data.name}</b>
                    <small>${data.desc}</small>
                </div>
                <div class="icon">☆</div>
            `
        }
        li.addEventListener('click', () => {
            const updatedDatas = store.getState().datas.map(d => 
                d === data ? { ...d, isCompleted: !d.isCompleted } : d
            )
            store.setState({ datas: updatedDatas })
            setLocalStorageData()
            render(store.getState())
        })
        document.querySelector('ul').append(li)
    })
}

const store = createState({
    datas: []
})

loadData()