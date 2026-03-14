const video = document.querySelector('video')
const buttons = document.querySelectorAll('button')
const p = document.querySelector('p')

let isPlay = false

function timeFormat() {
    const totalSecondes = Math.floor(video.currentTime)
    const minutes = String(Math.floor(totalSecondes / 60)).padStart(2, 0)
    const seconds = String(totalSecondes % 60).padStart(2, 0)

    return minutes + ':' + seconds
}

setInterval(() => {
    p.textContent = `${timeFormat()} / 02:05`
})

buttons[0].onclick = () => {
    isPlay ? video.pause() : video.play()

    isPlay = !isPlay
}

buttons[1].onclick = () => {
    video.currentTime -= 10
}

buttons[2].onclick = () => {
    video.currentTime += 10
}

buttons[3].onclick = () => {
    video.muted = !video.muted
}