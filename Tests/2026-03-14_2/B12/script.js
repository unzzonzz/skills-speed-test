const input = document.querySelector('input')
const buttons = document.querySelectorAll('button')

input.addEventListener('input', () => {
    img.src = URL.createObjectURL(input.files[0])
})

buttons[0].onclick = () => img.style.filter = 'grayscale(100%)'
buttons[1].onclick = () => img.style.filter = 'sepia(100%)'
buttons[2].onclick = () => img.style.filter = 'invert(100%)'
buttons[3].onclick = () => img.style.filter = 'none'