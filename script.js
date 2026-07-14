const balance=document.getElementById("balance");
const income=document.getElementById("income");
const expense=document.getElementById("expense");
const list=document.getElementById("list");

const form=document.getElementById("form");
const text=document.getElementById("text");
const amount=document.getElementById("amount");
const date=document.getElementById("date");

const toggleTheme=document.getElementById("toggle-theme");

let transactions=JSON.parse(localStorage.getItem("transactions")) || [];

let chart;

/*save to local storage*/

function saveLocal(){
    localStorage.setItem("transactions",JSON.stringify(transactions));
}

// add transaction to ui

function addTransactionDOM(transaction){
    const li=document.createElement("li");
    li.innerHTML=`
    <div>
    <strong>${transaction.text}</strong>
    <small>${transaction.date}</small>
    </div>

    <div>
    ₹${transaction.amount}
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    </div>
    `;
    list.appendChild(li);
}

// update balance,income and expense

function updateValues(){
    const amounts=transactions.map(t=>t.amount);
    const total=amounts.reduce((acc,item)=>acc+item,0);
    const incomeTotal=amounts.filter(item=>item>0).reduce((acc, item) => acc + item, 0);
    const expenseTotal = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0);
    balance.innerText = `₹${total}`;
    income.innerText = `₹${incomeTotal}`;
    expense.innerText = `₹${Math.abs(expenseTotal)}`;
    updateChart();
}

//add transaction

function addTransaction(e){
    e.preventDefault();
    const transaction={
        id:Date.now(),
        text:text.value,
        amount:+amount.value,
        date:date.value
    };
    transactions.push(transaction);
    init();
    text.value="";
    amount.value="";
    date.value="";
}

//delete transaction

function removeTransaction(id){
    transactions=transactions.filter(t => t.id !== id);
    init();
}

//chart update

function updateChart(){
    const ctx=document.getElementById("expenseChart");
    const incomeTotal=transactions.filter(t=> t.amount>0).reduce((sum,t)=> sum+t.amount,0);
    const expenseTotal = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Income", "Expense"],
            datasets: [
            {
                data: [incomeTotal, Math.abs(expenseTotal)]
            }
            ]
        }
    });
}

/* Initialize app */
function init(){
    list.innerHTML="";
    transactions.forEach(addTransactionDOM);
    updateValues();
    saveLocal();
}

// Event listener
form.addEventListener("submit",addTransaction);
toggleTheme.addEventListener("click",()=>{
    document.documentElement.classList.toggle("dark");
});


function test(){
console.log("AI review test");
var x = 10 // bina semicolon aur const/let ke rough code
}

//run app
init();
