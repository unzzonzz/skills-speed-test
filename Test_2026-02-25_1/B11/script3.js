const controlButton = document.querySelectorAll('button')[0]
const initButton = document.querySelectorAll('button')[1]
const timer = document.querySelector('.timer')
let isStarted, startTime, elapsedTime

function formatTime(time) {
  const totalSeconds = String(Math.floor(time / 1000)).padStart(2, 0)
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, 0)
  const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, 0)
  const miliSecondes = String(elapsedTime % 1000).padStart(3, 0)

  return `${minutes}:${seconds}:${miliSecondes}`
}

controlButton.addEventListener('click', () => {
  isStarted = !isStarted
  startTime = Date.now() - (elapsedTime || 0)
  controlButton.textContent = isStarted ? '중지' : '재개'
})

initButton.addEventListener('click', () => {
  [isStarted, startTime, elapsedTime] = [0, 0, 0]
  timer.textContent = formatTime(elapsedTime)
})

setInterval(() => {
  if (!isStarted) return
  elapsedTime = Date.now() - startTime
  timer.textContent = formatTime(elapsedTime)
}, 1)