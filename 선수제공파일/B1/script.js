const input = document.querySelector('input')
const span = document.querySelector('span')

input.addEventListener('input', (e) => {
  input.style.border = '1px solid ' + checkStrength(e.target.value).color
  span.textContent = checkStrength(e.target.value).level
})

function checkStrength(password) {
  if (!password) return { level: '', color: 'black' }
  if (password.length < 6) return { level: '약함', color: 'red' }
  if (password.length >= 8 && /[0-9]/.test(password) && /[A-Z]/.test(password) && /[!@#$%^&*]/.test(password)) return { level: '강함', color: 'green' }
  if (password.length >= 6 && /[0-9]/.test(password) || /[A-Z]/.test(password)) return { level: '보통', color: 'orange' }
  return { level: '', color: 'black' }
}