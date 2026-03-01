let total = 0;
let personal = 0;
let work = 0;
let others = 0;

let transactions = [];
let chart;

function Addshow() {
    document.querySelector(".TransacDetails").classList.toggle("show");
}

function Deleteshow() {
    document.querySelector(".TransacDetails").classList.remove("show");
}

function showC() {

    let desc = document.getElementById("desc").value;
    let categ = document.getElementById("categ").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if (!desc || !categ || isNaN(amount)) {
        alert("Please fill all fields correctly");
        return;
    }

    total += amount;

    if (categ === "personal") personal += amount;
    if (categ === "work") work += amount;
    if (categ === "others") others += amount;

    transactions.push({ desc, categ, amount });

    renderTable();
    updateBalance();
    updateChart();

    document.getElementById("desc").value = "";
    document.getElementById("categ").value = "";
    document.getElementById("amount").value = "";
}

function renderTable() {

    let showcase = document.getElementById("showcase");

    let table = `
        <table border="1">
            <tr>
                <th>Details</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Action</th>
            </tr>
    `;

    transactions.forEach((t, index) => {
        table += `
            <tr>
                <td>${t.desc}</td>
                <td>${t.categ}</td>
                <td>₹${t.amount}</td>
                <td>
                    <button onclick="deleteRow(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    table += `</table>`;

    showcase.innerHTML = table;
}

function deleteRow(index) {

    let t = transactions[index];

    total -= t.amount;

    if (t.categ === "personal") personal -= t.amount;
    if (t.categ === "work") work -= t.amount;
    if (t.categ === "others") others -= t.amount;

    transactions.splice(index, 1);

    renderTable();
    updateBalance();
    updateChart();
}

function updateBalance() {
    document.getElementById("balance").innerText = total;
}

function updateChart() {

    let ctx = document.getElementById("expenseChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Personal', 'Work', 'Others'],
            datasets: [{
                data: [personal, work, others],
                backgroundColor: [
                    'lightblue',
                    'lightgreen',
                    'lightcoral'
                ]
            }]
        }
    });
}
