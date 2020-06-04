import './../css/componentes.css';  

const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     {id:1, text: 'Flower', amount: -20},    
//     {id:2, text: 'Salary', amount: 300},
//     {id:3, text: 'Book',   amount: -10},    
//     {id:4, text: 'Camera', amount: 150}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [] ;
/* ****************************** ADD TRANSACTION ****************************** */
const addTransaction = (e) => {
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const descripcion = text.value;
        const cantidad = +amount.value;
        const transaction = {
            id: generateID(), text: descripcion, amount: cantidad
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
};
/* ****************************** GENERATE RANDOM ID ****************************** */
const generateID = () => {
    return Math.floor(Math.random() * 100000000);
};
/* ****************************** ADD TRANSACTIONS TO DOM LIST ****************************** */
const addTransactionDOM = (transaction) => {
    //  Get values
    const { id, text: descripcion, amount: cantidad } = transaction;
    //  Get sign
    const sign = cantidad < 0 ? '-' : '+';
    const item = document.createElement('li');
    // Add class based on value
    item.classList.add(cantidad < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${descripcion} <span>${sign}$${Math.abs(cantidad)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
};
/* ****************************** UPDATE THE BALANCE, INCOME AND EXPENSE ****************************** */
const updateValues = () => {
    const amounts = transactions.map((transaction) => {
        return transaction.amount;
    });
    const total = amounts.reduce((acc, item) => (acc += item),0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) =>(acc += item),0).toFixed(2);
    const expense = Math.abs(amounts 
        .filter(item => item < 0)
        .reduce((acc, item) =>(acc += item),0)).toFixed(2);
    balance.innerHTML = `$${total}`;
    moneyPlus.innerHTML = `+$${income}`;                  
    moneyMinus.innerHTML = `-$${expense}`; 
};
/* ****************************** REMOVE TRANSACTION BY ID ****************************** */
window['removeTransaction'] = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id);  
    updateLocalStorage();
    init();
};
/* ****************************** UPDATE LOCAL STORAGE TRANSACTIONS ****************************** */
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};
/* ************************************************************ */
const eventos = () => {
    // console.log('Event Listeners');
    form.addEventListener('submit', addTransaction);
};
/* ************************************************************ */
const init = () => {
    console.log('Expense Tracker');
    list.innerHTML = '';
    transactions.forEach((item) => {
        addTransactionDOM(item);
    })
    updateValues();
    eventos();
};

/* ************************************************************ */
export {
    init
} 