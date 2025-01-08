const title = document.getElementById('title');
const author = document.getElementById('author');
const year = document.getElementById('year');
const bookList = document.getElementById('book-list');
const addBtn = document.querySelector('.addBtn');


let editFlag = false;
let editId = null;

addBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const dataObj = { titleValue: title.value, authorValue: author.value, yearValue: year.value }
  const text = `
  <section data-id="${new Date().getTime()}" data-record='${encodeURIComponent(JSON.stringify(dataObj))}'>
    <span> ${dataObj.titleValue}</span>
    <span>${dataObj.authorValue}</span>
    <span>${dataObj.yearValue}</span>
    <span><button type="button" class="edit btn">Edit</button><button type="button" class="delete btn">Delete<button></span>
  </section>`;
  if (editFlag) {
    const doc = new DOMParser().parseFromString(text, "text/html").body.firstElementChild;
    const section = document.querySelector(`[data-id="${editId}"]`);
    section.replaceWith(doc);
    editFlag = false;
    editId = null;
  } else {
    bookList.insertAdjacentHTML("beforeend", text);
  }
  populateValues({});
  deleteRecord();
  editRecord();
});


const populateValues = function ({ titleValue = "", authorValue = "", yearValue = "" }) {
  title.value = titleValue;
  author.value = authorValue;
  year.value = yearValue;
}

const deleteRecord = function () {
  const deleteButtons = document.querySelectorAll("#book-list .delete");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      btn.parentElement.parentElement.remove();
    })
  })
}

const editRecord = function () {
  const editButtons = document.querySelectorAll("#book-list .edit");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      editFlag = true;
      editId = btn.parentElement.parentElement.getAttribute("data-id");
      const data = btn.parentElement.parentElement.getAttribute("data-record");
      const { titleValue, authorValue, yearValue } = JSON.parse(decodeURIComponent(data));
      populateValues({ titleValue, authorValue, yearValue });
      addBtn.innerHTML = "Update";

    })
  })
}