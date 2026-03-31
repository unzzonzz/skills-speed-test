const video = document.querySelector('video')
const buttons = document.querySelectorAll('button')
let isPlayed = false

function timeFormat(time) {
  const totalSeconds = Math.floor(time)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, 0)
  return `${minutes}:${seconds}`
}

setInterval(() => {
  document.querySelector('h3').textContent = `${timeFormat(video.currentTime)} / 2:05`
}, 100);

buttons[0].onclick = () => {
  isPlayed ? video.pause() : video.play()
  isPlayed = !isPlayed
}
buttons[1].onclick = () => video.currentTime -= 10
buttons[2].onclick = () => video.currentTime += 10
buttons[3].onclick = () => video.muted = !video.muted