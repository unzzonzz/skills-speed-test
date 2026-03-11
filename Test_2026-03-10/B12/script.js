const input = document.querySelector('input')
const img = document.querySelector('img')
const buttons = document.querySelectorAll('button')

input.addEventListener('input', (e) => {
    img.src = URL.createObjectURL(e.target.files[0])
})

buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
        if (i == 0) img.style.filter = 'grayscale(100%)'
        else if (i == 1) img.style.filter = 'sepia(100%)'
        else if (i == 2) img.style.filter = 'invert(100%)'
        else if (i == 3) img.style.filter = 'none'
    })
})