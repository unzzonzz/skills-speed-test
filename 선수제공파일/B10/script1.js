const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let isDrawing = false
let prevX = 0
let prevY = 0


function startDrawing(x, y) {
  isDrawing = true

  ctx.beginPath()
  ctx.moveTo(x, y)
  prevX = x, prevY = y
}

function drawing(x, y) {
  ctx.lineTo(x, y)
  ctx.stroke()
}

canvas.addEventListener('mousedown', (e) => {
  startDrawing(e.offsetX, e.offsetY);
})

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return
  
  drawing(e.offsetX, e.offsetY);
})

canvas.addEventListener('mouseup', () => {
  isDrawing = false
})

document.querySelector('.clear').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})

document.querySelector('.import').addEventListener('click', () => {
  const a = document.createElement('a')
  a.href = canvas.toDataURL()
  a.download = 'sign.png'
  a.click()
})