let expenses = JSON.parse(localStorage.getItem("expensesArray")) || [];
console.log(expenses);
let expensesHistory = JSON.parse(localStorage.getItem("expensesHistoryArray")) || [];

console.log(expensesHistory);

let rowNumber = 0
let numberTotal = 0
let total_count = 0
let total_history_count = 0

const description_value = document.querySelector(".description");
const amount_value = document.querySelector(".amount");
const date_value = document.querySelector(".date");
const expensesTable = document.querySelector(".expensesTable");
const historyExpensesTable = document.querySelector(".historyExpensesTable");
const today_transactions = document.querySelector(".todaytransactions");
const history = document.querySelector(".historyTransactions");
const no_transactions = document.querySelector(".notransactions");

const total_countValue = document.querySelector(".total");
const total_history_countValue = document.querySelector(".history-total");

const insertBtn = document.querySelector(".insert");

const setGet = function() {
    console.log("setGet function called");

    let expenses = JSON.parse(localStorage.getItem("expensesArray")) || [];
    let expensesHistory = JSON.parse(localStorage.getItem("expensesHistoryArray")) || [];

    if (!expenses || expenses.length === 0 && !expensesHistory || expensesHistory.length === 0) {
        console.log("No expenses found in localStorage.");
        return; // Exit the function if expenses2 is empty or undefined
    }


    expenses.forEach((element) => {
        /*count = parseFloat(element[1].replaceAll(",", ""));
        total_count = total_count + count;
        const formatter = new Intl.NumberFormat('en-US');
        console.log(total_count);
        const total_countFormatted = formatter.format(total_count);
        console.log(total_countFormatted);
        total_countValue.textContent = "$" + total_countFormatted;*/

        const newRow = expensesTable.insertRow();

        newRow.classList.add("transactionsRow");

        const timeCell = newRow.insertCell();
        const descriptionCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        const timeIdCell = newRow.insertCell("span");

        timeCell.textContent = element[2][1]; // Setting the time value
        descriptionCell.textContent = element[0]; // Setting the description
        amountCell.textContent = "$" + element[1]; // Setting the amount
        timeIdCell.textContent = element[3];

        const newI = document.createElement("i");
        newI.classList.add("fa");
        newI.classList.add("fa-trash-o");
        newI.style.color = "white";
        newI.style.fontSize = "1em";

        deleteCell.appendChild(newI);

        timeCell.classList.add("celltime");
        descriptionCell.classList.add("celldescription");
        amountCell.classList.add("cellamount");
        deleteCell.classList.add("celldelete");
        timeIdCell.classList.add("time_" + element[3]);
        timeIdCell.style.display = "none";
    });

    expensesHistory.forEach((element) => { // Include index parameter
        const newHistoryRow = historyExpensesTable.insertRow();

        newHistoryRow.classList.add("transactionsHistoryRow");

        const historyTimeCell = newHistoryRow.insertCell()
        const historyDescriptionCell = newHistoryRow.insertCell();
        const historyAmountCell = newHistoryRow.insertCell();
        const historyDeleteCell = newHistoryRow.insertCell();

        historyTimeCell.textContent = element[2][0] + "\n" + element[2][1];
        historyDescriptionCell.textContent = element[0];
        historyAmountCell.textContent = "$" + element[1];

        const newHistoryI = document.createElement("i");
        newHistoryI.classList.add("fa");
        newHistoryI.classList.add("fa-trash-o");
        newHistoryI.style.color = "white";
        newHistoryI.style.fontSize = "1em";

        historyDeleteCell.appendChild(newHistoryI);

        historyTimeCell.classList.add("celltime");
        historyDescriptionCell.classList.add("celldescription");
        historyAmountCell.classList.add("cellamount");
        historyDeleteCell.classList.add("celldelete");

        historyTimeCell.style.height = "8vh";
    });
};

