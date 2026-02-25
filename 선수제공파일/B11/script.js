let startTime = 0
let elapsedTime = 0
let isRunning = false

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const milliseconds = ms % 1000

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`
}

function render() {
  if (isRunning) {
    elapsedTime = Date.now() - startTime
  }
  document.querySelector('.timer').textContent = formatTime(elapsedTime)
}

document.querySelectorAll('button')[0].addEventListener('click', () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime
    isRunning = true
    document.querySelectorAll('button')[0].textContent = '중지'
  } else {
    isRunning = false
    document.querySelectorAll('button')[0].textContent = '계속'
  }
})

document.querySelectorAll('button')[1].addEventListener('click', () => {
  startTime = 0
  elapsedTime = 0
  isRunning = false
  document.querySelectorAll('button')[0].textContent = '시작'
  render()
})

setInterval(render, 10)