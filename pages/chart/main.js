const canvas = document.getElementById("canvas");
const itemGroupEl = document.getElementById('item-table');

let isAdding = false;
let chart;

const dataList = [];

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

function createChart() {
    var xValues = dataList.map(data => data.label);
    var yValues = dataList.map(data => parseInt(data.value));
    var barColors = dataList.map(_ => `hsl(${Math.random() * 360}, 100%, 50%)`);

    chart?.destroy();
    chart = new Chart(canvas, {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function init() {
    chart = new Chart(canvas, {
        type: 'radar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }, {
                label: '# of Votes',
                data: [3, 2, 5, 3, 19, 12],
                borderWidth: 1
            }, {
                label: '# of Votes',
                data: [3, 2, 5, 3, 19, 12],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Custom Chart Title',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            },
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

addEventListener("mouseup", _ => {
    move = false;
});
