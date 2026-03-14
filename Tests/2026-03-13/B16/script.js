let datas
let newDatas
let total = 0
let completed = 0
let pending = 0

async function loadData() {
    const res = await fetch('todos.json')
    datas = await res.json()
    
    datas.todos.forEach(todo => {
        total++
        if (todo.completed) completed++
        if (!todo.completed) pending++
    })

    render(datas.todos);
}

function render(todos) {
    todoList.innerHTML = ''

    todos.forEach(data => {
        const div = document.createElement('div')
        div.className = 'todo-item'
        div.innerHTML = `
            <div class="todo-header">
                <h3 class="todo-title">${data.title}</h3>
                <div class="todo-badges">
                    <span class="badge ${data.priority == 'high' ? 'priority-high' : data.priority == 'medium' ? 'priority-medium' : data.priority == 'low' ? 'priority-low' : ''}">${data.priority == 'high' ? '높음' : data.priority == 'medium' ? '보통' : data.priority == 'low' ? '낮음' : ''}</span>
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
    
    totalCount.textContent = total
    completedCount.textContent = completed
    pendingCount.textContent = pending
}

document.querySelectorAll('.filter-btn').forEach((button, i) => {
    button.addEventListener('click', () => {
        if (i == 0) newDatas = datas.todos.filter(data => data)
        else if (i == 1) newDatas = datas.todos.filter(data => !data.completed)
        else if (i == 2) newDatas = datas.todos.filter(data => data.completed)
        else if (i == 3) newDatas = datas.todos.filter(data => data.priority == 'high')

        render(newDatas)

        document.querySelectorAll('.filter-btn').forEach((button, i) => {
            button.classList.remove('active')
        })

        document.querySelectorAll('.filter-btn')[i].classList.add('active')
    })
})

loadData()