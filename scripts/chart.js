const canvas = document.getElementById("canvas");
const itemGroupEl = document.getElementById('item-table');

let isAdding = false;
let chart;

let dataList = [
  {
    label: 'Red',
    value: 12,
  }, {
    label: 'Blue',
    value: 19,
  }, {
    label: 'Yellow',
    value: 10,
  }, {
    label: 'Green',
    value: 8,
  }, {
    label: 'Purple',
    value: 7,
  }, {
    label: 'Orange',
    value: 9,
  }
];

function addItemElToList({ label, value }, index) {
  const dataContainer = document.createElement("div");
  dataContainer.innerHTML = `
        <li>${index}</li>
        <li>${label}</li>
        <li>${value}</li>
        <li>
        <button class="check-btn" onclick="removeItem(${index - 1})">❌</button>
        </li>
    `;
  itemGroupEl.appendChild(dataContainer);
}

function addInputFieldToList(index) {
  isAdding = true;
  const dataContainer = document.createElement("div");
  dataContainer.innerHTML = `
        <li>${index}</li>
        <li><input type="text" id="label" placeholder="label"/></li>
        <li><input type="number" id="value" placeholder="value"/></li>
        <li>
        <button class="check-btn" onclick="updateDataList()">✔</button>
        </li>
    `;
  itemGroupEl.appendChild(dataContainer);
}

function updateDataList() {
  const label = document.querySelector("#label").value;
  const value = document.querySelector("#value").value;
  if (!label || !value) return;
  isAdding = false;
  dataList.push({
    label: label,
    value: value
  });
  itemListElUpdate();
}

function itemListElUpdate() {
  itemGroupEl.innerHTML = '';
  dataList.forEach((data, index) => {
    addItemElToList(data, index + 1);
  })
}

function removeItem(index) {
  isAdding = false;
  dataList.splice(index, 1);
  itemListElUpdate();
}

function createChart({ colors, chartType = "bar" }) {
  var xValues = dataList.map(data => data.label);
  var yValues = dataList.map(data => parseInt(data.value));
  chart?.destroy();
  chart = new Chart(canvas, {
    type: chartType,
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: colors,
        data: yValues,
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

document.getElementById("chart-type").addEventListener("change", e => {
  createChart({ chartType: e.target.value });
});

function clearAllData() {
  dataList = [];
  itemListElUpdate();
}

function init() {
  var xValues = dataList.map(data => data.label);
  var yValues = dataList.map(data => parseInt(data.value));
  chart = new Chart(canvas, {
    type: "radar",
    data: {
      labels: xValues,
      datasets: [{
        data: yValues,
        borderWidth: 1,
      }, {
        data: [5, 8, 15, 3, 6, 1],
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  itemListElUpdate();
}

document.addEventListener("DOMContentLoaded", init);

function showPopUp() {
  document.querySelector(".pop-up").style.display = "block";
}

function download() {
  const imageLink = document.createElement('a');
  const canvas = document.getElementById("canvas");
  imageLink.href = canvas.toDataURL('image/png', 1);
  imageLink.download = "canvas.png";
  imageLink.click();
}

document.querySelector("#close").addEventListener("mousedown", e => {
  if (e.button == 0)
    document.querySelector(".pop-up").style.display = "none";
});

function clamp(value, min, max) {
  if (value < min)
    return min
  if (value > max)
    return max
  return value
}

let move = false;
document.querySelector(".pop-up-options").addEventListener("mousedown", e => {
  if (e.target == document.querySelector(".pop-up-options"))
    move = true;
});
addEventListener("mousemove", e => {
  const popUp = document.querySelector(".pop-up");
  if (move) {
    let pos = popUp.getBoundingClientRect();
    let x = clamp(pos.x + e.movementX + pos.width / 2, pos.width / 2, window.innerWidth - pos.width / 2);
    let y = clamp(pos.y + e.movementY + pos.height / 2, pos.height / 2, window.innerHeight - pos.height / 2);
    popUp.style.left = `${x}px`;
    popUp.style.top = `${y}px`;
  }
});

const el = document.querySelector(".pop-up");
el.addEventListener("mouseover", (e) => {
  const popUp = document.querySelector(".pop-up");
  const pos = popUp.getBoundingClientRect();
  let y = clamp(pos.y + e.movementY + pos.height / 2, pos.height / 2, window.innerHeight - pos.height / 2);
  popUp.style.top = `${y}px`;
});


addEventListener("mouseup", _ => {
  move = false;
});

function dataJsonToObject(jsonData) {
  dataList = jsonData.map(data => {
    return {
      label: data[0],
      value: data[1]
    }
  });
  itemListElUpdate();
}

function getDataFromUser() {
  const input = document.getElementById("excelFileInput");
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const data = new Uint8Array(reader.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // console.log(JSON.stringify(jsonData, null, 2));
      dataJsonToObject(jsonData);
    };
    reader.readAsArrayBuffer(file);
  }
}
