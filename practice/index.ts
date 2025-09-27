//Define the structure of a single Todo item using an Interface.
//This is the first major use of TypeScript's strong typing.

interface Todo {
    id: number;
    task: string;
    isCompleted: boolean;
}

//An array to hold all our ToDo list

const todoList: Todo[] = [];

//A simple counter to assign uniques IDs to new todos
let nextId: number = 1;

/**
 * Add a new task to the todoList
 * @param taskName the description of the task.
 */

function addTask(taskName: string): void {
    const newTask: Todo = {
        id: nextId++, //Assign current id and then increment for the next task
        task: taskName,
        isCompleted: false,
    };

    todoList.push(newTask);
    console.log(`\nTask is added . "${taskName}" (ID: ${newTask.id})`);

}

function viewTask(): void {
    console.log("\n---YOUR TODO LIST---");
    if (todoList.length === 0) {
        console.log("No task");
        return;
    }

    todoList.forEach((todo) => {
        const status = todo.isCompleted ? "DONE" : "PENDING";
        console.log(`${status} ID: ${todo.id} - ${todo.task}`);
    });

    console.log("-------------");
}

function markAsComplete(taskID: number): void {
    const task = todoList.find(todo => todo.id === taskID);
    if (task) {
        task.isCompleted = true;
        console.log("Marked as complete");
    } else {
        console.log("Cannot find the task ID");
    }
}

// --- Start the application logic by calling the functions --- 

console.log("Welcome to the CLI Todo Manager!");

//1. add some task
addTask("Learn TypeScript");
addTask("Complete the CLI Todo Project");
addTask("Review strong typing for function arguments");

//2. View All Task
viewTask();

//3. Mark as complete
markAsComplete(2);

//4. Mark an non-exisiting task
markAsComplete(99);

//5. View All Task
viewTask();




