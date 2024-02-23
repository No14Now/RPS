const todoList = [
{task : 'Eat', dueDate : '02-20-2024'}, 
{task : 'Sleep', dueDate : '02-20-2024'}, 
{task : 'Grind', dueDate : '02-20-2024'}, 
{task : 'Post Cringe', dueDate : '02-20-2024'}]

function updateLoop() {
  document.querySelector('.todo-list').innerHTML = ''
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const {task, dueDate} = todoObject;
    const html = `<div>${task}</div>
    <div>${dueDate}</div>
    <button onclick=
      "todoList.splice(${i}, 1); 
      updateLoop()"
      class="delete-button">
      Delete
    </button>`
    document.querySelector('.todo-list').innerHTML += html
  }
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