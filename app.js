// Переменые элементов ДОМ
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const search = document.querySelector('#search');
const taskInput = document.querySelector('#task');

//  загрузка всех событий
loadEventListeners();

// реализация функции загрузки
function loadEventListeners() {
  // загрузка ДОМ
  document.addEventListener('DOMContentLoaded', getTasks);
  // добавление элемента в список
  form.addEventListener('submit', addTask);
  // удаление элмента из списка
  taskList.addEventListener('click', removeTask);
  // очистить список
  clearBtn.addEventListener('click', clearTasks);
  // поиск по списку
  search.addEventListener('keyup', searchTasks);
}

// достаем элементы из LocalStorage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // создание элемента списка
    const li = document.createElement('li');
    // добавляем класс
    li.className = 'collection-item';
    // присоединяем к имеющемуся списку
    li.appendChild(document.createTextNode(task));
    // создаем элемент ссылки
    const link = document.createElement('a');
    // добавляем к ссылке класс
    link.className = 'delete-item secondary-content';
    // добавляем иконку html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // присоединяем ссылку к списку
    li.appendChild(link);

    // присоединяем элемент списка к общему списку
    taskList.appendChild(li);
  });
}

// функция добавления задачи
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Смотри комментарии к функции getTasks()
  const li = document.createElement('li');

  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');

  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

  // сохраняем задачу в LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  // очищаем поле ввода
  taskInput.value = '';

  e.preventDefault();
}

// Храним задачи в LocalStorage
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Удаление задачи
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Вы уверенны что хотите удалить задачу?')) {
      e.target.parentElement.parentElement.remove();

      // удаление из LocalStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// удаление из LocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Очистить список
function clearTasks() {
  taskList.innerHTML = '';

  // Очистить список из LocalStorage
  clearTasksFromLocalStorage();
}

// Очистить список из LocalStorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Поиск по задачам
function searchTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}