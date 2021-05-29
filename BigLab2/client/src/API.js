const url = 'http://localhost:3000';


function Task(id, description, important, priv, deadline, completed, user) {
        this.id = id,
        this.description = description,
        this.important = important,
        this.priv = priv,
        this.deadline = deadline,
        this.completed = completed,
        this.user = user
}

async function loadAllTasks() {
    const response = await fetch(url+'/api/tasks');
    const loadedTasks = await response.json();
    const tasksArray = await loadedTasks.map(lt => {
        const t = JSON.parse(JSON.stringify(lt));
        return new Task(t.id, t.description, t.important, t.private, t.deadline, t.completed, t.user);
    });

    return tasksArray;
}

async function addNewTask(task){
        const response = await fetch(url+'/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).catch(function (error) {
            console.log('Failed to store data on server: ', error);
        });
        return response;
}

async function deleteTask(id){
    const response = await fetch(url+'/api/tasks/'+id, {
        method: 'DELETE',
    }).catch(function (error){
        console.log('Falied to delete data on server: ', error);
    });

    return response;
}

async function applyFilter(filter) {
    const response = await fetch(url+'/api/tasks/'+filter);
    const loadedTasks = await response.json();
    const tasksArray = await loadedTasks.map(lt => {
        const t = JSON.parse(JSON.stringify(lt));
        return new Task(t.id, t.description, t.important, t.private, t.deadline, t.completed, t.user);
    });

    return tasksArray;
}


async function updateTask(id, task){
    const response = await fetch(url+'/api/tasks/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    }).catch(function (error) {
        console.log('Failed to update data on server: ', error);
    });
    
    return response;
}

async function markTask(id){
    const response = await fetch(url+'/api/tasks/completed/'+id, {
        method: 'PUT',
    }).catch(function (error) {
        console.log('Failed to update data on server: ', error);
    });
    
    return response;
}

async function logIn(credentials){
    let response = await fetch(url+'/api/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if(response.ok){
        const user = await response.json();
        return user.name;
    }
    else{
        try{
            const errDetail = await response.json();
            throw errDetail.message;
        }
        catch(err){
            throw err;
        }
    }
}

async function logOut(){
    await fetch(url+'/api/sessions/current', {method: 'DELETE' });
}

async function getUserInfo(){
    const response = await fetch(url + '/api/sessions/current');
    const userInfo = await response.json();
    if(response.ok){
        return userInfo;
    }else{
        throw userInfo;
    }
}

export { loadAllTasks, addNewTask, deleteTask, applyFilter, updateTask, markTask, logIn, logOut, getUserInfo};