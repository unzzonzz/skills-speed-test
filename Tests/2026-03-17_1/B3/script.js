const width = window.innerWidth
const height = window.innerHeight
const square = document.querySelector('.square')

let [x, y] = [0, 0]

window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowRight') move(10, 0)
    if (e.key == 'ArrowLeft') move(-10, 0)
    if (e.key == 'ArrowUp') move(0, -10)
    if (e.key == 'ArrowDown') move(0, 10)
})

function move(addX, addY) {
    if (x + addX > width || x + addX < 0 || y + addY > height || y + addY < 0) return

    [x, y] = [x + addX, y + addY]

    square.style.transform = `translate(${x}px, ${y}px)`
}