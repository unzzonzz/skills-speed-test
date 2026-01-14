$ = e => document.querySelector(e)
$$ = e => document.querySelectorAll(e)

const initialState = {
  playerO: [],
  playerX: [],
  currentTurn: 'o'
}

function createState(initialState) {
  let state = initialState

  return {
    getState: () => state,
    setState: (newState) => {
      state = { ...state, ...newState }
    }
  }
}

function render(state) {
  $$('.cell').forEach(cell => {
    cell.textContent = ''
    cell.classList.remove('o')
    cell.classList.remove('x')
  })

  if (state.currentTurn === 'o') {
    state.playerO.forEach(index => {
      const occupied = $$('.cell')[index]
      occupied.textContent = 'O'
      occupied.classList.add('o')
    })
  }
}

$$('.cell').forEach(cell => {
  cell.addEventListener('click', (e) => {
    if (store.getState().playerO.includes(e.target.dataset.index)) return
    store.setState({ playerO: [...store.getState().playerO, e.target.dataset.index] })
    init()
  })
})

$('#resetGame').addEventListener('click', () => {
  store.setState(initialState)
  init()
})

const store = createState(initialState)

function init() {
  render(store.getState())
}

init()