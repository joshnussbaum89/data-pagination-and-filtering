/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students.
*/

// Page is 1 by default and list is the data array of students.
function showPage(list, page) {

   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         studentList.insertAdjacentHTML("beforeend",
            `<li class="student-item cf" title="${list[i].name.title} ${list[i].name.first} ${list[i].name.last}">
               <div class="student-details">
                  <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                  <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`);
      }
   }
   return studentList;

}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons.
*/

/* 
-- List is the data array of students
-- Divide the length of the array by 9 and dynamically add the necessary amount of buttons based on how many results are returned 
-- A click event listener adds and removes an .active class based on where the user clicks.
*/

function addPagination(list) {

   const numOfPaginationBtns = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for (let i = 1; i <= numOfPaginationBtns; i++) {
      linkList.insertAdjacentHTML("beforeend",
         `<li>
            <button type="button">${i}</button>
         </li>`);
   }
   const firstLiItem = linkList.firstElementChild.firstElementChild;
   firstLiItem.classList.add('active');

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const linkListButtons = document.querySelectorAll('li button');
         const pageNumber = e.target.textContent;

         for (let i = 0; i < linkListButtons.length; i++) {
            linkListButtons[i].classList.remove('active');
            e.target.classList.add('active');
            showPage(list, pageNumber);
         }
      }
   });

}

/*
Create the `addSearchBar` function
This function will add a search bar to the page and dynamically search students. 
*/

/*
-- Insert searchbar and icon to DOM
-- Search for students in real time as user types
-- If search doesn't return a result on keyup, throw an error message
-- Search for students when search icon is clicked.  This is benificial if a student has been copy/pasted
-- if search doesn't return a result on click, throw an error message
*/

function addSearchBar() {

   const header = document.querySelector('.header');
   header.insertAdjacentHTML('beforeend',
      `<label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button class="search-button" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
       </label>`);

   const input = document.querySelector('#search');
   const searchButton = document.querySelector('.search-button');

   input.addEventListener('keyup', (event) => {
      const eventTargetValue = event.target.value.toLowerCase();
      let newStudentArr = [];

      for (let i = 0; i < data.length; i++) {
         const studentName = `${data[i].name.title.toLowerCase()} ${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`;

         if (studentName.includes(eventTargetValue)) {
            newStudentArr.push(data[i]);
            showPage(newStudentArr, 1);
            addPagination(newStudentArr);
         }
      }

      if (newStudentArr.length === 0) {
         return error(eventTargetValue);
      }

   });

   searchButton.addEventListener('click', () => {
      const inputValue = input.value.toLowerCase();
      let newStudentArr = [];

      for (let i = 0; i < data.length; i++) {
         const studentName = `${data[i].name.title.toLowerCase()} ${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`;

         if (studentName.includes(inputValue)) {
            newStudentArr.push(data[i]);
            showPage(newStudentArr, 1);
            addPagination(newStudentArr);
         }
      }

      if (newStudentArr.length === 0) {
         return error(inputValue);
      }
   });

}

// display error
function error(input) {
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = `<h1>${input} is not valid name. Please try another name!</h1>`;
   studentList.style.color = 'red';
   studentList.style.textAlign = 'center';
}

// Call functions
showPage(data, 1);
addPagination(data);
addSearchBar();