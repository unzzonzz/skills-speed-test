let datas
let filterDatas
let current = 0

async function loadData() {
    const res = await fetch('todos.json')
    datas = await res.json()
    filterDatas = datas.todos
    
    render()
}

function render() {
    todoList.innerHTML = ''

    filterDatas.forEach(data => {
        const div = document.createElement('div')
        div.classList.add('todo-item')
        div.innerHTML = `
            <div class="todo-header">
                <h3 class="todo-title">${data.title}</h3>
                <div class="todo-badges">
                    <span class="badge ${data.priority == 'high' ? 'priority-high' : data.priority == 'medium' ? 'priority-medium' : data.priority == 'low' ? 'priority-low' : ''}">${data.priority == 'high' ? '높음' : data.priority == 'medium' ? '중간' : data.priority == 'low' ? '낮음' : ''}</span>
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

    document.querySelectorAll('.filter-btn').forEach((button, i) => { button.classList.remove('active'); if (i == current) button.classList.add('active') })
}

document.querySelectorAll('.filter-btn').forEach((button, i) => {
    button.onclick = () => {
        current = i

        if (i == 0) filterDatas = datas.todos
        if (i == 1) filterDatas = datas.todos.filter(data => !data.completed)
        if (i == 2) filterDatas = datas.todos.filter(data => data.completed)
        if (i == 3) filterDatas = datas.todos.filter(data => data.priority == 'high')

        render()
    }
})

loadData()