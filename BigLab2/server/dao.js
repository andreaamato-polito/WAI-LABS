'use strict';
// Data Access Object (DAO)

const sqlite = require('sqlite3');
const dayjs = require('dayjs')


// open the database
const db = new sqlite.Database('tasks.db', (err) => {
    if (err) throw err;
});

// get all tasks
exports.listTasks = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const tasks = rows.map((t) => ({
                id: t.id,
                description: t.description,
                important: t.important,
                private: t.private,
                deadline: t.deadline,
                completed: t.completed,
                user: t.user
            }));
            resolve(tasks)
        });
    });
};


exports.importantTasks = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE important=1';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const tasks = rows.map((t) => ({
                id: t.id,
                description: t.description,
                important: t.important,
                private: t.private,
                deadline: t.deadline,
                completed: t.completed,
                user: t.user
            }));
            resolve(tasks)
        });
    });
};



exports.privateTasks = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE private=1';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const tasks = rows.map((t) => ({
                id: t.id,
                description: t.description,
                important: t.important,
                private: t.private,
                deadline: t.deadline,
                completed: t.completed,
                user: t.user
            }));
            resolve(tasks)
        });
    });
};

exports.todayTasks = () => {
    return new Promise((resolve, reject) => {
        const date = dayjs().format('YYYY-MM-DD');
        const sql = "SELECT * FROM tasks WHERE deadline=?";
        db.all(sql, date, (err, rows) =>{
            if(err){
                reject(err);
                return;
            }
            const tasks = rows.map((t) =>({
                id: t.id,
                description: t.description,
                important: t.important,
                private: t.private,
                deadline: t.deadline,
                completed: t.completed,
                user: t.user
            }));
            resolve(tasks);
        });
    });
};

exports.next7DaysTasks = () => {
    return new Promise((resolve, reject) => {
        const today = dayjs().format('YYYY-MM-DD');
        const nextWeek = dayjs().add(7, 'day').format('YYYY-MM-DD');
        const sql = "SELECT * FROM tasks WHERE deadline>? AND deadline <=?";
        db.all(sql, [today, nextWeek], (err, rows) =>{
            if(err){
                reject(err);
                return;
            }
            const tasks = rows.map((t) =>({
                id: t.id,
                description: t.description,
                important: t.important,
                private: t.private,
                deadline: t.deadline,
                completed: t.completed,
                user: t.user
            }));
            resolve(tasks);
        });
    });
};

exports.getTask = (id) => {
    return new Promise((resolve, reject) =>{
        const sql = 'SELECT * FROM tasks where id=?';
        db.get(sql, [id], (err, row) =>{
            if (err){
                reject(err);
                return;
            }
            if (row == undefined){
                reject({error: 'Task not found.'});
            } else {
                const task = {
                    id: row.id,
                    description: row.description,
                    important: row.important,
                    private: row.private,
                    deadline: row.deadline,
                    completed: row.completed,
                    user: row.user
                };
                resolve(task);
            }
        });
    });
};


exports.getLastId = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks ORDER BY ID DESC LIMIT 1';
        db.get(sql, (err, row) =>{
            if (err){
                reject(err);
                return;
            }
            if (row == undefined){
                reject(0);
            } else {
                const id = row.id;
                resolve(id);
            }
        });
    });
};

exports.createTask = (task) => {
    return new Promise((resolve, reject) =>{
        const sql = 'INSERT INTO tasks(id, description, important, private, deadline, completed, user) VALUES(?, ?, ?, ?, DATE(?), ?, ?)';
        db.run(sql, [task.id, task.description, task.important, task.private, task.deadline, task.completed, task.user], function (err){
            if (err){
                reject(err);
                return;
            }
            resolve(this.lastID)
        });
    });
};

exports.deleteTask = (id) => {
    return new Promise((resolve, reject) =>{
        const sql = 'DELETE FROM tasks WHERE id=?';
        db.run(sql, [id], (err) =>{
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    });
};

exports.updateTask = (task) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE tasks SET description=?, important=?, private=?, deadline=DATE(?), completed=?, user=? WHERE id=?';
        db.run(sql, [task.description, task.important, task.private, task.deadline, task.completed, task.user, task.id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.markTask = (task) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE tasks SET completed=? WHERE id=?';
        db.run(sql, [!task.completed, task.id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};


