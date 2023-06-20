POST http://localhost:3000/task
{
    "task": {
        "title": "do this",
        "description": "and that",
        "completionStatus": "unfinished"
    }
}

GET http://localhost:3000/tasks

PUT http://localhost:3000/task
{
    "task": {
        "title": "do this",
        "description": "and that",
        "completionStatus": "finished",
        "dueDate": "Tue Jun 20 2023"
    }
}

GET http://localhost:3000/tasks