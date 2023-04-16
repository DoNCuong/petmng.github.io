"use strict";

// create variable
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
let deleteEllist = document.querySelectorAll(".btn.btn-danger");
const healthyBtn = document.getElementById("healthy-btn");
const storePet = function (x) {
  saveToStorage("pet-list", x);
};
const petList = localStorage.getItem("pet-list");
const petArr = petList ? JSON.parse(petList) : [];

// check validation
// if invalid data, alert to user
const validateData = function () {
  let flag = false;
  for (let i = 0; i < tableBodyEl.rows.length; i++) {
    if (idInput.value === tableBodyEl.rows[i].cells[0].textContent) {
      alert("ID must unique!");
      flag = true;
    }
  }
  if (idInput.value === "") {
    alert("Please inpt for ID");
    return false;
  } else if (nameInput.value === "") {
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
						<td><button class="btn btn-danger" onclick="deletePet('${
              petArr[i].id
            }')">Delete</button></td>
      `;
    tableBodyEl.appendChild(row);
  }

  // delete pet variable
  function deletePet(petId) {
    for (let i = 0; i < tableBodyEl.rows.length; i++) {
      if (petId === tableBodyEl.rows[i].cells[0].textContent) {
        petArr.splice(i, 1);
        storePet(petArr);
      }
      renderTableData(petArr);
    }
  }
  // connect event "click" in "delete" button
  const btnDel = document.querySelectorAll(".btn-danger");
  for (let c = 0; c < btnDel.length; c++) {
    btnDel[c].addEventListener("click", function () {
      const confirmDel = confirm("Ban chac chan muon xoa thu cung nay chu ?");
      if (confirmDel) {
        const petId = tableBodyEl.rows[c].cells[0].textContent;
        deletePet(petId);
      }
    });
  }
};
renderTableData(petArr);
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
// connect event "click" in "submit" button
// get data from input form
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
    petArr.push(data);
    renderTableData(petArr);
    storePet(petArr);
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "";
    weightInput.value = "";
    lengthInput.value = "";
    breedInput.value = "";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
    tableBodyEl.value = "";
  }
});
// show healthy pets
let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    let healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

