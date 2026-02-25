function render() {
  const date = new Date()

  document.querySelector('.timer').textContent = date.toTimeString().slice(0, 8)
}

setInterval(() => render(), 10)