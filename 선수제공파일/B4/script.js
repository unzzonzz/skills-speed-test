$ = (e) => document.querySelector(e)

function timer() {
    const getDate = new Date()
    
    $('.timer').textContent = getDate.getHours() + ':' + getDate.getMinutes() + ':' + getDate.getSeconds()
}

timer()
setInterval(() => timer(), 1000)