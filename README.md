#Project URL
https://roadmap.sh/projects/task-tracker

## Adding a new task
node app.js add "Buy groceries"
### Output: Task added successfully (ID: 1)

## Updating and deleting tasks
node app.js update 1 "Buy groceries and cook dinner"
node app.js delete 1
### Output: list task

## Marking a task as in progress or done
node app.js mark 1 inprogress
node app.js mark 1 done
node app.js mark 1 todo
### Output: list task

## Listing tasks
node app.js list
node app.js list done
node app.js list todo
node app.js list inprogress
### Output: list task

