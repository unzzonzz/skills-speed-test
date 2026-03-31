const inputs = [...document.querySelectorAll('input')]
inputs.forEach((input, idx) => {
  input.addEventListener('input', (e) => {
    input.value = input.value.replace(/[^0-9]/, '')
    if (input.value.length > 0) {
      input.value = input.value[0]
      inputs[idx + 1]?.focus()
    }
    check()
  })
  input.addEventListener('keydown', (e) => {
    if (!input.value && e.key == 'Backspace') inputs[idx - 1]?.focus()
  })
})

function check() {
  let acc = 0
  inputs.map(input => input.value ? acc++ : '')
  document.querySelector('button').disabled = acc == 6 ? false : true
}