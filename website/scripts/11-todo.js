const todoList = ['Eat', 'Sleep', 'Grind']

function updateLoop() {
  document.querySelector('.todo-list').innerHTML = ''
  for (let i = 0; i < todoList.length; i++) {
    console.log(todoList[i])
    const html = `<p>${todoList[i]}</p>`
    document.querySelector('.todo-list').innerHTML += html
  }
}

function AddTask() {
  const task = document.querySelector('.task-input').value
  if (!task) return
  todoList.push(task)
  console.log(todoList)
  document.querySelector('.task-input').value = ''
  updateLoop()
}

function pressedEnter(event) {
  if (event.key === 'Enter') AddTask()
}

updateLoop();