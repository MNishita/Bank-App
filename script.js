'use strict';

const main = document.getElementById('main');
const btnAddUser = document.getElementById('add-user');
const btnDouble = document.getElementById('double');
const btnFilter = document.getElementById('filter-rich');
const btnTotal = document.getElementById('total');

let data = [];

//Fetch a random user from Random user API
const getRandomUser = async function() {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        balance: Math.floor(Math.random()*1000000)
    };

    addData(newUser);
};

//Function addData
const addData = function(obj) {
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


//Event Listeners
btnAddUser.addEventListener('click',getRandomUser);

btnDouble.addEventListener('click',doubleBalance);