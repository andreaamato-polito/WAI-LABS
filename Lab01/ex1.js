"use strict";
const dayjs = require('dayjs');

function Task(id, description, urgent = false, priv = true, deadline = undefined) {
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.priv = priv;
    this.deadline = deadline;
    this.getDescription = () => "Id: " + this.id + ", Description: " + this.description +
        ", Urgent: " + this.urgent + ", Private: " + this.priv + ", Deadline: " + this.deadline.toString();
}

function TaskList(tasks) {
    this.tasks = tasks;
    this.add = (task) => this.tasks.push(task);
    this.sortAndPrint = () => {
        this.tasks
            .sort((t1, t2) => {
                if (t1.deadline != undefined)
                    return t1.deadline.isAfter(t2.deadline);
                return true;
            }).forEach((t) => console.log(t.getDescription()));
    }
    this.filterAndPrint = () => {
        this.tasks
            .filter((t) => t.urgent === true)
            .forEach((t) => console.log(t.getDescription()));
    }
}

let taskList = new TaskList([]);
taskList.add(new Task(1, 'laundry'));
taskList.add(new Task(2, 'monday lab', false, false, dayjs('2021-03-16T10:00')));
taskList.add(new Task(3, 'phone call', true, false, dayjs('2021-03-08T16:20')));

//taskList.sortAndPrint();
taskList.filterAndPrint();