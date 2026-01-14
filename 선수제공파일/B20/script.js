$ = e => document.querySelector(e)
$$ = e => document.querySelectorAll(e)

const initialState = {
  playerO: [],
  playerX: [],
  currentTurn: 'o',
  gameStatus: '',
}

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
  [0, 3, 6],
  [2, 5, 8],
]

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
  const players = ['playerO', 'playerX']

  $$('.cell').forEach(cell => {
    cell.textContent = ''
    cell.classList.remove('o')
    cell.classList.remove('x')
  })

  players.forEach(player => {
    state[player].forEach(index => {
      const occupied = $$('.cell')[index]

      occupied.textContent = player.slice(-1)
      occupied.classList.add(player.slice(-1).toLowerCase())
    })
  })
}

function handleCheckToResult() {
  const isOWin = winningPattern.some(pattern => {
    return pattern.every(cell => store.getState().playerO.includes(cell))
  })
  const isXWin = winningPattern.some(pattern => {
    return pattern.every(cell => store.getState().playerX.includes(cell))
  })
  const isDraw = store.getState().playerO.length + store.getState().playerX.length === 9

  if (isOWin) alert('O가 승리하였습니다')
  if (isXWin) alert('X가 승리하였습니다')
  if (isDraw) alert('무승부입니다')
  if (isOWin || isXWin || isDraw) store.setState({ gameStatus: 'end' })
}

$$('.cell').forEach(cell => {
  cell.addEventListener('click', (e) => {
    if (store.getState().gameStatus === 'end') return

    const currentTurn = store.getState().currentTurn
    const nextTurn = currentTurn === 'o' ? 'x' : 'o'
    const playerKey = currentTurn === 'o' ? 'playerO' : 'playerX'
    const index = Number(e.target.dataset.index)
    
    if (store.getState().playerO.includes(index) || store.getState().playerX.includes(index)) return
    store.setState({ [playerKey]: [...store.getState()[playerKey], index], currentTurn: nextTurn })
    
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
  handleCheckToResult()
}

init()