/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         studentList.insertAdjacentHTML("beforeend",
            `<li class="student-item cf">
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
This function will create and insert/append the elements needed for the pagination buttons
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
            showPage(data, pageNumber);
         }
      }

   });
}

/*
Create the `addSearchBar` function
This function will add a search bar to the page and dynamically search students 
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
      // if search doesn't return a result on keyup
      if (newStudentArr.length === 0) {
         error(eventTargetValue);
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
      // if search doesn't return a result on click
      if (newStudentArr.length === 0) {
         error(inputValue);
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