const $ = e => document.querySelector(e)
const canvas = $('canvas')
const ctx = canvas.getContext('2d')

let isDrawing, previousX, previousY

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true
    ;[previousX, previousY] = [e.offsetX, e.offsetY]
})

canvas.addEventListener('mouseup', () => {
    isDrawing = false
})

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return
    
    ctx.beginPath()
    ctx.moveTo(previousX, previousY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    ctx.closePath()

    ;[previousX, previousY] = [e.offsetX, e.offsetY]
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