const video = document.getElementById('video')
const buttons = document.querySelectorAll('button')
let is

setInterval(() => {
    timeFormat(video.currentTime)
}, 1)

function timeFormat(time) {
    const total = Math.floor(time)
    const minutes = String(Math.floor(total / 60)).padStart(2, 0)
    const seconds = String(Math.floor(total % 60)).padStart(2, 0)

    document.querySelector('h2').textContent = `${minutes}:${seconds} / 02:05`
}

buttons[0].onclick = () => {
    is = !is

    if (is) video.play()
    if (!is) video.pause()
}

buttons[1].onclick = () => video.currentTime -= 10
buttons[2].onclick = () => video.currentTime += 10
buttons[3].onclick = () => video.muted = !video.muted