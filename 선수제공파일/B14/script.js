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

function render(state) {
  const items = state.items
  const ctx = $('canvas').getContext('2d')
  const canvasWidth = $('canvas').width
  const canvasHeight = $('canvas').height
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  let previousEndAngle = 0
  $('.legend').innerHTML = ''

  items.forEach(item => {
    const percent = getPercent(items, item.value)
    const div = document.createElement('div')
    div.classList.add('legend-item')
    div.innerHTML = `
      <div class="legend-color" style="background-color: ${item.color}"></div>
      <span>${item.label} (${Math.ceil(percent * 100) / 100}%)</span>
      `

    $('.legend').append(div)

    const startAngle = previousEndAngle
    const endAngle = startAngle + (percent / 100) * Math.PI * 2
    previousEndAngle = endAngle

    ctx.beginPath()
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2)
    ctx.arc(canvasWidth / 2, canvasHeight / 2, 150, startAngle, endAngle)
    ctx.fillStyle = item.color
    ctx.fill()
    ctx.closePath()
  })
}

$('.clear-btn').addEventListener('click', () => {
  alert('초기화 되었습니다!')
  store.setState({ items: [] })
  render(store.getState())
})

$('.add').addEventListener('click', () => {
  if (!$('#labelInput').value.trim() || !$('#valueInput').value.trim()) return alert('값을 모두 입력해주세요.')

  handleToAdd($('#labelInput').value, $('#valueInput').value)

  $('#labelInput').value = ''
  $('#valueInput').value = ''
})

function getPercent(items, item) {
  let sum = 0

  items.forEach(item => {
    sum += item.value
  })

  return item / sum * 100
}

function getRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16)
}

function handleToAdd(label, value) {
  store.setState({
    items: [...store.getState().items, { label: label, value: Number(value), color: getRandomColor() }]    
  })

  render(store.getState())
}

const store = createState({
  items: []
})

render(store.getState())