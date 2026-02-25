const $ = e => document.querySelector(e)
const $$ = e => [...document.querySelectorAll(e)]

let currentElement = null

const imgs = [
  './test-images/test1.gif',
  './test-images/test1.jpg',
  './test-images/test1.png',
  './test-images/test2.gif',
  './test-images/test2.jpg',
  './test-images/test2.png'
]

function imgBinding() {
  imgs.forEach(src => {
    const img = document.createElement('img')
    img.src = src
    img.draggable = true
    
    $('.drag-area').append(img)

    img.addEventListener('dragstart', (e) => {
      currentElement = img
    })
  })
}

imgBinding()

$('.drop-area').addEventListener('dragover', (e) => {
  e.preventDefault()
})

$('.drop-area').addEventListener('drop', (e) => {
  e.preventDefault()

  $('.drop-area').append(currentElement)
  if ($('.drop-area').querySelector('p')) $('.drop-area').querySelector('p').remove()
})

function reset() {
  $('.drag-area').innerHTML = ''
  $('.drop-area').innerHTML = '<p>이미지를 드래그하세요.</p>'
  imgBinding()
}