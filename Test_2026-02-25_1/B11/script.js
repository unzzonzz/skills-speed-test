const $ = e => document.querySelector(e)
const $$ = e => [...document.querySelectorAll(e)]

let isStarted = false
let startTime
let previousTime

function formatTime(elapsedTime) {
  const totalSeconds = Math.floor((Date.now() - startTime) / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const miliSecondes = elapsedTime % 1000
  
  return `${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)}:${String(miliSecondes).padStart(3, '0')}`
}

$$('button')[0].addEventListener('click', () => {
  if (!isStarted) {
    startTime = Date.now() - (previousTime || 0)
    isStarted = true
  } else {
    previousTime = Date.now() - startTime
    isStarted = false
  }
})

$$('button')[1].addEventListener('click', () => {
  isStarted = false
  startTime = Date.now()
  $('.timer').textContent = '00:00:00'
})

setInterval(() => {
  if (!isStarted) return
  const elapsedTime = Date.now() - startTime
  $('.timer').textContent = formatTime(elapsedTime)
}, 1)