'use strict';

const main = document.getElementById('main');
const btnAddUser = document.getElementById('add-user');
const btnDouble = document.getElementById('double');
const btnFilter = document.getElementById('filter-rich');
const btnSort = document.getElementById('sort');
const btnTotal = document.getElementById('total');

let data = [];let check=1;

//Fetch a random user from Random user API
const getRandomUser = async function() {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        balance: Math.floor(Math.random()*100000)
    };

    addData(newUser);
};

//Function addData
const addData = function(obj) {
    check=1;
    data.push(obj);
    updateDOM();
}

//Function update DOM
const updateDOM = function(providedData = data) {
    main.innerHTML = '<h2><strong>Name</strong> Balance</h2>';
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('users');
        element.innerHTML = `<strong>${item.name}</strong>${formatToCurrency(item.balance)}`;
        main.appendChild(element);
    });
};

function formatToCurrency(amount) {
    return amount.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR'
     });
}

//Function doubleBalance
const doubleBalance = function() {
    check=1;
    data = data.map(user => {
        return {...user, balance: user.balance *2};
    });
    updateDOM();
};

//Function filter rich
const filterRich = function() {
    check=1;
    data = data.filter((user) => user.balance > 50000);
    updateDOM();
}

//Function Sort
const sort = function() {
    check=1;
    data.sort(function(a, b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        else if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      updateDOM();
}

//Function total amount
const totalAmount = function() {
    const wealth = data.reduce((acc, user) => (acc = acc + user.balance), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Amount: <strong>${formatToCurrency(wealth)}</strong></h3>`;
    check++;
    if(check===2) main.appendChild(wealthEl);
}

//Event Listeners
btnAddUser.addEventListener('click',getRandomUser);

btnDouble.addEventListener('click',doubleBalance);

btnFilter.addEventListener('click',filterRich);

btnSort.addEventListener('click',sort);

btnTotal.addEventListener('click',totalAmount);