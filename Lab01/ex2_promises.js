"use strict";

const dayjs = require('dayjs');
const sqlite = require('sqlite3');
const db = new sqlite.Database('tasks.db', (err) => { if (err) throw err; });


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
    this.print = () => {
        this.tasks
            .forEach((t) => console.log(t.getDescription()));
        console.log();
    }
}

/*
function printAll() {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM tasks";
        let taskList = new TaskList([]);
        db.each(sql, (err, row) => {
            if (err)
                reject(err);
            else {
                taskList.add(new Task(row.id, row.description, row.urgent, row.private, dayjs(row.deadline)));
            }
            //qui taskList si riempie
        });
        //qui taskList è vuota
        //qual è la soluzione a questo problema
        console.log("****** All tasks: ******");
        resolve(taskList);
    });
}
*/

function printAll() {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM tasks";
        let taskList = new TaskList([]);
        db.all(sql, (err, rows) => {
            if (err)
                reject(err);
            else {
                for (let row of rows) {
                    taskList.add(new Task(row.id, row.description, row.urgent, row.private, dayjs(row.deadline)));
                }
                console.log("****** All tasks: ******");
                resolve(taskList);
            }
        });
    });
}

function afterADate(date) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM tasks WHERE deadline >= ?";
        let taskList = new TaskList([]);
        db.all(sql, date, (err, rows) => {
            if (err)
                reject(err);
            else {
                for (let row of rows) {
                    taskList.add(new Task(row.id, row.description, row.urgent, row.private, dayjs(row.deadline)));
                }
                console.log("****** Tasks after " + dayjs(date).toString() + ": ******");
                resolve(taskList);
            }
        });
    });
}

function containsWord(word) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM tasks WHERE description LIKE ?";
        let taskList = new TaskList([]);
        db.all(sql, '%' + word + '%', (err, rows) => {
            if (err)
                reject(err);
            else {
                for (let row of rows) {
                    taskList.add(new Task(row.id, row.description, row.urgent, row.private, dayjs(row.deadline)));
                }
                console.log("****** Tasks that contains " + word + ": ******");
                resolve(taskList);
            }
        });
    });
}

printAll().then(tasks => tasks.print());

afterADate('2021-03-10T16:20').then(tasks => tasks.print());

containsWord('call').then(tasks => tasks.print());

db.close();