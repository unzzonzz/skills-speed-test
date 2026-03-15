let isStarted, startTime, elapsedTime = 0

function timeFormat(time) {
    const totalSeconds = Math.floor(time / 1000)
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, 0)
    const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, 0)
    const miliSeconds = String(time % 1000).padStart(3, 0)

    return `${minutes}:${seconds}:${miliSeconds}`
}

document.querySelector('button').onclick = () => {
    isStarted = !isStarted

    startTime = Date.now() - elapsedTime

    document.querySelector('button').textContent = isStarted ? '중단' : '계속'
}

setInterval(() => {
    if (!isStarted) return

    elapsedTime = Date.now() - startTime
    document.querySelector('h1').textContent = timeFormat(elapsedTime)
}, 1)