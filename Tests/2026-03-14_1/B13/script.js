const video = document.querySelector('video')
let isPlay = false

function timeFormat() {
    const totalSeconds = Math.floor(video.currentTime)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)

    return `${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)} / 02:05`
}

setInterval(() => {
    document.querySelector('p').textContent = timeFormat()
}, 1)

document.querySelectorAll('button')[0].onclick = () => { isPlay = !isPlay; if (isPlay) video.play(); else {video.pause()} } 
document.querySelectorAll('button')[1].onclick = () => video.currentTime -= 10
document.querySelectorAll('button')[2].onclick = () => video.currentTime += 10
document.querySelectorAll('button')[3].onclick = () => video.muted = !video.muted

