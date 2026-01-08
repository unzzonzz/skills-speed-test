$ = e => document.querySelector(e)
$$ = e => [...document.querySelectorAll(e)]

let isAllEntered = 0
let num = /[^0-9]*$/

$$('input')[0].focus()

$$('input').forEach(input => {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(num, '')

        if (e.target.value.length && e.target.dataset.index != $$('input').length) $$('input')[e.target.dataset.index].focus()
        if (e.target.value.length > 1) e.target.value = e.target.value[0]

        validate()
    })

    input.addEventListener('keydown', (e) => {
        if (e.key == 'Backspace' && e.target.dataset.index != 1) {
            e.target.value = null
            $$('input')[e.target.dataset.index - 2].focus()
        }
    })
})
    
function validate() {
    isAllEntered = 0

    $$('input').forEach(input => {
        if (input.value.length) isAllEntered++
        else isAllEntered--

        if (isAllEntered == $$('input').length) $('button').classList.remove('disabled')
        else $('button').classList.add('disabled')
    })
}