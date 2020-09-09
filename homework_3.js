/**
 * fruits arr is a store of fruits, fill as you wish
 * Example
 * ['banana', 'orange', 'orange']
 */
const fruits = [{
    name: 'banana',
    amount: 10, 
    price: 15,
}, {
    name: 'orange',
    amount: 100,
    price: 4,
}, {
    name: 'lemon',
    amount: 8,
    price: 5,
}, {
    name: 'apple',
    amount: 150,
    price: 3,
}, {
    name: 'kiwi',
    amount: 10,
    price: 8,
}, {
    name: 'grapefruit',
    amount: 5,
    price: 6,
}];

/**
 * fruitsBought arr is a store of bought fruits
 * push fruit here after buying
 */
const fruitsBought = [];

/**
 * logs array is used to store logs on the page.
 * Can be filled with executing log function
 * 
 * Example:
 * log(customerName, fruitName, success)
 * where
 * - customerName is name of customer
 * - fruitName is name of fruit
 * - success is state if customer bought a fruit
 */
const logs = []; 

/**
 * Example of customer
 */
const customers = [{
    name: 'Ivan',
    balance: 75,
    fruitsToBuy: [{
        name: 'banana',
        amount: 4,
    }]
}, {
    name: 'Jack',
    balance: 50,
    fruitsToBuy: [{
        name: 'apple',
        amount: 5,
    }]
}, {
    name: 'Martin',
    balance: 35,
    fruitsToBuy: [{
        name: 'kiwi',
        amount: 5,
    }]
}, {
    name: 'Roger',
    balance: 100,
    fruitsToBuy: [{
        name: 'grapefruit',
        amount: 6,
    }]
}, {
    name: 'Alex',
    balance: 70,
    fruitsToBuy: [{
        name: 'lemon',
        amount: 10,
    }]
},  { 
    name: 'Cristiano',
    balance: 1000000,
    fruitsToBuy: [{
        name: 'orange',
        amount: 30,
    }]
}];

/**
 * Function buyFruits is used to iterate over array passes as a param
 * if customer wants to buy 4 banana try to remove banana from fruits array (find it above)
 * and push it to fruitsBought array (find it above)
 * 
 * Push execution result in log
 * function log is written below, you'll find execution example on line 18 of this file
 * 
 * Example:
 * buyFruits(customers)
 */
function buyFruits(customersArr) {
    for (let i = 0; i < customers.length; i++)
    {
        let isPurchaseSuccessful = false;
        let totalCost = 0;
        for (let j = 0; j < fruits.length; j++)
        {
            if (customers[i].fruitsToBuy[0].name === fruits[j].name && 
                customers[i].fruitsToBuy[0].amount <= fruits[j].amount && 
                customers[i].balance >= customers[i].fruitsToBuy[0].amount * fruits[j].price)
                {
                    fruits[j].amount -= customers[i].fruitsToBuy[0].amount;
                    fruitsBought.push(customers[i].fruitsToBuy[0]);
                    isPurchaseSuccessful = true;   
                    totalCost =  customers[i].fruitsToBuy[0].amount * fruits[j].price;       
                }
        }
        log(customers[i].name, customers[i].fruitsToBuy[0].amount, customers[i].fruitsToBuy[0].name, isPurchaseSuccessful, totalCost);
    }
}

/**
 * Function getFruitsMap returns map of fruits
 * Example:
 * 
 * const fr = ['banana', 'orange', 'orange']
 * getFruitsMap(fr); -> { banana: 1, orange: 2 }
 * 
 */
 function getFruitsMap(fruitsArr) {
    return fruitsArr.map(fruit => ` Units of ${fruit.name}: ${fruit.amount}`);
 }

// DONT'T EDIT FOLLOWING CODE
buyFruits();
const fruitsLeftMap = getFruitsMap(fruits);
const fruitsBoughtMap = getFruitsMap(fruitsBought);


function log (customerName, fruitAmount, fruitName, success, totalCost) {
    const action = success ? 'bought' : 'failed to buy';
    const className = success ? 'green' : 'red';
    logs.push(`${customerName} <span class=${className}>${action}</span> ${fruitAmount} ${fruitName}s and spent ${totalCost} c.u.`);
}

function render () {
    renderLog();
    renderFruits('fruits-left', fruitsLeftMap);
    renderFruits('fruits-bought', fruitsBoughtMap);

    function renderLog() {
        let existingLogsContainer = document.getElementById('messages');
        let mainLogsContainer =  document.getElementById('log');
        
        if (existingLogsContainer) {
            mainLogsContainer.removeChild(existingLogsContainer);
        }
        
        const logsContainer = document.createElement('ul');
        logsContainer.id = 'messages';
        
        logs.forEach(log => {
            const logEl = document.createElement('li');
            logEl.innerHTML = log;
            logsContainer.appendChild(logEl);
        });
        
        mainLogsContainer.appendChild(logsContainer);    
    }
    
    function renderFruits (id, mappedData) {
        const mainFruitsContainer = document.getElementsByClassName(id)[0];
        const existingFruitsBoughtContainer = (mainFruitsContainer.getElementsByClassName('fruits-list') || [])[0];
        
        if (existingFruitsBoughtContainer) {
            mainFruitsContainer.removeChild(existingFruitsBoughtContainer);
        }
        
        const fruitsContainer = document.createElement('ul');
        fruitsContainer.classList.add('fruits-list');
        
        for (let key in mappedData) {
            const fruitEl = document.createElement('li');
            const nameEl = document.createElement('span');
            const countEl = document.createElement('span');
            nameEl.innerText = `${key}:`;
            countEl.innerText = mappedData[key];
        
            fruitEl.appendChild(nameEl);
            fruitEl.appendChild(countEl);
            fruitsContainer.appendChild(fruitEl);
        }
        
        mainFruitsContainer.appendChild(fruitsContainer);
    }
}
