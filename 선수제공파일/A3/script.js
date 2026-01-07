$ = e => document.querySelector(e)

$('.toggle-button').addEventListener('click', () => {
    $('#app').classList.toggle('dark')
})