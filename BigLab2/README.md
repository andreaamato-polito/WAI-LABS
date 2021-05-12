# BigLab 2 - Class: 2021 WA1

## Team name: TEAM_NAME

Team members:
* s123456 LASTNAME FIRSTNAME
* s123456 LASTNAME FIRSTNAME 
* s123456 LASTNAME FIRSTNAME
* s123456 LASTNAME FIRSTNAME (delete line if not needed)

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/GH-Classroom-BigLab-Instructions.pdf), covering this and the next BigLab.

Once cloned this repository, instead, write your names in the above section.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## List of APIs offered by the server

Provide a short description for API with the required parameters, follow the proposed structure.

<br/>

* [HTTP GET] [/api/tasks]
* [retrieve the list of all the available tasks]
* [{
    "id": 2,
    "description": "Go for a walk",
    "important": 1,
    "private": 1,
    "deadline": "2021-04-14 08:30",
    "completed": 1,
    "user": 1
}, {
    "id": 4,
    "description": "Watch the Express videolecture",
    "important": 1,
    "private": 1,
    "deadline": "2021-05-24 09:00",
    "completed": 1,
    "user": 1
}, {
    "id": 5,
    "description": "Prepare thesis discussion",
    "important": 1,
    "private": 1,
    "deadline": "2021-05-21 21:00",
    "completed": 1,
    "user": 1
}, {
    "id": 6,
    "description": "Organize a party",
    "important": 0,
    "private": 0,
    "deadline": "2021-05-22 20:30",
    "completed": 0,
    "user": 1
}, {
    "id": 7,
    "description": "Study for the exam",
    "important": 1,
    "private": 1,
    "deadline": null,
    "completed": 0,
    "user": 1
}, {
    "id": 8,
    "description": "Prepare the slides for the exam",
    "important": 1,
    "private": 0,
    "deadline": "2021-06-20 00:00",
    "completed": 1,
    "user": 1
}, {
    "id": 9,
    "description": "Call Mary",
    "important": 0,
    "private": 1,
    "deadline": null,
    "completed": 0,
    "user": 1
}, {
    "id": 10,
    "description": "biking",
    "important": 1,
    "private": 0,
    "deadline": "2021-05-08",
    "completed": 0,
    "user": 1
}, {
    "id": 11,
    "description": "Monday Lab",
    "important": 1,
    "private": 0,
    "deadline": "2021-05-10",
    "completed": 1,
    "user": 1
}]
* [{"errno": 1,"code": "SQLITE_ERROR"}]

<br/>


* [HTTP GET] [/api/tasks/important]
* [retrieve a list of all the tasks that fulfil the important filter]
* [[{"id":2,"description":"Go for a walk","important":1,"private":1,"deadline":"2021-04-14 08:30","completed":1,"user":1},{"id":4,"description":"Watch the Express videolecture","important":1,"private":1,"deadline":"2021-05-24 09:00","completed":1,"user":1},{"id":5,"description":"Prepare thesis discussion","important":1,"private":1,"deadline":"2021-05-21 21:00","completed":1,"user":1},{"id":7,"description":"Study for the exam","important":1,"private":1,"deadline":null,"completed":0,"user":1},{"id":8,"description":"Prepare the slides for the exam","important":1,"private":0,"deadline":"2021-06-20 00:00","completed":1,"user":1},{"id":10,"description":"biking","important":1,"private":0,"deadline":"2021-05-08","completed":0,"user":1},{"id":11,"description":"Monday Lab","important":1,"private":0,"deadline":"2021-05-10","completed":1,"user":1}]]
* [{"errno": 1, "code": "SQLITE_ERROR"}]

<br/>


* [HTTP GET] [/api/tasks/private]
* [retrieve a list of all the tasks that fulfil the private filter]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

<br/>


* [HTTP GET] [/api/tasks/today]
* [retrieve a list of all the tasks that fulfil the today filter]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

<br/>


* [HTTP GET] [/api/tasks/next7Days]
* [retrieve a list of all the tasks that fulfil the next 7 days filter]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

<br/>


* [HTTP GET] [/api/tasks/, id]
* [retrieve a task, given its id]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

<br/>


* [HTTP POST] [/api/tasks]
* [create a new task, by providing all relevant information (except the id)]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]


<br/>


* [HTTP PUT] [/api/tasks/, id]
* [update an existing task, by providing all relevant information (id will not change after the update)]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

<br/>


* [HTTP PUT] [/api/tasks/completed/, id]
* mark an existing task as completed/uncompleted]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

<br/>


* [HTTP DELETE] [/api/tasks/, id]
* [delete an existing task, given its id]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]


<br/>


* [HTTP Method] [URL, with any parameter]
* [One-line about what this API is doing]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]
