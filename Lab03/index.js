"use scrict";

function Task(id, description, urgent = false, priv = true, deadline = undefined) {
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.priv = priv;
    this.deadline = deadline;
    this.getDescription = () => "Id: " + this.id + ", Description: " + this.description +
        ", Urgent: " + this.urgent + ", Private: " + this.priv + ", Deadline: " + this.deadline;
}

function TaskList(tasks) {
    this.tasks = tasks;
    this.add = (task) => this.tasks.push(task);
    this.important = () => new TaskList(this.tasks.filter(t => t.urgent === true));
    this.today = () => new TaskList(this.tasks.filter((t) => {
        if (t.deadline === undefined)
            return false;
        let taskDate = new dayjs(t.deadline);
        return taskDate.isSame(dayjs(), 'day');
    }));
    this.nextWeek = () => new TaskList(this.tasks.filter((t) =>{
        if(t.deadline === undefined)
            return false;
        let taskDate = new dayjs(t.deadline);
        let next7Days = dayjs().add(8, 'day');
        return taskDate.isAfter(dayjs(), 'day') && taskDate.isBefore(next7Days, 'day');
    }));
    this.priv = () => new TaskList(this.tasks.filter(t => t.priv === true));
    this.print = () => {
        this.tasks
            .forEach((t) => console.log(t.getDescription()));
        console.log();
    }
}


function showContent(taskList, filter){

    let mainContent = document.querySelector('.tasks');
    mainContent.insertAdjacentHTML('beforeend', `<h1 class="main-content">${filter}</h1>`);
    for(let task of taskList.tasks){
        let row = document.createElement('div');
        row.className = "row";
    
        let descr = document.createElement('div');
        descr.className = "col-4";
        if(task.urgent == true)
            descr.className = "col-4 important";
        descr.innerHTML = `<input type="checkbox" id="check-task" name="task" value="task">  ${task.description}`;
        row.appendChild(descr);
        
        let priv = document.createElement('div');
        priv.className = "col-4";
        if(task.priv == true)
            priv.insertAdjacentHTML('beforeend', '<i class="fas fa-user-lock"></i>');
        row.appendChild(priv);
    
        let date = new dayjs(task.deadline).format('dddd D MMMM YYYY h:mm A');
        let deadline = document.createElement('div');
        deadline.className = "col-4 date";
        if(task.deadline != undefined)
            deadline.innerText = date;
        row.appendChild(deadline);
        
        mainContent.appendChild(row);
        mainContent.insertAdjacentHTML('beforeend', '<div class="dropdown-divider"></div>')
    }
    
}

function clearContent(){
    let mainContent = document.querySelector('.tasks');
    mainContent.innerHTML = `<div class="container tasks"></div>`;
}


const all = document.querySelector('.filter-all');
all.addEventListener('click', event =>{
    console.log(event);
    let filter = event.target.innerText;
    clearContent();
    showContent(listsOfTasks, filter);
});

const important = document.querySelector('.filter-important');
important.addEventListener('click', event =>{
    let filter = event.target.innerText;
    console.log(event.target.innerText);
    clearContent();
    showContent(listsOfTasks.important(), filter);
});

const today = document.querySelector('.filter-today');
today.addEventListener('click', event =>{
    let filter = event.target.innerText;
    console.log(filter);
    clearContent();
    showContent(listsOfTasks.today(), filter);
});

const next7Days = document.querySelector('.filter-week');
next7Days.addEventListener('click', event =>{
    let filter = event.target.innerText;
    console.log(filter);
    clearContent();
    showContent(listsOfTasks.nextWeek(), filter);
});

const priv = document.querySelector('.filter-private');
priv.addEventListener('click', event =>{
    let filter = event.target.innerText;
    console.log(filter);
    clearContent();
    showContent(listsOfTasks.priv(), filter);
});


let listsOfTasks = new TaskList([]);
listsOfTasks.add(new Task(1, 'Laundry'));
listsOfTasks.add(new Task(2, 'Monday lab', false, false, '2021-03-29T10:00'));
listsOfTasks.add(new Task(3, 'Phone call', true, false, '2021-03-08T16:20'));
listsOfTasks.add(new Task(4, 'Biking', false, false, '2021-03-27T12:00'));
listsOfTasks.add(new Task(5, 'Venerdì Santo', false, true, '2021-04-02T20:00'));
listsOfTasks.add(new Task(5, 'Pasqua', false, true, '2021-04-04T13:00'));

