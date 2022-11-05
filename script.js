'use strict'

// getting element from HTML

let TaskNameEl = document.getElementById('TaskName')
let formClassEl = document.getElementById('formClass')
let myTasksEl = document.getElementById('myTasks')
let btnEl = document.getElementById('btn')

// Global variable

let dataObject = gettingDataFunction()

if (!dataObject) {
    dataObject = []
} else {
    displayFuntion(dataObject)
}

let editID = 0;

// function

function addDataInLocalStorage(dataItem) {
    localStorage.setItem('dataObject', JSON.stringify(dataItem))
}

function gettingDataFunction() {
    
    let StoredData = JSON.parse(localStorage.getItem('dataObject'))
    
    return StoredData;
}

function displayFuntion(StoredData) {
    myTasksEl.innerHTML = null;
    StoredData.forEach((a) => {
        let newLineEl = document.createElement('li')
        myTasksEl.appendChild(newLineEl)
        newLineEl.innerHTML = `<div class="newElement" id="${a.id}">
        <div>${a.task}</div>
        <button class="btn1" onclick="deleteItem(${a.id})"><i class="fa-solid fa-trash"></i></button><button class="btn1" onclick="editItem(${a.id})"><i class="fa-solid fa-pen-to-square"></i></button></div>`
    })
}

function deleteItem(id) {
    dataObject = dataObject.filter((element) => element.id != id)
    displayFuntion(dataObject)
    addDataInLocalStorage(dataObject)
}

function editItem(id) {
    let elementToBeEdit = document.getElementById(id);
    let elementToBeEditValue = elementToBeEdit.innerText;
    TaskNameEl.value = elementToBeEditValue;
    btnEl.value = 'edit';
    editID = id;
}

// event listener

formClassEl.addEventListener('submit', (e) => {
    e.preventDefault();
    let TaskNameValue = TaskNameEl.value;
    if (TaskNameValue) {
        TaskNameEl.value = ''
        let btnValue = btnEl.value;
        if (btnValue === 'add') {
            let a = { 'id': new Date().valueOf(), 'task': TaskNameValue }

            dataObject.push(a);

            // adding data to local storage
            addDataInLocalStorage(dataObject)

            // adding data in Display
            displayFuntion(dataObject);

        } else if (btnValue === 'edit') {
            dataObject.forEach(a => {
                if (a.id === editID) {
                    a.task = TaskNameValue;
                }
            })
            displayFuntion(dataObject);
            btnEl.value = 'add';
        }
    }
    else {
        alert('Enter valid information to creat new task');
    }
})