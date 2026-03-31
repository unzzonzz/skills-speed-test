const ctx = document.querySelector('canvas').getContext('2d')
let [prevX, prevY, isDrawing] = [0, 0, false]

document.addEventListener('mousedown', (e) => {
  isDrawing = true
  ;[prevX, prevY] = [e.offsetX, e.offsetY]
})

document.addEventListener('mousemove', (e) => {
  if (!isDrawing) return
  ctx.beginPath()
  ctx.moveTo(prevX, prevY)
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()

  ;[prevX, prevY] = [e.offsetX, e.offsetY]
})


document.addEventListener('mouseup', (e) => {
  isDrawing = false
})

document.querySelectorAll('button')[0].onclick = () => ctx.clearRect(0, 0, 1000, 1000)
document.querySelectorAll('button')[1].onclick = () => {
  const a = document.createElement('a')
  a.href = document.querySelector('canvas').toDataURL()
  a.download = 'sign.png'
  a.click()
}