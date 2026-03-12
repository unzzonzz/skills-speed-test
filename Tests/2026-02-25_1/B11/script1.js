const $ = e => document.querySelector(e)
const $$ = e => [...document.querySelectorAll(e)]

let isStarted, startTime, previousTime

function formatTime(previousTime) {
  const totalSeconds = Math.floor(previousTime / 1000)
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, 0)
  const seconds = String(totalSeconds % 60).padStart(2, 0)
  const miliSeconds = String(previousTime % 1000).padStart(3, 0)
  return minutes + ':' + seconds + ':' + miliSeconds
}

$$('button')[0].addEventListener('click', () => {
  isStarted = !isStarted
  if (isStarted) {
    startTime = Date.now() - (previousTime || 0)
    $$('button')[0].textContent = '중지'
  } else $$('button')[0].textContent = '재개'
})

$$('button')[1].addEventListener('click', () => {
  [isStarted, startTime, previousTime] = [false, 0, 0]
  $('.timer').textContent = formatTime(previousTime)
  $$('button')[0].textContent = '시작'
})

setInterval(() => {
  if (!isStarted) return
  previousTime = Date.now() - startTime
  $('.timer').textContent = formatTime(previousTime)
}, 10)