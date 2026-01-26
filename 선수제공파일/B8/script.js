$ = e => document.querySelector(e)
$$ = e => document.querySelectorAll(e)

$('.success').addEventListener('click', (e) => {
    showMessage(true)
})

$('.fail').addEventListener('click', (e) => {
    showMessage(false)
})

function showMessage(isSuccess) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.textContent = isSuccess ? '성공하였습니다' : '실패하였습니다'
    
    $('.messages').append(div)
}