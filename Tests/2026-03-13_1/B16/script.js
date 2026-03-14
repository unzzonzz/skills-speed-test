let datas
let newDatas
let current = 0

async function loadData() {
    const res = await fetch('todos.json')
    const todos = await res.json()

    datas = todos.todos

    newDatas = datas

    render()
}

function render() {
    todoList.innerHTML = ''

    newDatas.forEach(data => {
        const div = document.createElement('div')
        div.classList.add('todo-item')
        div.innerHTML = `
            <div class="todo-header">
                <h3 class="todo-title">${data.title}</h3>
                <div class="todo-badges">
                    <span class="badge ${data.priority == 'high' ? 'priority-high' : data.priority == 'medium' ? 'priority-medium' : 'priority-low'}">${data.priority == 'high' ? '높음' : data.priority == 'medium' ? '보통' : '낮음'}</span>
                    <span class="badge status-badge">${data.completed ? '완료' : '진행중'}</span>
                </div>
            </div>
            <p class="todo-description">${data.description}</p>
            <div class="todo-footer">
                <div class="date-info">
                    <span>📅 마감: ${data.dueDate}</span>
                    <span>📝 생성: ${data.createdAt}</span>
                </div>
            </div>
        `

        todoList.append(div)
    })

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.classList.remove('active')

        document.querySelectorAll('.filter-btn')[current].classList.add('active')
    })
}

document.querySelectorAll('.filter-btn').forEach((button, i) => {
    button.onclick = () => {
        if (i == 0) {
            newDatas = datas
        } else if (i == 1) {
            newDatas = datas.filter(data => !data.completed)
        } else if (i == 2) {
            newDatas = datas.filter(data => data.completed)
        } else {
            newDatas = datas.filter(data => data.priority == 'high')
        }

        current = i

        render()
    }
})

loadData()