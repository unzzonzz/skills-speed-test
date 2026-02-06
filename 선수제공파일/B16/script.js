const $ = e => document.querySelector(e)
const $$ = e => [...document.querySelectorAll(e)]

function createState(initialState) {
  let state = initialState

  return {
    getState: () => state,
    setState: (newState) => {
      state = { ...state, ...newState }
    }
  }
}

async function loadData() {
  const res = await fetch('todos.json')
  const data = await res.json()

  store.setState({ todos: data.todos })
}

async function render(state) {
  $('.todo-list').innerHTML = ''

  const todos = state.todos
    .filter(todo => {
      if (state.currentFilter == 'all') return true
      else if (state.currentFilter == 'inProgress') return !todo.completed
      else if (state.currentFilter == 'completed') return todo.completed
      else if (state.currentFilter == 'highPriority') return todo.priority == 'high'
    })

  todos.forEach(todo => {
    const div = document.createElement('div')
    div.classList.add('todo-item')
    if (todo.completed) div.classList.add('completed')
    div.innerHTML = `
      <div class="todo-header">
          <h3 class="todo-title">${todo.title}</h3>
          <div class="todo-badges">
              <span class="badge ${todo.priority == 'high' ? 'priority-high' : todo.priority == 'medium' ? 'priority-medium' :  'priority-low' }">${todo.priority == 'high' ? '높음' : todo.priority == 'medium' ? '보통' :  '낮음' }</span>
              <span class="badge status-badge">${todo.completed ? '완료' : '진행중'}</span>
          </div>
      </div>
      <p class="todo-description">${todo.description}</p>
      <div class="todo-footer">
          <div class="date-info">
              <span>📅 마감: ${todo.dueDate}</span>
              <span>📝 생성: ${todo.createdAt}</span>
          </div>
      </div>
    `

    $('.todo-list').append(div)
  })
}

$$('.filter-btn').forEach((button, index) => {
  button.addEventListener('click', () => handleChangeFilter(index))
})

function handleChangeFilter(index) {
  $$('.filter-btn').forEach(button => {
    button.classList.remove('active')
  })

  $$('.filter-btn')[index].classList.add('active')
  
  let currentFilter

  if (index == 0) currentFilter = 'all'
  else if (index == 1) currentFilter = 'inProgress'
  else if (index == 2) currentFilter = 'completed'
  else if (index == 3) currentFilter = 'highPriority'

  store.setState({ currentFilter: currentFilter })
  render(store.getState())
}

function handleCounts(state) {
  const total = state.todos.length
  const completed = state.todos.filter(todo => todo.completed).length
  const inProgress = total - completed

  $('#totalCount').textContent = total
  $('#completedCount').textContent = completed
  $('#pendingCount').textContent = inProgress
}

const store = createState({
  todos: [],
  currentFilter: 'all'
})

async function init() {
  await loadData()
  render(store.getState())
  handleCounts(store.getState())
}

init()