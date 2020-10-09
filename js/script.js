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
                  <img class="avatar" src=${data[i].picture.large} alt="Profile Picture">
                  <h3>${data[i].name.title} ${data[i].name.first} ${data[i].name.last}</h3>
                  <span class="email">${data[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${data[i].registered.date}</span>
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
   const firstLiItem = linkList.firstElementChild;
   firstLiItem.classList.add('active');

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         firstLiItem.classList.remove('active');
         e.target.classList.add('active');
         console.log(linkList.children);

         console.log(firstLiItem);
         console.log(e.target);
      }

   })
}

// Call functions

showPage(data, 1);
addPagination(data);