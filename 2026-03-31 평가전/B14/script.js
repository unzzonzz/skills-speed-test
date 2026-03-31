const ctx = document.querySelector('canvas').getContext('2d')

function createState(initialState) {
  let state =initialState

  return {
    getState: () => state,
    setState: (newState) => {
      state = { ...state, ...newState }
    }
  }
}

function render(store) {
  let previousEndAngle = 0
  legend.innerHTML = ''

  store.datas.forEach(data => {
    ctx.beginPath()
    ctx.moveTo(250, 250)
    ctx.arc(250, 250, 200, previousEndAngle, previousEndAngle + getPercent(data.value) * Math.PI * 2)
    ctx.fillStyle = data.color
    ctx.fill()

    previousEndAngle = previousEndAngle + getPercent(data.value) * Math.PI * 2

    const div = document.createElement('div')
    div.classList.add('legend-item')
    div.innerHTML = `
      <div class="legend-color" style="background-color: ${data.color}"></div>
      <span>${data.label} (${Math.floor(getPercent(data.value) * 100)}%)</span>
    `
    legend.append(div)
  })
}

function getRandomColor() {
  let color = '#'
  const str = 'abcdef1234567890'

  for(i = 0; i < 6; i++) color += str[Math.floor(Math.random() * str.length)]

  return color
}

function getPercent(value) {
  let sum = 0

  store.getState().datas.forEach(data => sum += data.value)

  return value / sum
}

button.onclick = () => {
  store.setState({ datas: [...store.getState().datas, {
    label: labelInput.value,
    value: Number(valueInput.value),
    color: getRandomColor()
  }] })

  render(store.getState())
}

const store = createState({
  datas: []
})

render(store.getState())