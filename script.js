let taskArr = [];
let totalHrTemp = 0;
const maxHours = 168;
const handleOnSubmit = (e) => {
  const formData = new FormData(e);
  const task = formData.get("task");
  const hr = formData.get("hr");

  const taskObj = {
    task,
    hr,
    id: randomGenerator(),
    type: "entry",
  };
  let totalHrBeforepush = parseInt(hr) + totalHrTemp;
  if (totalHrBeforepush < maxHours) {
    taskArr.push(taskObj);
  } else {
    alert("Sorry, the total hours is over the limit");
  }
  console.log(typeof task);
  console.log(taskObj);
  console.log(taskArr);

  displayTask();
};

// displaying data

const displayTask = () => {
  let str = "";
  let getListParent = document.getElementById("entry");
  let entryArr = taskArr.filter((item) => item.type === "entry");
  console.log("this is entry:" + entryArr);
  entryArr.map((item, i) => {
    str += ` <tr>
        
        <td>${item.task}</td>
        <td>${item.hr}</td>
        <td>
          <button type="button" class="btn btn-danger" onclick="deleteTask('${item.id}')">
            <i class="fa-sharp fa-solid fa-trash"></i>
          </button>
          <button type="button" class="btn btn-success" onclick="switchType('${item.id}', 'bad')">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </td>
      </tr>`;
  });
  getListParent.innerHTML = str;
  displayBad();
  displayTotalHours();
};
const displayBad = () => {
  let str = "";
  let getListParent = document.getElementById("bad");
  let badArr = taskArr.filter((item) => {
    return item.type === "bad";
  });
  console.log("Bad arr:" + badArr);
  badArr.map((item, i) => {
    str += ` <tr>
        
        <td>${item.task}</td>
        <td>${item.hr}</td>
        <td>
          <button type="button" class="btn btn-danger" onclick="deleteTask('${item.id}')">
            <i class="fa-sharp fa-solid fa-trash"></i>
          </button>
          <button type="button" class="btn btn-warning" onclick="switchType('${item.id}', 'entry')">
          <i class="fa-solid fa-arrow-left"></i>
          </button>
        </td>
      </tr>`;
  });
  getListParent.innerHTML = str;
  displaySaveHr();
};

// create unique ID
const randomGenerator = (lengtht = 6) => {
  const collection = "qwertyuiopasdfghjklzxcvbnm";
  let str = "";
  for (let i = 0; i < lengtht; i++) {
    const ranNum = Math.round(Math.random() * collection.length - 1);
    str += collection[ranNum];
  }
  return str;
};

const deleteTask = (id) => {
  if (window.confirm("are you sure?")) {
    taskArr = taskArr.filter((item) => {
      return item.id != id;
    });
    console.log(taskArr);
    displayTask();
  }
};

const switchType = (id, type) => {
  taskArr.map((item, i) => {
    if (id === item.id) {
      item.type = type;
    }
    return item;
  });

  //   console.log("test switch");
  displayTask();
};

const displayTotalHours = () => {
  let sum = 0;
  let getTotalHr = document.getElementById("totalhour");
  taskArr.forEach((item, i) => {
    sum += parseInt(item.hr);
  });
  getTotalHr.innerText = `Total hours is ${sum}/168 hours`;
  totalHrTemp = sum;
};

const displaySaveHr = () => {
  let sum = 0;
  let getSaveHr = document.getElementById("savehour");
  taskArr.forEach((item, i) => {
    if (item.type === "bad") sum += parseInt(item.hr);
  });

  let checkBadValue = taskArr.filter((item) => item.type === "bad");

  getSaveHr.innerText = `Total hours you can save is ${sum}`;

  if (!checkBadValue.length) {
    // console.log("checkbadvakue lenght:", checkBadValue.length);
    getSaveHr.innerText = "";
  }
};
