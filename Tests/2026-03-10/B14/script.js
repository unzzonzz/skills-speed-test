const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

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
    let previousEnd = 0
    legend.innerHTML = ''
    ctx.clearRect(0, 0, 500, 500)

    state.datas.forEach(data => {
        ctx.beginPath()
        ctx.moveTo(250, 250)
        ctx.arc(250, 250, 200, previousEnd, previousEnd + (getPercent(data.value) * Math.PI) * 2)
        ctx.fillStyle = data.color
        ctx.fill()
        ctx.closePath()

        console.log(getPercent(data.value) * 100);
        console.log(data.color);
        previousEnd = previousEnd + (getPercent(data.value) * Math.PI * 2)

        legend.innerHTML += `
            <div class="legend-color" style="background-color: ${data.color}"></div>
            <span>${data.label} (${Math.round(getPercent(data.value) * 100)}%)</span>
        `
    })
}

function getRandomColor() {
    let color = '#'
    const str = 'abcdef1234567890'

    for (i = 0; i < 6; i++) color += str[Math.floor(Math.random() * str.length)]

    return color
}

addButton.addEventListener('click', () => {
    if (!labelInput.value || !valueInput.value) return alert('값을 모두 입력해주세요!')
    store.setState({ datas: [...store.getState().datas, { label: labelInput.value, value: Number(valueInput.value), color: getRandomColor() }] })
    labelInput.value = ''
    valueInput.value = ''
    render(store.getState())
})

initButton.addEventListener('click', () => {
    store.setState({ datas: [] })
    render(store.getState())
    alert('모두 초기화되었습니다!')
})

function getPercent(value) {
    const datas = store.getState().datas
    let sum = 0

    datas.forEach(data => {
        sum += data.value
    })

    return value / sum
}

const store = createState({ datas: [] })

render(store.getState())