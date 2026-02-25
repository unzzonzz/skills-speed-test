const $ = e => document.querySelector(e)
const $$ = e => [...document.querySelectorAll(e)]

const datas = [
  {
    value: 20,
    color: getRandomColor()
  },
  {
    value: 2,
    color: getRandomColor()
  },
  {
    value: 3,
    color: getRandomColor()
  },
]

const canvas = $('canvas')
const ctx = canvas.getContext('2d')
const canvasWidth = canvas.width
const canvasHeight = canvas.height

function render() { 
  let previousEndAngle = 0

  datas.forEach(data => {
    const endAngle = previousEndAngle + getPercent(data) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2)
    ctx.arc(canvasWidth / 2, canvasHeight / 2, 150, previousEndAngle, endAngle)
    ctx.fillStyle = data.color
    ctx.fill()
    ctx.closePath()
    previousEndAngle = endAngle
  })
}

function getPercent(data) {
  let sum = 0

  datas.forEach(data => {
    sum += data.value
  })

  return data.value / sum
}

function getRandomColor() {
  const letters = '0123456789abcdef'
  let color = '#'

  for (i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)]
  }

  return color
}

render()