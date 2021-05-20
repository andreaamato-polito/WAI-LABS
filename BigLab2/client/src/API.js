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
    const response = await fetch('/api/tasks');
    const loadedTasks = await response.json();
    const tasksArray = await loadedTasks.map(lt => {
        const t = JSON.parse(JSON.stringify(lt));
        return new Task(t.id, t.description, t.important, t.private, t.deadline, t.completed, t.user);
    });

    return tasksArray;
}

async function addNewTask(task){
        const response = await fetch('/api/tasks', {
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

export { loadAllTasks, addNewTask };