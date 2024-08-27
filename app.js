const tracker = require("./tracker");

const actions = process.argv[2];

const handleTask = () => {
  switch (actions) {
    case "add":
      tracker.addTask();
      break;
    case "update":
      tracker.updateTask();
      break;
    case "delete":
      tracker.deleteTask();
      break;
    case "mark":
      tracker.markTask();
      break;
    case "list":
      tracker.getListTask();
      break;
    default:
      console.log('Invalid method!')
      break;
  }
};

handleTask();
