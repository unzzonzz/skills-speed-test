const controlButton = document.querySelectorAll('button')[0]
const initButton = document.querySelectorAll('button')[1]
const timerDisplay = document.querySelector('.timer')

let isStarted, startTime, elapsedTime

function formatTime(elapsedTime) {
  const totalSeconds = Math.floor(elapsedTime / 1000)
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, 0)
  const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, 0)
  const miliSeconds = String(elapsedTime % 1000).padStart(3, 0)
  return `${minutes}:${seconds}:${miliSeconds}`
}

controlButton.addEventListener('click', () => {
  isStarted = !isStarted
  startTime = Date.now() - (elapsedTime || 0)
  if (isStarted) controlButton.textContent = '중지'
  else controlButton.textContent = '재개'
})

initButton.addEventListener('click', () => {
  [isStarted, startTime, elapsedTime] = [0, 0, 0]
  controlButton.textContent = '시작'
  timerDisplay.textContent = formatTime(elapsedTime)
})

setInterval(() => {
  if (!isStarted) return
  elapsedTime = Date.now() - startTime
  timerDisplay.textContent = formatTime(elapsedTime)
}, 1)