const timer = document.querySelector('.timer')
let isStarted, startTime, elapsedTime = false

function formatTime(elapsedTime) {
    const totalSeconds = Math.floor(elapsedTime / 1000)
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, 0)
    const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, 0)
    const miliSeconds = String(elapsedTime % 1000).padStart(3, 0)

    return `${minutes}:${seconds}:${miliSeconds}`
}

controlButton.addEventListener('click', () => {
    isStarted = !isStarted
    startTime = Date.now() - (0 || elapsedTime)
    controlButton.textContent = isStarted ? '중지' : '계속'
})

initButton.addEventListener('click', () => {
    [isStarted, startTime, elapsedTime] = [0, 0, 0]
    controlButton.textContent = '시작'
    timer.innerHTML = formatTime(elapsedTime)
})

setInterval(() => {
    if (!isStarted) return
    elapsedTime = Date.now() - startTime
    timer.innerHTML = formatTime(elapsedTime)
}, 1)