const filterByToday = function () {
    expenses.forEach((element) => {
        const timeIdTotal = new Date().getTime() - element[3];
        const elementId = document.querySelector(".time_" + element[3]);
        console.log("time total: " + timeIdTotal);
        row = elementId.closest(".transactionsRow");
        rowNumber++;
        console.log("rowNumber: " + rowNumber);
        if (timeIdTotal > 86400000) {
            row.style.display = "none";
            numberTotal = numberTotal + 1;
            console.log("Number total: " + numberTotal);
        }
        if (rowNumber = numberTotal) {
            expensesTable.style.display = "none";
            no_transactions.style.display = "block";
        }
    })
}

setGet();
filterByToday();

const hidNoTransactions = function () {
    if (document.querySelectorAll(".expensesTable .transactionsRow").length > 0) {
        no_transactions.style.display = "none";
    } else {
        expensesTable.style.display = "none";
        no_transactions.style.display = "block";
    };
};

hidNoTransactions();

function countFunction() {
    total_count = 0;
    const expensesCell = expensesTable.querySelectorAll(".cellamount");
    expensesCell.forEach((element) => {
    value = element.textContent.replaceAll(",", "").replace("$", "");
    console.log(total_count);
    total_count = total_count + parseFloat(value);
    console.log(total_count);
    const formatter = new Intl.NumberFormat('en-US');
    total_countFormatted = formatter.format(total_count);
    total_countValue.textContent = "$" + total_countFormatted;
})};

function historyCountFunction() {
    total_history_count = 0;
    const expensesCell = historyExpensesTable.querySelectorAll(".cellamount");
    expensesCell.forEach((element) => {
    value = element.textContent.replaceAll(",", "").replace("$", "");
    console.log(total_history_count);
    total_history_count = total_history_count + parseFloat(value);
    console.log(total_history_count);
    const formatter = new Intl.NumberFormat('en-US');
    total_countFormatted = formatter.format(total_history_count);
    total_history_countValue.textContent = "$" + total_countFormatted;
})};

countFunction();
historyCountFunction();

insertBtn.addEventListener('click', function () {
    const description = description_value.value;
    const number = amount_value.value;
    const formatter = new Intl.NumberFormat('en-US');
    const amount = formatter.format(number);
    console.log(amount);
    const datetime = (date_value.value).split("T");
    const date = datetime[0];
    const time = datetime[1];
    const timeId = new Date().getTime();
    console.log(timeId);
    console.log(datetime);
    console.log(time);
    console.log(date);

    /*total_count = total_count + parseFloat(amount_value.value);
    console.log(total_count);
    const total_countFormatted = formatter.format(total_count);
    total_countValue.textContent = "$" + total_countFormatted;*/

    if (description === '') {
        alert("Insert a description")
        return;
    }
    if (amount < 0) {
        alert("Insert a valid amount")
        return;
    }
    if (datetime == '') {
        alert("Insert a date")
        return;
    }

    expenses.push([description, amount, datetime, timeId]);
    expensesHistory.push([description, amount, datetime]);

    const newRow = expensesTable.insertRow();
    const newHistoryRow = historyExpensesTable.insertRow();

    newRow.classList.add("transactionsRow");
    newHistoryRow.classList.add("transactionsHistoryRow");

    const timeCell = newRow.insertCell();
    const descriptionCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const historyTimeCell = newHistoryRow.insertCell()
    const historyDescriptionCell = newHistoryRow.insertCell();
    const historyAmountCell = newHistoryRow.insertCell();
    const historyDeleteCell = newHistoryRow.insertCell();

    timeCell.textContent = time;
    descriptionCell.textContent = description;
    amountCell.textContent = "$" + amount;

    const newI = document.createElement("i");
    newI.classList.add("fa");
    newI.classList.add("fa-trash-o");
    newI.style.color = "white";
    newI.style.fontSize = "1em";

    deleteCell.appendChild(newI);

    timeCell.classList.add("celltime");
    descriptionCell.classList.add("celldescription");
    amountCell.classList.add("cellamount");
    deleteCell.classList.add("celldelete");

    historyTimeCell.textContent = date + "\n" + time;
    historyDescriptionCell.textContent = description;
    historyAmountCell.textContent = "$" + amount;

    const newHistoryI = document.createElement("i");
    newHistoryI.classList.add("fa");
    newHistoryI.classList.add("fa-trash-o");
    newHistoryI.style.color = "white";
    newHistoryI.style.fontSize = "1em";

    historyDeleteCell.appendChild(newHistoryI);

    historyTimeCell.classList.add("celltime");
    historyDescriptionCell.classList.add("celldescription");
    historyAmountCell.classList.add("cellamount");
    historyDeleteCell.classList.add("celldelete");

    historyTimeCell.style.height = "8vh";

    //no_transactions.remove();
    hidNoTransactions();
    expensesTable.style.display = "table";

    description_value.value = '';
    amount_value.value = '';
    date_value.value = '';

    const setArray = function () {
        localStorage.setItem("expensesArray", JSON.stringify(expenses));
        localStorage.setItem("expensesHistoryArray", JSON.stringify(expensesHistory));
        console.log(JSON.parse(localStorage.getItem("expensesArray")));
    };
    setArray();
    countFunction();
    historyCountFunction();
});

