"use strict";

const navEl = document.getElementById("sidebar");
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const storeBreed = (x) => saveToStorage("breed-list", x);
const petBreed = getFromStorage("breed-list") || [];

// show data pet function
const renderTableData = function (x) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < x.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope="row">${x.indexOf(x[i]) + 1}</td>
    <td>${x[i].breed}</td>
    <td>${x[i].type}</td>
    <td><button type="button" class="btn btn-danger">Delete</button></td>
    `;
    tbody.appendChild(row);
  }
  // connect event "click" in "delete" button
  const btnsDel = document.querySelectorAll(".btn-danger");
  btnsDel.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      petBreed.splice(i, 1);
      storeBreed(petBreed);
      renderTableData(petBreed);
    });
  });
};
// check validate data
function validateBr() {
  if (breedInput.value == "") {
    return false;
  } else if (typeInput.value == "Select Type" || typeInput.value == "") {
    return false;
  } else {
    return true;
  }
};
renderTableData(petBreed);
// connect event "click" in "submit" button
// get data from form input
btnSubmit.addEventListener("click", function () {
  const breedData = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  // alert invalid data
  if (breedInput.value == "" || breedInput.value == "") {
    alert("Please input Breed");
  }
  if (typeInput.value == "Select Type" || typeInput.value == "") {
    alert("Please select Type");
  }
  validateBr();
  if (validateBr()) {
    petBreed.push(breedData);
    renderTableData(petBreed);
    storeBreed(petBreed);
    typeInput.value = "";
    breedInput.value = "";
  }
});

















































/*




var dataBreed = JSON.parse(localStorage.getItem("breedArr"));


renderTableBreed(breedArr);
btnSubmit.addEventListener("click", function () {
  validateBr();
  let data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  if (
    data.breed !== "Input Breed" &&
    data.type !== "Select Type" &&
    validateBr() == true
  ) {
    breedArr.push(data);
    saveToStorage("breedArr", breedArr);
    renderTableBreed(breedArr);
    deleteForm();
  }
});


function deleteForm() {
  breedInput.value = "";
  typeInput.value = "";
}

function deleteBreed(breed) {
  const isDelete = confirm("Are u sure ?");
  if (isDelete) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1);
        break;
      }
    }
    saveToStorage("breedArr", breedArr);
    renderTableBreed(breedArr);
  }
}
*/