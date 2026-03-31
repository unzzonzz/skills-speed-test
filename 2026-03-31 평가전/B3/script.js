const $ = (q) => document.querySelector(q)
let [x, y] = [window.innerWidth / 2, window.innerHeight / 2]
console.log(x, y);
// $('.square')

document.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowDown') move(0, 10)
  if (e.key == 'ArrowUp') move(0, -10)
  if (e.key == 'ArrowLeft') move(-10, 0)
  if (e.key == 'ArrowRight') move(10, 0)
})

function move(cx, cy) {
  if (x + cx - 50 < 0 || y + cy - 50 < 0 || x + cx + 50 > window.innerWidth || y + cy + 50 > window.innerHeight) return

  x = x + cx
  y = y + cy

  $('.square').style.left = `${x}px`
  $('.square').style.top = `${y}px`
}

move(0, 0)