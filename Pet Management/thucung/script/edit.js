'use strict';

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
renderTableData(petArr);
// create function for event "edit"
function editPet(id) {
  // show again form input data
  formEl.classList.remove("hide");
  // looking for pet
    const pet = petArr.find((petItem) => petItem.id === id);
    idInput.value = id;
    nameInput.value = pet.name;
    ageInput.value = pet.age;
    typeInput.value = pet.type;
    weightInput.value = pet.weight;
    lengthInput.value = pet.length;
    vaccinatedInput.checked = pet.vaccinated;
    dewormedInput.checked = pet.dewormed;
    sterilizedInput.checked = pet.sterilized;
    let options = petBreed.filter((item) => item.type == pet.type);
};
// check validation
// if invalid data, alert to user
const validateData = function () {
  if (nameInput.value === "") {
    alert("Please inpt for Name");
    return false;
  } else if (ageInput.value == "") {
    alert("Please inpt for Age");
    return false;
  } else if (ageInput.value < 1 || ageInput.value > 15) {
    alert("Age must be between 1 and 15");
    return false;
  } else if (typeInput.value == "Select Type") {
    alert("Please select Type");
    return false;
  } else if (weightInput.value == "") {
    alert("Please inpt for Weight");
    return false;
  } else if (weightInput.value < 1 || weightInput.value > 15) {
    alert("Weight must be between 1 and 15");
    return false;
  } else if (lengthInput.value == "") {
    alert("Please inpt for Length");
    return false;
  } else if (lengthInput.value < 1 || lengthInput.value > 100) {
    alert("Length must be between 1 and 100");
    return false;
  } else if (breedInput.value == "Select Breed") {
    alert("Please select Breed");
    return false;
  } else {
    return true;
  }
};
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date:
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear(),
  };
  // check validate data by if else
  if (validateData() == true) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    data.date = petArr[index].date;
    petArr[index] = data;
    formEl.classList.add("hide")
    // petArr.push(data);
    storePet(petArr);
    renderTableData(petArr);
  }
});