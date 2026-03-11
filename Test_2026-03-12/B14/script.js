const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

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
  let previousEnd = 0

  state.datas.forEach(data => {
    ctx.beginPath()
    ctx.moveTo(250, 250)
    ctx.arc(250, 250, 200, previousEnd, previousEnd + getPercent(data.value) * Math.PI * 2)
    ctx.fillStyle = data.color
    ctx.fill()

    previousEnd = previousEnd + getPercent(data.value) * Math.PI * 2
  })
}

addButton.addEventListener('click', () => {
  store.setState({ datas: [ ...store.getState().datas, {
    label: labelInput.value,
    value: Number(valueInput.value),
    color: getRandomColor()
  } ] })

  render(store.getState())
})

function getRandomColor() {
  let color = '#'
  const str = 'abcdef1234567890'

  for (i = 0; i < 6; i++) color += str[Math.floor(Math.random() * str.length)]

  return color
}

function getPercent(value) {
  let sum = 0

  store.getState().datas.forEach(data => sum += data.value)

  return value / sum
}

const store = createState({ datas: [] })