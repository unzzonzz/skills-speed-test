const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let isDrawing, prevX, prevY

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true

    ;[prevX, prevY] = [e.offsetX, e.offsetY]
})

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return

    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    ctx.closePath()

    ;[prevX, prevY] = [e.offsetX, e.offsetY]
})

canvas.addEventListener('mouseup', () => {
    isDrawing = false
})

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

saveButton.addEventListener('click', () => {
    const a = document.createElement('a')
    a.href = canvas.toDataURL()
    a.download = 'sign.png'
    a.click()
})