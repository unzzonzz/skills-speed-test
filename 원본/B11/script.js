let isStarted, startTime, elapsedTime = 0

document.querySelectorAll('button')[0].onclick = () => {
    isStarted = !isStarted

    document.querySelectorAll('button')[0].textContent = isStarted ? '중지' : '계속'

    startTime = Date.now() - (elapsedTime || 0)
}

function timeFormat(time) {
    const totalSeconds = Math.floor(time / 1000)
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, 0)
    const seconds = String(totalSeconds % 60).padStart(2, 0)
    const miliSeconds = String(time % 1000).padStart(3, 0)

    return `${minutes}:${seconds}:${miliSeconds}`
}

setInterval(() => {
    if (!isStarted) return

    elapsedTime = Date.now() - startTime

    document.querySelector('h1').textContent = timeFormat(elapsedTime)
}, 1)