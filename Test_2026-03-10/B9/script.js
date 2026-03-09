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

  store.setState({ datas: newDatas })
  render(store.getState())
}

function render(state) {
  ul.innerHTML = ''

  state.datas.forEach(data => {
    const li = document.createElement('li')
    li.innerHTML = `
      <div class="group vertical">
        <div class="name">${ data.name }</div>
        <div class="desc">${ data.desc }</div>
      </div>
      <div class="icon">⭐</div>
    `
    if (data.isFavorite) li.classList.add('favorite')

    li.addEventListener('click', () => {
      data.isFavorite != data.isFavorite
      store.setState({ data: state.datas })
    })

    ul.append(li)
  })
}

const store = createState({ datas: [] })

loadData()