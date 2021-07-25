'use strict';

////////////////////////////////
////////global variable////////
//////////////////////////////

let myForm = document.getElementById("myForm");
let myDiv=document.getElementById("div");
let myTabel = document.getElementById("myTabel");
let totalEl = document.getElementById("total");
let TabelOfContent = ["Book Name", "Book Pages", "Book Price"]
let arrayOfBooks = [];
let total = 0;



/////////////////////////////////////////
////////Function And Constructor////////
///////////////////////////////////////

////Constructor
function Book(name, price) {
    this.name = name;
    this.price = price;
    this.pages = 0;
    arrayOfBooks.push(this);
}

////Function to random Book.pages[1-500]
Book.prototype.randomPages = function () {
    let min = 1;
    let max = 500;
    this.pages = Math.floor(Math.random() * (max - min + 1) + min);

}

////Function to handel Submit And create new Book
function handelSubmit(event) {
    event.preventDefault();
    let name = event.target.name.value;
    let price =Number( event.target.price.value);
    let newBook = new Book(name, price);
    newBook.randomPages();
    newBook.contentRow();

    localStorage.setItem("Books", JSON.stringify(arrayOfBooks));

}

////Function to render the Table Header with Total Prices
function firstRow() {
    let thEl = document.createElement('tr');
    let tdEl;
    for (let i = 0; i < TabelOfContent.length; i++) {
        tdEl = document.createElement('th');
        tdEl.textContent = TabelOfContent[i];
        thEl.appendChild(tdEl);


    }
    myTabel.appendChild(thEl);
   
    myDiv.appendChild(myTabel);
    
    totalEl.textContent="";
    totalEl.textContent="Total : "+calculateTotal();
    myDiv.appendChild(totalEl);



}

////Function to render the Table Content with Total Prices
Book.prototype.contentRow = function () {
    let trEl = document.createElement('tr');
    let nameEl = document.createElement('td');
    nameEl.textContent = this.name;
    let pageEl = document.createElement('td');
    pageEl.textContent = this.pages;
    let priceEl = document.createElement('td');
    priceEl.textContent = this.price;

    trEl.appendChild(nameEl);
    trEl.appendChild(pageEl);
    trEl.appendChild(priceEl);

    myTabel.appendChild(trEl);
    myDiv.appendChild(myTabel);

    totalEl.textContent="Total : "+calculateTotal();
    myDiv.appendChild(totalEl);
}

////Function to render the Table Content with Total Prices(After We Refresh The Page)
function randerAfterReload() {
    myTabel.textContent = "";
    firstRow();
    for (let i = 0; i < arrayOfBooks.length; i++) {
        let trEl = document.createElement('tr');
        let nameEl = document.createElement('td');
        nameEl.textContent = arrayOfBooks[i].name;
        let pageEl = document.createElement('td');
        pageEl.textContent = arrayOfBooks[i].pages;
        let priceEl = document.createElement('td');
        priceEl.textContent = arrayOfBooks[i].price;

        trEl.appendChild(nameEl);
        trEl.appendChild(pageEl);
        trEl.appendChild(priceEl);

        myTabel.appendChild(trEl);
        myDiv.appendChild(myTabel);

    }
    totalEl.textContent="Total : "+calculateTotal();
    myDiv.appendChild(totalEl);

}

////Function to Read Form Local Storage And to Call randerAfterReload()
function loadFormLocalStorage() {
    let stringObj = localStorage.getItem("Books");
    let normalObj = JSON.parse(stringObj);
    if (normalObj !== null) {
        arrayOfBooks = normalObj;
        randerAfterReload();

    }

}

////Function to Calculate total price of all Books
function calculateTotal() {
    total=0;
    for (let i = 0; i < arrayOfBooks.length; i++) {
        total+=arrayOfBooks[i].price;
        
    }
    return total;
    
}

///////////////////////////////////////////////
////////Call Function and EventListener////////
//////////////////////////////////////////////

myForm.addEventListener("submit", handelSubmit);
firstRow()
loadFormLocalStorage();
