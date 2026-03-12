const timer = document.querySelector('.timer')

let isStarted, startedTime, elapsedTime = 0

function timeFormat(elapsedTime) {
    const totalSeconds = String(Math.floor(elapsedTime / 1000)).padStart(2, 0)
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, 0)
    const seconds = String(totalSeconds % 60).padStart(2, 0)
    const miliSeconds = String(elapsedTime % 1000).padStart(3, 0)

    return `${minutes}:${seconds}:${miliSeconds}`
}

controlButton.addEventListener('click', () => {
    isStarted = !isStarted
    startedTime = Date.now() - (0 || elapsedTime)
    controlButton.textContent = isStarted ? '중지' : '계속'
})

initButton.addEventListener('click', () => {
    [isStarted, startedTime, elapsedTime] = [0, 0, 0]
    timer.textContent = timeFormat(elapsedTime)
})

setInterval(() => {
    if (!isStarted) return
    elapsedTime = Date.now() - startedTime
    timer.textContent = timeFormat(elapsedTime)
}, 1)