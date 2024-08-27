const EventEmitter = require("events");
const fs = require("fs");

const emitter = new EventEmitter();

emitter.on("invalid-input", () => {
  console.log("Invalid input!");
});

const fileName = "task-tracker.json";

const addTask = () => {
  const task = process.argv[3];
  if (!task) {
    emitter.emit("invalid-input");
    return;
  }

  fs.readFile(fileName, (err, data) => {
    const result = JSON.parse(data?.toString() || "[]");
    const newTasks = Array.isArray(result)
      ? [...result, { id: result.length + 1, name: task, status: "todo" }]
      : [{ id: 1, name: task, status: "todo" }];

    fs.writeFile(fileName, JSON.stringify(newTasks), () => {
      console.log(`Task added successfully (ID: ${result.length + 1})`);
    });
  });
};

const updateTask = () => {
  const id = process.argv[3];
  const task = process.argv[4];
  if (!id || !task) {
    emitter.emit("invalid-input");
    return;
  }
  fs.readFile(fileName, (err, data) => {
    const result = JSON.parse(data?.toString() || "[]");
    if (Array.isArray(result)) {
      const newTasks = result.map((item) =>
        item.id === +id ? { ...item, name: task } : item
      );
      fs.writeFile(fileName, JSON.stringify(newTasks), () => {
        console.log(newTasks);
      });
    }
  });
};

const deleteTask = () => {
  const id = process.argv[3];
  if (!id) {
    emitter.emit("invalid-input");
    return;
  }
  fs.readFile(fileName, (err, data) => {
    const result = JSON.parse(data?.toString() || "[]");
    if (Array.isArray(result)) {
      const newTasks = result.filter((item) => item.id !== +id);
      fs.writeFile(fileName, JSON.stringify(newTasks), () => {
        console.log(newTasks);
      });
    }
  });
};

function markTask() {
  const id = process.argv[3];
  const mark = process.argv[4];
  const status = ["done", "todo", "inprogress"];
  if (!id || !mark || !status.includes(mark)) {
    emitter.emit("invalid-input");
    return;
  }
  fs.readFile(fileName, (err, data) => {
    const result = JSON.parse(data?.toString() || "[]");
    if (Array.isArray(result)) {
      const newTasks = result.map((item) =>
        item.id === +id ? { ...item, status: mark } : item
      );
      fs.writeFile(fileName, JSON.stringify(newTasks), () => {
        console.log(newTasks);
      });
    }
  });
}

function getListTask() {
  const mark = process.argv[3];

  const status = ["done", "todo", "inprogress"];
  if (!mark || !status.includes(mark)) {
    emitter.emit("invalid-input");
    return;
  }

  fs.readFile(fileName, (err, data) => {
    const result = JSON.parse(data?.toString() || "[]");
    if (Array.isArray(result)) {
      const listTask = result.filter((item) => item.status === mark);
      console.log(listTask);
    }
  });
}

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  markTask,
  getListTask,
};
