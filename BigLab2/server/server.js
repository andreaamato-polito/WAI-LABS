'use strict';

const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');

let app = new express();
const PORT = 3001;

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/tasks', (req, res) => {
    dao.listTasks()
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error); });
});

app.get('/api/tasks/important', (req, res) => {
    dao.importantTasks()
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error); });
});

app.get('/api/tasks/private', (req, res) => {
    dao.privateTasks()
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error); });
});

app.get('/api/tasks/today', (req, res) => {
    dao.todayTasks()
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error) });
});

app.get('/api/tasks/next7Days', (req, res) => {
    dao.next7DaysTasks()
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error); });
});

app.get('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    dao.getTask(id)
        .then((task) => { res.json(task); })
        .catch((error) => { res.status(500).json(error); });
});

app.post('/api/tasks', async (req, res) => {
    let description = req.body.description;
    let important = req.body.important;
    let prvt = req.body.priv;
    let deadline = req.body.deadline;
    let completed = req.body.completed;
    let user = req.body.user;
    

    try {
        let id = await dao.getLastId();
        await dao.createTask({
            id: ++id,
            description: description,
            important: important,
            private: prvt,
            deadline: deadline,
            completed: completed,
            user: user
        });
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await dao.deleteTask(id);
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    const id = req.params.id;
    let description = req.body.description;
    let important = req.body.important;
    let prvt = req.body.private;
    let deadline = req.body.deadline;
    let completed = req.body.completed;
    let user = req.body.user;

    try {
        await dao.updateTask({
            id: id,
            description: description,
            important: important,
            private: prvt,
            deadline: deadline,
            completed: completed,
            user: user
        });
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/api/tasks/completed/:id', async (req, res) => {
    const id = req.params.id;
    try { 
        let task = await dao.getTask(id);
        await dao.markTask(task);
        res.end();
    }catch (error){
        res.status(500).json(error);
    }
});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));