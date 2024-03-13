const todoList = [
{task : 'Eat', dueDate : '2024-02-20'}, 
{task : 'Sleep', dueDate : '2024-02-20'}, 
{task : 'Grind', dueDate : '2024-02-20'}, 
{task : 'Post Cringe', dueDate : '2024-02-20'}]

function updateLoop() {
  document.querySelector('.todo-list').innerHTML = ''

  todoList.forEach(function(todoObject, index) {
    const {task, dueDate} = todoObject;
    const html = `<div>${task}</div>
    <div>${dueDate}</div>
    <button onclick=
      "todoList.splice(${index}, 1); 
      updateLoop()"
      class="delete-button">
      Delete
    </button>`
    document.querySelector('.todo-list').innerHTML += html
  })
}

function AddTask() {
  const task = document.querySelector('.task-input').value
  const dueDate = document.querySelector('.date-input').value
  if (!task) return
  todoList.push({task, dueDate})
  console.log(todoList)
  document.querySelector('.task-input').value = ''
  updateLoop()
}

function pressedEnter(event) {
  if (event.key === 'Enter') AddTask()
}

updateLoop();