




const inputTask = document.querySelector(".input-task");
const AddBtn = document.querySelector("#add");
const Todocontainer = document.querySelector(".todos");
const leftTasks = document.querySelector(".leftTasks")
const clearcomplete = document.querySelector(".clearcomplete")
const footer = document.querySelector(".footer");
const edit = document.querySelector(".edit")
const edit_input = document.querySelector(".edit input");
const btn_save = document.querySelector(".edit button");
const gray = document.querySelector(".gray")
const arrTasks = [];

let numberleftTasks = 0;
let numbercompleteTasks = 0;
document.addEventListener('DOMContentLoaded', returnsavedtodofromLocalstorage)

AddBtn.addEventListener("click", addTask);
clearcomplete.addEventListener("click", clearcompletes);



function clearcompletes() {
    const complete = document.querySelectorAll(".complete");
    complete.forEach((comple) => {
        comple.remove()
        deletefromlocalstorage(comple);
        if (Todocontainer.children.length == 0) {
            footer.style.display = 'none'
        };
    })
}
function addTask(e) {
    e.preventDefault();

    if (inputTask.value !== "") {
        const taskinfo = {
            id: 0,
            title: inputTask.value,
            taskTime: document.createElement("span"),
            tagEdit: document.createElement("a"),
            editIcon: document.createElement("i"),
            taskParagraph: document.createElement("p")
        }
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const checkboxInput = document.createElement("input");
        checkboxInput.setAttribute("type", "checkbox");
        // checkboxInput.classList.add("complete");

        taskinfo.taskParagraph.textContent = taskinfo.title;


        arrTasks.push(taskinfo);


        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash", "btn-trash");
        taskinfo.tagEdit.classList.add("tag");
        taskinfo.tagEdit.appendChild(taskinfo.editIcon);
        taskinfo.editIcon.classList.add("fa-solid", "fa-pen-to-square", "btn-edit")
        // Append elements to todoDiv
        todoDiv.appendChild(checkboxInput);
        todoDiv.appendChild(taskinfo.taskParagraph);
        todoDiv.appendChild(taskinfo.taskTime)
        todoDiv.appendChild(trashIcon);
        todoDiv.appendChild(taskinfo.tagEdit);
        Todocontainer.appendChild(todoDiv);
        numberleftTasks++
        leftTasks.innerHTML = `${numberleftTasks} tasks left`
        footer.style.display = 'flex'
        saveTodoLocalstorage(inputTask.value);
        inputTask.value = '';



    } else {
        alert("you should write a task ")
    }


}
let taskobj = {};
let target;
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("tag")) {
        edit.classList.add('show');
        gray.classList.add('g');
        e.target.classList.add("edited");
        target = e.target.parentElement.children[1]
    }
    taskobj = {
        tartgetTask: target
    }
});

// Attach click event listener to btn_save
edit_input.addEventListener("change", () => {
    deletefromlocalstorage(taskobj.tartgetTask.parentElement)
    taskobj.tartgetTask.textContent = edit_input.value;
    saveTodoLocalstorage(edit_input.value)
})
btn_save.addEventListener('click', () => {
    console.log(taskobj.tartgetTask)
    edit.classList.remove('show');
    gray.classList.remove('g');
    edit_input.value = '';
    arrTasks.forEach(task => {
        if (task.tagEdit.classList.contains("edited")) {

            task.id = 0;
            task.tagEdit.classList.remove("edited")
        }
    })
})




Todocontainer.addEventListener("click", (e) => {


    if (e.target.classList.contains("btn-trash")) {
        if (!e.target.parentElement.classList.contains("complete")) {

            numberleftTasks--
        }
        e.target.parentElement.remove();
        deletefromlocalstorage(e.target.parentElement)
        leftTasks.innerHTML = `${numberleftTasks} tasks left`
        if (Todocontainer.children.length == 0) {
            footer.style.display = 'none'
        };
    }
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox" && e.target.parentElement.lastElementChild.style.color == "white") {

        e.target.parentElement.lastElementChild.style.color = "black";
        e.target.parentElement.children[3].style.color = "black";
        e.target.parentElement.classList.remove("complete")
        numbercompleteTasks--
        numberleftTasks++
        leftTasks.innerHTML = `${numberleftTasks} tasks left`

    } else if (e.target.tagName === "INPUT" && e.target.type === "checkbox" && e.target.parentElement.lastElementChild.style.color !== "white") {

        e.target.parentElement.lastElementChild.style.color = "white";
        e.target.parentElement.children[3].style.color = "white";
        e.target.parentElement.classList.add("complete")
        numbercompleteTasks++
        numberleftTasks--
        leftTasks.innerHTML = `${numberleftTasks} tasks left`

    } else {
        console.log("else")
    }
})

function saveTodoLocalstorage(todo) {
    let todos;


    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'))

    }
    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos))

}
// function editsavelocalstorage(newtodo){
//     let todos;


//     if (localStorage.getItem('todos') === null) {
//         todos = [];

//     } else {
//         todos = JSON.parse(localStorage.getItem('todos'))

//     }

// }
function returnsavedtodofromLocalstorage() {
    let todos;


    if (localStorage.getItem('todos') === null) {
        todos = [];

    } else {
        todos = JSON.parse(localStorage.getItem('todos'))

    }

    todos.forEach(todo => {


        if (todo !== "") {
            const taskinfo = {
                id: 0,
                title: todo,
                taskTime: document.createElement("span"),
                tagEdit: document.createElement("a"),
                editIcon: document.createElement("i"),
                taskParagraph: document.createElement("p")
            }
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");

            const checkboxInput = document.createElement("input");
            checkboxInput.setAttribute("type", "checkbox");
            // checkboxInput.classList.add("complete");

            taskinfo.taskParagraph.textContent = taskinfo.title;


            arrTasks.push(taskinfo);


            const trashIcon = document.createElement("i");
            trashIcon.classList.add("fa-solid", "fa-trash", "btn-trash");
            taskinfo.tagEdit.classList.add("tag");
            taskinfo.tagEdit.appendChild(taskinfo.editIcon);
            taskinfo.editIcon.classList.add("fa-solid", "fa-pen-to-square", "btn-edit")
            // Append elements to todoDiv
            todoDiv.appendChild(checkboxInput);
            todoDiv.appendChild(taskinfo.taskParagraph);
            todoDiv.appendChild(taskinfo.taskTime)
            todoDiv.appendChild(trashIcon);
            todoDiv.appendChild(taskinfo.tagEdit);
            Todocontainer.appendChild(todoDiv);
            numberleftTasks++
            leftTasks.innerHTML = `${numberleftTasks} tasks left`
            footer.style.display = 'flex'




        } else {
            alert("you should write a task ")
        }
    })
}
function deletefromlocalstorage(todo) {
    console.log('hello')
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const textdeleted = todo.children[1].textContent;
    todos.splice(todos.indexOf(textdeleted), 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}



setInterval(() => {
    arrTasks.forEach(task => {
        task.id += 5;

        let min = 0
        if (task.id >= 60) {
            min = Math.floor(task.id / 60)
            task.taskTime.textContent = `Last edited  ${min} min ago`
        } else {
            task.taskTime.textContent = " Last edited  moments ago"
        }
        if (min >= 60) {
            let hours = Math.floor(min / 60);
            let minstill = Math.floor((min / 60 - hours) * 60)
            task.taskTime.textContent = `Last edited  ${hours} hour ${minstill} min ago`

        }
    })

}

    , 5000);


