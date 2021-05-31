'use strict';

const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const userDao = require('./user-dao');

passport.use(new LocalStrategy(
   function(username, password, done){
        userDao.getUser(username, password).then((user) =>{  
        if(!user)
            return done(null, false, { message: 'Incorrect username and/or password.' });
        return done(null, user);
       });
   }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userDao.getUserById(id)
        .then(user => {
            done(null, user);
        }).catch(err => {
            done(err, null);
        });
});

let app = new express();
const PORT = 3001;

app.use(morgan('dev'));
app.use(express.json());

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated())
        return next();
    return res.status(401).json({ error: 'not authenticated' });
}

app.use(session({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

/*** Tasks API ***/
app.get('/api/tasks', isLoggedIn, (req, res) => {
    dao.listTasks(req.user.id)
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error); });
});

app.get('/api/tasks/All', isLoggedIn, (req, res) => {
    dao.listTasks(req.user.id)
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error); });
});

app.get('/api/tasks/important', isLoggedIn, (req, res) => {
    dao.importantTasks(req.user.id)
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error); });
});

app.get('/api/tasks/private', isLoggedIn, (req, res) => {
    dao.privateTasks(req.user.id)
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error); });
});

app.get('/api/tasks/today', isLoggedIn, (req, res) => {
    dao.todayTasks(req.user.id)
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error) });
});

app.get('/api/tasks/next7Days', isLoggedIn, (req, res) => {
    dao.next7DaysTasks(req.user.id)
        .then((tasks) => { res.json(tasks); })
        .catch((error) => { res.status(500).json(error); });
});

app.get('/api/tasks/:id', isLoggedIn, (req, res) => {
    const id = req.params.id;
    dao.getTask(id, req.user.id)
        .then((task) => { res.json(task); })
        .catch((error) => { res.status(500).json(error); });
});

app.post('/api/tasks', isLoggedIn, async (req, res) => {
    let description = req.body.description;
    let important = req.body.important;
    let prvt = req.body.priv;
    let deadline = req.body.deadline;
    let completed = req.body.completed;
    let user = req.user.id;
    //let user = req.body.user;
    

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
        }, req.user.id);
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

app.delete('/api/tasks/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id;
    try {
        await dao.deleteTask(id, req.user.id);
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    const id = req.params.id;
    let description = req.body.description;
    let important = req.body.important;
    let prvt = req.body.priv;
    let deadline = req.body.deadline;
    let completed = req.body.completed;
    let user = req.user.id;
    //let user = req.body.user;

    try {
        await dao.updateTask({
            id: id,
            description: description,
            important: important,
            private: prvt,
            deadline: deadline,
            completed: completed,
            user: user
        }, req.user.id);
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/api/tasks/completed/:id', async (req, res) => {
    const id = req.params.id;
    try { 
        let task = await dao.getTask(id, req.user.id);
        await dao.markTask(task, req.user.id);
        res.end();
    }catch (error){
        res.status(500).json(error);
    }
});

/*** Users APIs ***/

// POST /sessions
//login
app.post('/api/sessions', function(req, res, next){
    passport.authenticate('local', (err, user, info) => {
        if(err)
            return next(err);
        if(!user){
            return res.status(401).json(info);
        }
        req.login(user, (err) => {
            if(err)
                return next(err);
            return res.json(req.user);
        });
    })(req, res, next);
});

// DELETE /sessions/current
// logout
app.delete('/api/sessions/current', (req, res) => {
    req.logout();
    res.end();
});

// GET /sessions/current
// check wheter the user is logged in or not
app.get('/api/sessions/current', isLoggedIn, (req, res) => {
    console.log("here");
    if(req.isAuthenticated()){
        res.status(200).json(req.user);
    }
    else
        res.status(401).json({ error: 'Unauthenticated user!' });
});

// Activate the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));