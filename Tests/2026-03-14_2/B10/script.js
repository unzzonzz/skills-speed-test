let isDrawing, prevX, prevY = 0
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true

    [prevX, prevY] = [e.offsetX, e.offsetY]
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

document.querySelectorAll('button')[1].onclick = () => {
    const a = document.createElement('a')
    a.href = canvas.toDataURL()
    a.download = 'sign.png'
    a.click()
}