// Add event listener to the whole table and handle click events through event delegation
/*expensesTable.addEventListener('click', function(event) {
    if (event.target && event.target.matches(".celldelete") || event.target.matches(".celldelete i")) {
        // Find the parent row of the clicked delete button
        const row = event.target.closest('.transactionsRow');
        if (row) {
            // Find the index of the row in the table
            const rowIndex = Array.from(expensesTable.rows).indexOf(row) - 1;
            // Remove the row from the table
            row.remove();
            // Remove the corresponding expense entry from the expenses array
            expenses.splice(rowIndex, 1);
            // Update localStorage
            localStorage.setItem("expensesArray", JSON.stringify(expenses));
            // Check if there are no transactions left
            hidNoTransactions();
        }
    }
});
*/

expensesTable.addEventListener('click', function(event) {
    if (event.target && event.target.matches(".celldelete") || event.target.matches(".celldelete i")) {
        // Find the parent row of the clicked delete button
        const row = event.target.closest('.transactionsRow');
        if (row) {
            // Find the index of the row in the table
            const rowIndex = Array.from(expensesTable.rows).indexOf(row) - 1;
            // Remove the row from the table
            amountCell = row.querySelector(".cellamount");
            amountText = parseInt(amountCell.textContent.replace("$", "").replaceAll(",", ""));
            total_count = total_count - amountText;
            const formatter = new Intl.NumberFormat('en-US');
            total_countFormatted = formatter.format(total_count);
            total_countValue.textContent = "$" + total_countFormatted;

            console.log(amountText);
            row.remove();
            // Remove the corresponding expense entry from the expenses array
            expenses.splice(rowIndex, 1);
            // Update localStorage
            localStorage.setItem("expensesArray", JSON.stringify(expenses));
            // Check if there are no transactions left
            hidNoTransactions();
        }
    }
});

historyExpensesTable.addEventListener('click', function(event) {
    if (event.target && event.target.matches(".celldelete") || event.target.matches(".celldelete i")) {
        console.log("triggered step 1");
        // Find the parent row of the clicked delete button
        const row = event.target.closest('.transactionsHistoryRow');
        console.log(row);
        if (row) {
            console.log("triggered step 3");
            // Find the index of the row in the table
            const rowIndex = Array.from(historyExpensesTable.rows).indexOf(row);
            console.log(rowIndex);
            amountCell = row.querySelector(".cellamount");
            amountText = parseInt(amountCell.textContent.replace("$", "").replaceAll(",", ""));
            total_history_count = total_history_count - amountText;
            const formatter = new Intl.NumberFormat('en-US');
            total_countFormatted = formatter.format(total_history_count);
            total_history_countValue.textContent = "$" + total_countFormatted;
            // Remove the row from the table
            row.remove();
            // Remove the corresponding expense entry from the expenses array
            expensesHistory.splice(rowIndex - 2, 1);
            // Update localStorage
            localStorage.setItem("expensesHistoryArray", JSON.stringify(expensesHistory));
        }
    }
});

const d = new Date();
const iso = d.toISOString();
console.log(iso);