"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

const storePet = function (x) {
  saveToStorage("pet-list", x);
};
const petList = localStorage.getItem("pet-list");
const petArr = petList ? JSON.parse(petList) : [];

// show data variable
const renderTableData = function (petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
                        <th scope="row">${petArr[i].id}</th>
						<td>${petArr[i].name}</td>
						<td>${petArr[i].age}</td>
						<td>${petArr[i].type}</td>
						<td>${petArr[i].weight}</td>
						<td>${petArr[i].length}</td>
						<td>${petArr[i].breed}</td>
						<td>
							<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
						</td>
						<td><i class="bi ${
              petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
            }"></i></td>
						<td><i class="bi ${
              petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
            }"></i></td>
						<td><i class="bi ${
              petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
            }"></i></td>
						<td>${petArr[i].date}</td>
            <td><button onclick = "editPet('${petArr[i].id}')" type="button" style="background-color: #ffc107; color:#000">Edit</button></td>
      `;
    tableBodyEl.appendChild(row);
  }
};
// get breed list from Local Storage
const petBreed = getFromStorage("breed-list");
const renderBreed = function (petBreed) {
  breedInput.innerHTML = "";
  for (let i = 0; i < petBreed.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${petBreed[i].breed}</option>`;
    breedInput.appendChild(option);
  }
}
// choose breed
typeInput.addEventListener("change", function () {
  const chooseBreed = petBreed.filter(function (item) {
    if (typeInput.value === "Dog") return item.type === "Dog";
    if (typeInput.value === "Cat") return item.type === "Cat";
    if (typeInput.value === "Select Type") return [];
  });
  renderBreed(chooseBreed);
});


// function find pet
const petFind = document.querySelector("#find-btn");
petFind.addEventListener("click", function () {
  let findArray = petArr;
  if (idInput.value) {
    findArray = findArray.filter((pet) => pet.id.includes(idInput.value));
  }
  if (nameInput.value) {
    findArray = findArray.filter((pet) => pet.id.includes(nameInput.value));
  }
  if (typeInput.value !== "Select Type") {
    findArray = findArray.filter((pet) => pet.type === typeInput.value);
  }
  if (breedInput.value !== "Select Breed") {
    findArray = findArray.filter((pet) => pet.breed === breedInput.value);
  }
  if (vaccinatedInput.checked === true) {
    findArray = findArray.filter(
      (pet) => pet.vaccinated === vaccinatedInput.checked
    );
  }
  if (dewormedInput.checked === true) {
    findArray = findArray.filter(
      (pet) => pet.dewormed === dewormedInput.checked
    );
  }
  if (sterilizedInput.checked === true) {
    findArray = findArray.filter(
      (pet) => pet.sterilized === sterilizedInput.checked
    );
  }
  renderTableData(findArray);
});
