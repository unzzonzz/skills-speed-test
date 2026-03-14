const buttons = document.querySelectorAll('button')
const img = document.querySelector('img')
const input = document.querySelector('input')

input.addEventListener('input', (e) => {
    img.src = URL.createObjectURL(e.target.files[0])
})

buttons[0].onclick = () => {
    img.style.filter = 'grayscale(100%)'
}

buttons[1].onclick = () => {
    img.style.filter = 'sepia(100%)'
}

buttons[2].onclick = () => {
    img.style.filter = 'invert(100%)'
}

buttons[3].onclick = () => {
    img.style.filter = 'none'
}