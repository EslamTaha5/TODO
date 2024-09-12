let idx = 0
let tasks = [{}];
tasks = JSON.parse(localStorage.getItem("tasks"));
if(tasks == null) tasks= [] 
// filling initial tasks
function fill_tasks(){
    document.getElementById("tasks").innerHTML = "";
    for(let i = 0; i <tasks.length; i++){
        add_card(tasks[i].title, tasks[i].date);
        if(tasks[i].status){
            tasks[i].status = false
            complete_task(i);
        }
    }
}
fill_tasks();
// adding 1 card
function add_card(name, dat){
    const task_div = document.getElementById("tasks");
    task_div.innerHTML += `
        <div id = "${idx}" class = "card">
            <div class = "data">
                <h2 id = "t${idx}" class = "tle">${name}</h2>
                <p id = "task-date">${dat}</p>
            </div>

            <div class="icons">
                <button id = "done${idx}" class = "add done material-symbols-outlined" title = "Done" onclick = "complete_task(${idx})">check</button>
                <button id = "edit${idx}" class = "add update material-symbols-outlined" title = "Update" onclick = edit(${idx})>edit</button>
                <button id = "delete${idx}" class = "add delete material-symbols-outlined" title = "Delete" onclick = del(${idx})>delete</button>
            </div>
        </div>
    `;
    idx++;
}
// add task
function add_task(){
    let task_title = prompt("Enter your task: ");
    var day = (new Date).getDay();
    var month = (new Date).getMonth();
    var year = (new Date).getFullYear();
    var full_date = `${day}-${month}-${year}`;
    let ntask = {
        title:task_title,
        date: full_date,
        status: false
    }
    tasks.push(ntask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    add_card(task_title, full_date);
}
// check button
function complete_task(index){
    if(tasks == null) return;

    const element = document.getElementById(`${index}`);
    if(tasks[index].status == true){
        un_complete(index);
        tasks[index].status = false
    }
    else{
        tasks[index].status = true;

        const bt = document.getElementById(`done${index}`);
        bt.innerHTML = `close`
        element.classList.add('completed');
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function un_complete(index){
    const element = document.getElementById(`${index}`);
    const bt = document.getElementById(`done${index}`);
    element.classList.remove('completed');
    bt.innerHTML = `check`
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// update button
function edit(index){

    var edited = prompt("Enter the new name: ");
    if(edited.length == 0) return;
    tasks[index].title = edited;
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById(`t${index}`).innerHTML = edited;
}

//delete
function del(index){

    var ch = prompt("If you want to delete type Y other wise N: ");
    if(ch == 'Y' || ch == 'y'){
        tasks.splice(index, 1);
        idx = 0;
        localStorage.setItem("tasks", JSON.stringify(tasks));

        fill_tasks();
    }
}