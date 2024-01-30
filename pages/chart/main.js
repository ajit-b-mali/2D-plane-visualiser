const itemGroupEl = document.getElementById('item-table');

let isAdding = false;
let chart;

const dataList = [
    {
        label: "asdf",
        value: 50,
    },
    {
        label: "qwert",
        value: 60,
    },
    {
        label: "zxcv",
        value: 40,
    },
];

function addItemElToList({ label, value }, index) {
    const dataContainer = document.createElement("div");
    dataContainer.innerHTML = `
    <li>${index}</li>
    <li>${label}</li>
    <li>${value}</li>
    <li>
    <button class="check-btn" onclick="removeItem(${index - 1})">❌</button>
    <button class="check-btn">🖋</button>
    </li>
    `;
    itemGroupEl.appendChild(dataContainer);
}

function addInputFieldToList(index) {
    isAdding = true;
    const dataContainer = document.createElement("div");
    dataContainer.style.backgroundColor = "#dfdfdf";
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
    dataList.forEach((data, index)=> {
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
    
    const canvas = document.getElementById("canvas");
    chart?.destroy();
    chart = new Chart(document.getElementById("canvas") , {
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
    // const img = new Image();
    // img.src = chart.toBase64Image()
    // const anchorEl = document.createElement("a");
    // anchorEl.href = chart.toBase64Image();
    // anchorEl.download = "imaage.png"
    // document.body.appendChild(anchorEl);
    // anchorEl.click();
    // const anchorEl = document.createElement("a");
    // anchorEl.download = "canvas.png";
    // anchorEl.href = canvas.toDataURL('image/png', 1);
    // anchorEl.click();
}

function init() {
    itemListElUpdate();
}

document.addEventListener("DOMContentLoaded", init);

document.querySelector("#options > .btn").addEventListener("click", (event) => {
    if (isAdding) return;
    addInputFieldToList(dataList.length + 1);
});

function download() {
    const imageLink = document.createElement('a');
    const canvas = document.getElementById("canvas");
    imageLink.href = canvas.toDataURL('image/png', 1);
    imageLink.download = "canvas.png";
    // document.write('<img src=" ' + imageLink + ' "/>')
    // console.log(imageLink.href)
    imageLink.click();

}