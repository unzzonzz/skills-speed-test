const input = document.querySelector('input')
const span = document.querySelector('span')

input.addEventListener('input', () => {
    input.style.border = '1px solid black'
    span.textContent = ''
    if (input.value.length < 6) {
        input.style.border = '1px solid red'
        span.textContent = '약함'
    }
    if (input.value.length >= 6 && /[A-Z]/.test(input.value) || /[0-9]/.test(input.value)) {
        input.style.border = '1px solid orange'
        span.textContent = '보통'
    }
    if (input.value.length >= 8 && /[A-Z0-9]/.test(input.value) && /[!@#$%^&*]/.test(input.value) ) {
        input.style.border = '1px solid green'
        span.textContent = '초록'
    }
})