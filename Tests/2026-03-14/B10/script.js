const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let isDrawing, prevX, prevY = 0

canvas.addEventListener('mousedown', (e) => {
    [prevX, prevY] = [e.offsetX, e.offsetY]

    isDrawing = true
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

canvas.addEventListener('mouseup', (e) => {
    isDrawing = false
})

canvas.addEventListener('mouseleave', (e) => {
    isDrawing = false
})

document.querySelectorAll('button')[0].addEventListener('click', () => {
    ctx.clearRect(0, 0, 500, 500)
})

document.querySelectorAll('button')[1].addEventListener('click', () => {
    const a = document.createElement('a')
    a.href = canvas.toDataURL()
    a.download = 'sign.png'
    a.click()
})