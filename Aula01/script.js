const form = document.querySelector("form");
const todoList = document.querySelector(".todo-list");
const input = document.querySelector("#input");
const todayDate = document.querySelector(".date");

const getDate = () => {
    let date = new Date();
    date = date.toString().split(" ");
    todayDate.innerHTML = `${date[1]} ${date[2]} ${date[3]}` 
}

let dbItems = [];

const deleteTask = (index) => {
    dbItems.splice(index, 1);
    createTask();
}

const checkTask = (index) => {
    dbItems[index].status = !dbItems[index].status;
    createTask();
}

const createTask = () => {

    todoList.innerHTML = "";

    for (item of dbItems) {

        const todo = document.createElement("div");
        const checked = item.status;
        if(checked) {
        todo.setAttribute("class", "todo done");
        } else {
            todo.setAttribute("class", "todo");
        }

        const ul = document.createElement("ul");

        const itemList = document.createElement("li");
        const textList = document.createElement("p");
        textList.innerHTML = item.task;

        const index = dbItems.indexOf(item);

        const checkBtn = document.createElement("button");
        checkBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        checkBtn.setAttribute("onclick", `checkTask(${index})`);
        checkBtn.setAttribute("class", "check-btn");


        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        deleteBtn.setAttribute("onclick", `deleteTask(${index})`);
        deleteBtn.setAttribute("class", "delete-btn");

        itemList.appendChild(checkBtn);
        itemList.appendChild(textList);
        itemList.appendChild(deleteBtn);

        ul.appendChild(itemList);

        todo.appendChild(ul);

        todoList.appendChild(todo);
    }

    localStorage.setItem("todo", JSON.stringify(dbItems));
}

const validateInput = () => {
    const inputValue = input.value.trim();
    const msg = document.querySelector(".msg");
    
    if (!inputValue || input.classList.contains("")) {  
        input.classList.add("invalid");
        msg.style.visibility  = "visible";             
        console.log("nothing on input");
    } else {   
        input.classList.remove("invalid");
        msg.style.visibility  = "hidden";    
        dbItems.push({
            task: inputValue,
            status: false
        });
        createTask();
        input.value = "";
    }
}


const getDataStorage = () => {
    const storageTasks = localStorage.getItem("todo");
    if (storageTasks) {
        dbItems = JSON.parse(storageTasks);
    }
    createTask();
}

getDataStorage();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInput();
})

window.onload = () => getDate();
