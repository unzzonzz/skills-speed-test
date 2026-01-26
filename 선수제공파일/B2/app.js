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

function render(state) {
    $('ul').innerHTML = ''

    state.todos.forEach((todo, index) => {
        const li = document.createElement('li')
        li.textContent = todo
        const button = document.createElement('button')
        button.dataset.index = index
        button.classList.add('remove')
        button.textContent = '삭제'
        
        li.append(button)
        $('ul').append(li)
    })
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('create')) handleCreateTodo()
    if (e.target.classList.contains('remove')) handleRemoveTodo(parseInt(e.target.dataset.index))
})

function handleCreateTodo() {
    const content = $('input').value
    if (!content.trim()) return
    
    $('input').value = ''
    store.setState({ todos: [...store.getState().todos, content] })
    init()
}

function handleRemoveTodo(index) {
    const newTodos = store.getState().todos.filter((_, i) => i !== index)
    store.setState({ todos: newTodos })
    init()
}

const store = createState({ 
    todos: [],
})

function init() {
    render(store.getState())
}

init()