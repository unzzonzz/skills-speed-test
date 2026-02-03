const $ = e => document.querySelector(e)
const $$ = e => [...document.querySelectorAll(e)]

function createState(initialState) {
  let state = initialState

  return {
    getState: () => state,
    setState: (newState) => {
      state = { ...state, ...newState }
    }
  }
}

function saveFavorites() {
  const currentState = store.getState()
  const saveItems = currentState.items
    .filter(item => item.isFavorites)
    .map(item => item.id)

  localStorage.setItem('favorites', JSON.stringify(saveItems))
}

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  handleAddToIsFavoritesKey(favorites)
}

async function loadData() {
  const res = await fetch('data.json')
  const data = await res.json()
  
  handleAddToIsFavoritesKey(data)
}

async function render(state) {
  const items = state.items

  $('.items').innerHTML = ''

  items.forEach(item => {
    const div = document.createElement('div')
    div.classList.add('item')
    if (item.isFavorites) div.classList.add('selected')
    div.innerHTML = `
     <div class="group">
        <div class="title">${item.name}</div>
        <div class="description">${item.desc}</div>
      </div>
      <div class="group">
        <div class="button">
          즐겨찾기
        </div>
      </div>
    `

    div.querySelector('.button').addEventListener('click', () => handleAddToIsFavorites(item.id))

    $('.items').append(div)
  })
}

async function handleAddToIsFavoritesKey(items) {
  const newItems = items.map(item => item = { ...item, isFavorites: false })
  
  store.setState({ items: newItems })
}

async function handleAddToIsFavorites(id) {
  const currentState = store.getState()
  const newItems = currentState.items.map(item => {
    if (item.id !== id) return item
    
    return item = { ...item, isFavorites: !item.isFavorites }
  })

  store.setState({ items: newItems })
  render(store.getState())
  saveFavorites()
}

const store = createState({ items: [] })

async function init() {
  await loadData()
  loadFavorites()
  render(store.getState())
}

init()