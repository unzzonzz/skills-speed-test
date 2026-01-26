$ = e => document.querySelector(e)
$$ = e => [...document.querySelectorAll(e)]

const today = new Date()
let current = new Date()

const renderCalendar = () => {
    const [year, month] = [current.getFullYear(), current.getMonth() + 1]
    
    $('.date-info').textContent = `${year}년 ${month}월`
    $('.days').innerHTML = ''

    for (i = 0; i < new Date(year, month - 1, 1).getDay(); i++) {
        const emptyDiv = document.createElement('div')
        $('.days').append(emptyDiv)
    }

    for (i = 0; i < new Date(year, month, 0).getDate(); i++) {
        const div = document.createElement('div')
        div.classList.add('day')
        div.textContent = i + 1
        if (today.getFullYear().toString() + '.' + Number(today.getMonth() + 1) + '.' + today.getDate() === year.toString() + '.' + month.toString() + '.' + (i + 1)) div.classList.add('today')
        $('.days').append(div)
    }
}

$('.btn.prev').addEventListener('click', () => {
    current.setMonth(current.getMonth() - 1)
    renderCalendar()
})

$('.btn.next').addEventListener('click', () => {
    current.setMonth(current.getMonth() + 1)
    renderCalendar()
})

renderCalendar()