const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let isDrawing = false
let prevX
let prevY

function startDrawing(x, y) {  
  prevX = x
  prevY = y
  isDrawing = true
  ctx.beginPath()
}

function drawing(x, y) {
  ctx.moveTo(prevX, prevY)
  ctx.lineTo(x, y)
  ctx.stroke()
  prevX = x
  prevY = y
}

function stopDrawing() {
  ctx.closePath()
  isDrawing = false
}

canvas.addEventListener('mousedown', (e) => {
  startDrawing(e.offsetX, e.offsetY)
})

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return

  drawing(e.offsetX, e.offsetY)
})

canvas.addEventListener('mouseup', (e) => {
  stopDrawing()
})

document.querySelector('button.clear').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})

document.querySelector('button.import').addEventListener('click', () => {
  const a = document.createElement('a')
  a.href = canvas.toDataURL()
  a.download = 'sign.png'
  a.click()
})