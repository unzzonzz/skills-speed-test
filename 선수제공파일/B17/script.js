const dropArea = document.querySelector('.drop-area')
const fileInput = document.querySelector('input')

dropArea.addEventListener('click', () => {
  fileInput.click()
})

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault()
  dropArea.classList.add('hovering')
})

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('hovering')
})

dropArea.addEventListener('drop', (e) => {
  e.preventDefault()
  dropArea.classList.remove('hovering')
  const dataTransfer = new DataTransfer()
  dataTransfer.items.add(e.dataTransfer.files[0])
  fileInput.files = dataTransfer.files
  console.log(e.dataTransfer.files[0].name, (e.dataTransfer.files[0].size / 1024).toFixed(1) + 'KB')
})