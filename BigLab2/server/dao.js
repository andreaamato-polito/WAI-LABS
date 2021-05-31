'use strict';
// Data Access Object (DAO)

const sqlite = require('sqlite3');
const dayjs = require('dayjs')


// open the database
const db = new sqlite.Database('tasks.db', (err) => {
    if (err) throw err;
});

// get all tasks
exports.listTasks = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE user=?';
        db.all(sql, [userId], (err, rows) => {
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


exports.importantTasks = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE important=1 AND user=?';
        db.all(sql, [userId], (err, rows) => {
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



exports.privateTasks = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE private=1 AND user=?';
        db.all(sql, [userId], (err, rows) => {
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

exports.todayTasks = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tasks WHERE user=?";
        db.all(sql, [userId], (err, rows) => {
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
            })).filter(t => {
                if (t.deadline === undefined)
                    return false;
                let taskDate = new dayjs(t.deadline);
                return taskDate.isSame(dayjs(), 'day');
            });
            resolve(tasks);
        });
    });
};

//YYYY-MM-DD HH:mm
exports.next7DaysTasks = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tasks WHERE user=?";
        db.all(sql, [userId], (err, rows) => {
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
            })).filter(t => {
                if (t.deadline === undefined)
                    return false;
                let taskDate = new dayjs(t.deadline);
                let next7Days = dayjs().add(8, 'day');
                return taskDate.isAfter(dayjs(), 'day') && taskDate.isBefore(next7Days, 'day');
            });
            resolve(tasks);
        });
    });
};

exports.getTask = (id, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE id=? AND user=?';
        db.get(sql, [id, userId], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                reject({ error: 'Task not found.' });
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
        db.get(sql, (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                reject(0);
            } else {
                const id = row.id;
                resolve(id);
            }
        });
    });
};

exports.createTask = (task, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO tasks(id, description, important, private, deadline, completed, user) VALUES(?, ?, ?, ?, ?, ?, ?)';
        db.run(sql, [task.id, task.description, task.important, task.private, dayjs(task.deadline).format("YYYY-MM-DD HH:mm"), task.completed, userId], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID)
        });
    });
};

exports.deleteTask = (id, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM tasks WHERE id=? AND user=?';
        db.run(sql, [id, userId], (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    });
};

exports.updateTask = (task, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE tasks SET description=?, important=?, private=?, deadline=?, completed=? WHERE id=? AND user=?';
        db.run(sql, [task.description, task.important, task.private, dayjs(task.deadline).format("YYYY-MM-DD HH:mm"), task.completed, task.id, userId], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.markTask = (task, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE tasks SET completed=? WHERE id=? AND user=?';
        db.run(sql, [!task.completed, task.id, userId], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};


